from utils.logger import logger

from autogen_agentchat.agents import AssistantAgent


def create_genomics_agent(model_client) -> AssistantAgent:
    """
    Creates the Genomics Agent responsible for:
    - Variant interpretation
    - Actionable mutation identification
    - Biomarker assessment
    - Pharmacogenomics analysis
    """

    try:

        logger.info(
            "Initializing GenomicsAgent"
        )

        genomics_agent = AssistantAgent(
            name="GenomicsAgent",

            model_client=model_client,

            description="""
            Expert in genomics, molecular diagnostics,
            precision medicine, biomarkers,
            pharmacogenomics, and targeted therapies.
            """,

            system_message="""
You are an expert Clinical Genomics Scientist specializing in
precision medicine and molecular oncology.

Responsibilities:

1. Analyze genomic variants.
2. Classify variants:
   - Pathogenic
   - Likely Pathogenic
   - VUS
   - Likely Benign
   - Benign

3. Identify:
   - Driver mutations
   - Actionable mutations
   - Resistance mutations
   - Companion diagnostic biomarkers

4. Evaluate:
   - Therapeutic implications
   - Prognostic implications
   - Pharmacogenomic impact

5. Recommend:
   - Targeted therapies
   - Biomarker-guided therapies
   - Additional genomic testing

6. Highlight:
   - Evidence level
   - Clinical relevance
   - Limitations

Return results using the following format:

GENOMIC_ANALYSIS:
- Summary

ACTIONABLE_VARIANTS:
- Variant
- Clinical Significance

BIOMARKER_INTERPRETATION:
- Biomarker
- Interpretation

PHARMACOGENOMICS:
- Drug
- Recommendation

TARGETED_THERAPIES:
- Therapy
- Rationale

CONFIDENCE_SCORE:
- Numeric score between 0 and 1
"""
        )

        logger.success(
            "GenomicsAgent initialized successfully"
        )

        return genomics_agent

    except Exception as ex:

        logger.exception(
            f"Failed to initialize GenomicsAgent: {str(ex)}"
        )

        raise ex