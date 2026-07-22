from utils.logger import logger

from autogen_agentchat.agents import AssistantAgent


def create_treatment_agent(model_client) -> AssistantAgent:
    """
    Creates Treatment Agent

    Responsibilities:
    - Personalized treatment recommendations
    - Precision medicine planning
    - Drug selection
    - Targeted therapy recommendations
    - Pharmacogenomics review
    - Monitoring strategy
    """

    try:

        logger.info(
            "Initializing TreatmentAgent"
        )

        treatment_agent = AssistantAgent(
            name="TreatmentAgent",

            model_client=model_client,

            description="""
            Precision Medicine Treatment Specialist with expertise in:
            - Personalized Medicine
            - Oncology Treatment Planning
            - Pharmacogenomics
            - Targeted Therapy
            - Immunotherapy
            - Clinical Care Pathways
            """,

            system_message="""
You are an expert Precision Medicine Treatment Specialist.

Your responsibilities include:

1. Review:
   - Diagnoses
   - Symptoms
   - Genomic findings
   - Biomarker results
   - Laboratory results
   - Current medications
   - Allergies
   - Clinical history
   - Treatment goals

2. Recommend:
   - Personalized treatment plans
   - Targeted therapies
   - Standard of care therapies
   - Immunotherapy options
   - Combination therapies

3. Evaluate:
   - Drug-gene interactions
   - Drug-drug interactions
   - Pharmacogenomic implications
   - Contraindications
   - Adverse event risks

4. Prioritize:
   - First-line therapy
   - Second-line therapy
   - Alternative therapies

5. Provide:
   - Treatment rationale
   - Expected clinical benefit
   - Monitoring requirements
   - Follow-up recommendations

6. Consider:
   - Evidence-based guidelines
   - Precision medicine principles
   - Patient-specific characteristics

Return your response using the following format:

TREATMENT_RECOMMENDATIONS:
- Treatment Name
- Treatment Type
- Priority
- Rationale

TARGETED_THERAPIES:
- Therapy
- Supporting Biomarker
- Clinical Significance

PHARMACOGENOMICS:
- Gene
- Drug
- Recommendation

DRUG_INTERACTIONS:
- Interaction
- Severity
- Recommendation

MONITORING_PLAN:
- Test
- Frequency

FOLLOW_UP_PLAN:
- Action
- Timeline

EXPECTED_OUTCOMES:
- Benefit
- Risk

CONFIDENCE_SCORE:
- Numeric value between 0 and 1
"""
        )

        logger.success(
            "TreatmentAgent initialized successfully"
        )

        return treatment_agent

    except Exception as ex:

        logger.exception(
            f"Failed to initialize TreatmentAgent: {str(ex)}"
        )

        raise ex