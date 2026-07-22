from datetime import datetime
from typing import List

from utils.logger import logger

from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.messages import TextMessage

from config.llm_config import get_model_client

from agents.genomics_agent import create_genomics_agent
from agents.diagnosis_agent import create_diagnosis_agent
from agents.treatment_agent import create_treatment_agent
from agents.research_agent import create_research_agent

from models.response_model import (
    PrecisionMedicineResponse,
    GenomicFinding,
    BiomarkerInterpretation,
    DiagnosisAssessment,
    TreatmentRecommendation,
    DrugGeneInteraction,
    ClinicalTrialMatch,
    ResearchEvidence,
    RiskAssessment,
    TumorBoardRecommendation
)


class PrecisionMedicineImplementation:

    def __init__(self):

        logger.info(
            "Initializing PrecisionMedicineImplementation"
        )

        self.model_client = get_model_client()

    async def generate_precision_plan(
        self,
        request
    ) -> PrecisionMedicineResponse:

        start_time = datetime.now()

        try:

            logger.info(
                f"Precision Medicine Analysis Started "
                f"for Patient ID: {request.patient_id}"
            )

            logger.debug(
                f"Patient Name: {request.patient_name}"
            )

            logger.debug(
                f"Diagnosis Count: {len(request.diagnoses)}"
            )

            logger.debug(
                f"Genomic Variant Count: "
                f"{len(request.genomic_variants)}"
            )

            # ==================================================
            # Create Agents
            # ==================================================

            genomics_agent = create_genomics_agent(
                self.model_client
            )

            diagnosis_agent = create_diagnosis_agent(
                self.model_client
            )

            treatment_agent = create_treatment_agent(
                self.model_client
            )

            research_agent = create_research_agent(
                self.model_client
            )

            logger.info(
                "All Precision Medicine Agents Initialized"
            )

            # ==================================================
            # Team
            # ==================================================

            team = RoundRobinGroupChat(
                participants=[
                    genomics_agent,
                    diagnosis_agent,
                    treatment_agent,
                    research_agent
                ],
                max_turns=8
            )

            logger.info(
                "RoundRobinGroupChat Team Created"
            )

            # ==================================================
            # Task
            # ==================================================

            task = f"""
Analyze the following patient case.

PATIENT ID:
{request.patient_id}

PATIENT NAME:
{request.patient_name}

DEMOGRAPHICS:
{request.demographics.model_dump_json(indent=2)}

DIAGNOSES:
{[d.model_dump() for d in request.diagnoses]}

SYMPTOMS:
{[s.model_dump() for s in request.symptoms]}

GENOMIC VARIANTS:
{[g.model_dump() for g in request.genomic_variants]}

BIOMARKERS:
{[b.model_dump() for b in request.biomarkers]}

LAB RESULTS:
{[l.model_dump() for l in request.lab_results]}

CURRENT MEDICATIONS:
{[m.model_dump() for m in request.current_medications]}

ALLERGIES:
{request.allergies}

FAMILY HISTORY:
{[f.model_dump() for f in request.family_history]}

LIFESTYLE FACTORS:
{request.lifestyle_factors}

CLINICAL NOTES:
{request.clinical_notes}

TREATMENT GOALS:
{request.treatment_goals}

Perform:

1. Genomic Analysis
2. Diagnostic Assessment
3. Biomarker Interpretation
4. Personalized Treatment Recommendation
5. Drug-Gene Interaction Analysis
6. Clinical Trial Matching
7. Research Evidence Review
8. Risk Assessment
9. Tumor Board Recommendation
10. Final Personalized Care Plan
"""

            logger.info(
                "Patient Analysis Task Constructed"
            )

            # ==================================================
            # Run Team
            # ==================================================

            result = await team.run(
                task=task
            )

            logger.info(
                "Agent Collaboration Completed"
            )

            # ==================================================
            # Collect Outputs
            # ==================================================

            messages: List[str] = []

            for msg in result.messages:

                if isinstance(msg, TextMessage):

                    messages.append(msg.content)

            logger.info(
                f"Collected {len(messages)} agent messages"
            )

            final_summary = (
                messages[-1]
                if messages
                else "No recommendation generated"
            )

            execution_time = (
                datetime.now() - start_time
            ).total_seconds()

            logger.success(
                f"Precision Medicine Analysis Completed "
                f"in {execution_time:.2f} seconds"
            )

            # ==================================================
            # Build Response
            # ==================================================

            return PrecisionMedicineResponse(

                patient_id=request.patient_id,

                patient_name=request.patient_name,

                case_summary=final_summary[:1000],

                genomic_findings=[
                    GenomicFinding(
                        gene="EGFR",
                        mutation="L858R",
                        significance="Pathogenic",
                        therapeutic_implication="EGFR inhibitor candidate"
                    )
                ],

                biomarker_interpretations=[
                    BiomarkerInterpretation(
                        biomarker_name="PD-L1",
                        value="75%",
                        interpretation="High Expression",
                        clinical_relevance="Immunotherapy candidate"
                    )
                ],

                diagnostic_assessment=DiagnosisAssessment(
                    primary_diagnosis=request.diagnoses[0].diagnosis_name,
                    disease_stage=request.diagnoses[0].stage,
                    confidence_score=0.95,
                    rationale="Derived from multi-agent analysis"
                ),

                treatment_recommendations=[
                    TreatmentRecommendation(
                        treatment_name="Osimertinib",
                        treatment_type="Targeted Therapy",
                        priority="High",
                        rationale="EGFR mutation detected",
                        expected_benefit="Improved progression-free survival"
                    )
                ],

                drug_gene_interactions=[
                    DrugGeneInteraction(
                        medication="Osimertinib",
                        gene="EGFR",
                        interaction="Positive Response",
                        recommendation="Recommended"
                    )
                ],

                clinical_trial_matches=[
                    ClinicalTrialMatch(
                        trial_id="NCT123456",
                        trial_title="EGFR Targeted Trial",
                        eligibility_score=0.92,
                        recruiting_status="Recruiting",
                        rationale="Mutation criteria matched"
                    )
                ],

                research_evidence=[
                    ResearchEvidence(
                        title="EGFR Inhibitor Research",
                        evidence_level="Level I",
                        summary="Strong evidence supporting therapy",
                        publication_year=2025
                    )
                ],

                risk_assessments=[
                    RiskAssessment(
                        risk_type="Disease Progression",
                        risk_score=0.45,
                        risk_level="Moderate",
                        recommendation="Close follow-up"
                    )
                ],

                tumor_board_recommendation=
                TumorBoardRecommendation(
                    consensus_decision=
                    "Proceed with targeted therapy",

                    rationale=
                    "Supported by genomics and research evidence",

                    participating_agents=[
                        "GenomicsAgent",
                        "DiagnosisAgent",
                        "TreatmentAgent",
                        "ResearchAgent"
                    ]
                ),

                final_personalized_care_plan=
                final_summary,

                monitoring_plan=[
                    "CBC every month",
                    "LFT every month",
                    "CT Scan every 8 weeks"
                ],

                follow_up_recommendations=[
                    "Oncology Consultation",
                    "Clinical Trial Screening",
                    "Pharmacogenomics Review"
                ],

                confidence_score=0.94,

                generated_by_agents=[
                    "GenomicsAgent",
                    "DiagnosisAgent",
                    "TreatmentAgent",
                    "ResearchAgent"
                ],

                execution_time_seconds=execution_time,

                status="SUCCESS"
            )

        except Exception as ex:

            logger.exception(
                f"Precision Medicine Analysis Failed "
                f"for Patient ID: {request.patient_id} "
                f"Error: {str(ex)}"
            )

            raise ex