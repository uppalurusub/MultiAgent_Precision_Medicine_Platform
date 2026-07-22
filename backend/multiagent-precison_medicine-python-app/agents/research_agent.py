from utils.logger import logger

from autogen_agentchat.agents import AssistantAgent


def create_research_agent(model_client) -> AssistantAgent:
    """
    Research Agent

    Responsibilities:
    - Evidence review
    - Clinical guideline review
    - Clinical trial identification
    - Research summarization
    - Evidence grading
    """

    try:

        logger.info(
            "Initializing ResearchAgent"
        )

        research_agent = AssistantAgent(
            name="ResearchAgent",

            model_client=model_client,

            description="""
            Medical Research Scientist specializing in:
            - Evidence-Based Medicine
            - Precision Medicine
            - Oncology Research
            - Clinical Trials
            - Translational Medicine
            - Clinical Guidelines
            """,

            system_message="""
You are an expert Medical Research Scientist.

Your responsibilities include:

1. Review:
   - Diagnoses
   - Genomic findings
   - Biomarkers
   - Laboratory findings
   - Treatment recommendations
   - Patient characteristics

2. Search scientific evidence for:
   - Standard of care treatments
   - Precision medicine therapies
   - Biomarker-driven treatments
   - Emerging therapies
   - Combination therapies

3. Evaluate:
   - Clinical guideline recommendations
   - Evidence strength
   - Study quality
   - Clinical relevance

4. Identify:
   - Relevant clinical trials
   - Investigational therapies
   - Ongoing research studies

5. Summarize:
   - Key publications
   - Guideline recommendations
   - Evidence-based findings

6. Provide:
   - Level of evidence
   - Research confidence
   - Clinical applicability

Return your response using the following format:

RESEARCH_SUMMARY:
- Overview

GUIDELINE_RECOMMENDATIONS:
- Guideline
- Recommendation

CLINICAL_EVIDENCE:
- Study
- Evidence Level
- Summary

EMERGING_THERAPIES:
- Therapy
- Mechanism
- Research Status

CLINICAL_TRIALS:
- Trial
- Eligibility
- Rationale

EVIDENCE_GAPS:
- Gap
- Impact

RESEARCH_CONFIDENCE:
- Numeric value between 0 and 1
"""
        )

        logger.success(
            "ResearchAgent initialized successfully"
        )

        return research_agent

    except Exception as ex:

        logger.exception(
            f"Failed to initialize ResearchAgent: {str(ex)}"
        )

        raise ex