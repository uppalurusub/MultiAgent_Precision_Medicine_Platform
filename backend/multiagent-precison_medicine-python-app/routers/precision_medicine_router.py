from fastapi import APIRouter, HTTPException
from utils.logger import logger
from datetime import datetime

from models.request_model import PrecisionMedicineRequest
from models.response_model import PrecisionMedicineResponse
from services.precision_medicine_service import PrecisionMedicineService

router = APIRouter()

service = PrecisionMedicineService()


@router.post(
    "/precision-medicine",
    response_model=PrecisionMedicineResponse,
    summary="Generate Personalized Precision Medicine Plan",
    description="""
    Multi-Agent Precision Medicine Platform

    Agents:
    - Genomics Agent
    - Diagnosis Agent
    - Treatment Agent
    - Research Agent

    Generates:
    - Genomic Analysis
    - Diagnostic Assessment
    - Personalized Treatment Recommendations
    - Clinical Trial Matching
    - Research Evidence
    - Tumor Board Recommendation
    """
)
async def generate_precision_medicine_plan(
    request: PrecisionMedicineRequest
):
    start_time = datetime.now()

    try:
        logger.info(
            f"[REQUEST RECEIVED] Patient ID: {request.patient_id}"
        )

        logger.info(
            f"Starting Precision Medicine Analysis for Patient: "
            f"{request.patient_name}"
        )

        response = await service.generate_precision_plan(
            request=request
        )

        execution_time = (
            datetime.now() - start_time
        ).total_seconds()

        logger.info(
            f"Precision Medicine Analysis Completed | "
            f"Patient ID: {request.patient_id} | "
            f"Execution Time: {execution_time:.2f} seconds"
        )

        return response

    except Exception as ex:

        execution_time = (
            datetime.now() - start_time
        ).total_seconds()

        logger.exception(
            f"Precision Medicine Analysis Failed | "
            f"Patient ID: {request.patient_id} | "
            f"Execution Time: {execution_time:.2f} seconds | "
            f"Error: {str(ex)}"
        )

        raise HTTPException(
            status_code=500,
            detail=str(ex)
        )


@router.get(
    "/precision-medicine/health",
    summary="Health Check"
)
async def health_check():

    logger.info(
        "Precision Medicine Platform Health Check Invoked"
    )

    return {
        "status": "UP",
        "service": "Multi-Agent Precision Medicine Platform"
    }


@router.get(
    "/precision-medicine/version",
    summary="API Version"
)
async def get_version():

    logger.info(
        "Version Endpoint Invoked"
    )

    return {
        "application": "Multi-Agent Precision Medicine Platform",
        "version": "1.0.0",
        "autogen_version": "0.7.5"
    }