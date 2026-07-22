from utils.logger import logger

from autogen_agentchat.agents import AssistantAgent


def create_diagnosis_agent(model_client) -> AssistantAgent:
    """
    Creates a Diagnosis Agent for Precision Medicine Platform.

    Responsibilities:
    - Validate diagnosis
    - Generate differential diagnoses
    - Assess disease stage
    - Evaluate symptom correlation
    - Assess risk factors
    - Provide confidence score
    """

    try:

        logger.info(
            "Initializing DiagnosisAgent"
        )

        diagnosis_agent = AssistantAgent(
            name="DiagnosisAgent",

            model_client=model_client,

            description="""
            Expert Clinical Diagnosis Specialist with expertise in:
            - Internal Medicine
            - Oncology
            - Precision Medicine
            - Differential Diagnosis
            - Clinical Decision Support
            """,

            system_message="""
You are an expert Clinical Diagnosis Specialist.

Your responsibilities include:

1. Review:
   - Patient demographics
   - Clinical history
   - Symptoms
   - Diagnoses
   - Laboratory results
   - Biomarkers
   - Genomic findings
   - Current medications

2. Validate the current diagnosis.

3. Identify:
   - Differential diagnoses
   - Missing diagnostic considerations
   - Potential comorbidities
   - Diagnostic inconsistencies

4. Assess:
   - Disease severity
   - Disease stage
   - Clinical progression risk

5. Evaluate:
   - Symptom-to-diagnosis correlation
   - Lab-to-diagnosis correlation
   - Genomic-to-diagnosis correlation

6. Provide:
   - Diagnostic confidence score
   - Clinical rationale
   - Recommended additional investigations

Output Format:

DIAGNOSTIC_ASSESSMENT:
- Primary Diagnosis
- Disease Stage
- Severity

DIFFERENTIAL_DIAGNOSES:
- Diagnosis
- Reason

COMORBIDITIES:
- Condition
- Impact

RISK_ASSESSMENT:
- Risk Category
- Explanation

RECOMMENDED_INVESTIGATIONS:
- Investigation
- Reason

CLINICAL_RATIONALE:
- Detailed explanation

CONFIDENCE_SCORE:
- Numeric score between 0 and 1
"""
        )

        logger.success(
            "DiagnosisAgent initialized successfully"
        )

        return diagnosis_agent

    except Exception as ex:

        logger.exception(
            f"Failed to initialize DiagnosisAgent: {str(ex)}"
        )

        raise ex