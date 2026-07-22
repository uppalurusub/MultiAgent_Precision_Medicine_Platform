from pydantic import BaseModel
from typing import List, Optional


class GenomicFinding(BaseModel):
    gene: str
    mutation: str
    significance: str
    therapeutic_implication: Optional[str] = None


class BiomarkerInterpretation(BaseModel):
    biomarker_name: str
    value: str
    interpretation: str
    clinical_relevance: Optional[str] = None


class DiagnosisAssessment(BaseModel):
    primary_diagnosis: str
    disease_stage: Optional[str] = None
    confidence_score: float
    rationale: str


class TreatmentRecommendation(BaseModel):
    treatment_name: str
    treatment_type: str
    priority: str
    rationale: str
    expected_benefit: Optional[str] = None


class DrugGeneInteraction(BaseModel):
    medication: str
    gene: str
    interaction: str
    recommendation: str


class ClinicalTrialMatch(BaseModel):
    trial_id: str
    trial_title: str
    eligibility_score: float
    recruiting_status: str
    rationale: str


class ResearchEvidence(BaseModel):
    title: str
    evidence_level: str
    summary: str
    publication_year: Optional[int] = None


class RiskAssessment(BaseModel):
    risk_type: str
    risk_score: float
    risk_level: str
    recommendation: str


class TumorBoardRecommendation(BaseModel):
    consensus_decision: str
    rationale: str
    participating_agents: List[str]


class PrecisionMedicineResponse(BaseModel):

    patient_id: str

    patient_name: str

    case_summary: str

    genomic_findings: List[GenomicFinding]

    biomarker_interpretations: List[BiomarkerInterpretation]

    diagnostic_assessment: DiagnosisAssessment

    treatment_recommendations: List[TreatmentRecommendation]

    drug_gene_interactions: List[DrugGeneInteraction]

    clinical_trial_matches: List[ClinicalTrialMatch]

    research_evidence: List[ResearchEvidence]

    risk_assessments: List[RiskAssessment]

    tumor_board_recommendation: TumorBoardRecommendation

    final_personalized_care_plan: str

    monitoring_plan: List[str]

    follow_up_recommendations: List[str]

    confidence_score: float

    generated_by_agents: List[str]

    execution_time_seconds: Optional[float] = None

    status: str = "SUCCESS"