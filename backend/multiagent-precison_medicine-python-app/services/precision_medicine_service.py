from datetime import datetime
from utils.logger import logger

from implementation.precision_medicine_impl import (
    PrecisionMedicineImplementation
)

import mlflow
from datetime import datetime
import time

mlflow.set_tracking_uri(
    "http://localhost:5000"
)

mlflow.set_experiment(
    "MultiAgent_Precision_Medicine_Platform_Interface"
)

class PrecisionMedicineService:

    def __init__(self):
        self.impl = PrecisionMedicineImplementation()

        logger.info(
            "PrecisionMedicineService initialized successfully"
        )

    async def generate_precision_plan(
        self,
        request
    ):
        start_time = datetime.now()

        try:
            logger.info(
                f"Starting Precision Medicine Service "
                f"for Patient ID: {request.patient_id}"
            )

            logger.debug(
                f"Request Payload: {request.model_dump()}"
            )

            with mlflow.start_run(
                run_name=
                f"MultiAgent_Precision_Medicine_Platform_Generate_Precision_Plan_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            ):
                # Log to MLflow
                mlflow.log_param(
                    "start_time",
                    start_time.strftime("%Y-%m-%d %H:%M:%S")
                )
                mlflow.log_param(
                    "input_text",
                    request
                )

                response = await self.impl.generate_precision_plan(
                    request=request
                )

                execution_time = (
                    datetime.now() - start_time
                ).total_seconds()

                mlflow.log_param(
                    "response",
                    response
                )

                mlflow.set_tag(
                    "source",
                    "FastAPI"
                )

                mlflow.set_tag(
                    "endpoint",
                    "/precision-medicine"
                )

                end_time = datetime.now()

                mlflow.log_param(
                    "end_time",
                    end_time.strftime("%Y-%m-%d %H:%M:%S")
                )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

            logger.success(
                f"Precision Medicine Service completed successfully "
                f"for Patient ID: {request.patient_id} "
                f"in {execution_time:.2f} seconds"
            )

            return response

        except Exception as ex:

            execution_time = (
                datetime.now() - start_time
            ).total_seconds()

            logger.exception(
                f"Precision Medicine Service failed "
                f"for Patient ID: {request.patient_id} "
                f"after {execution_time:.2f} seconds. "
                f"Error: {str(ex)}"
            )

            raise ex

    async def health_check(self):
        """
        Service health verification.
        """

        try:
            logger.info(
                "Precision Medicine Service Health Check Started"
            )

            result = {
                "status": "UP",
                "service": "Precision Medicine Service"
            }

            logger.success(
                "Precision Medicine Service Health Check Passed"
            )

            return result

        except Exception as ex:

            logger.exception(
                f"Health Check Failed: {str(ex)}"
            )

            raise ex

    async def get_version(self):
        """
        Service version details.
        """

        try:
            logger.info(
                "Fetching Precision Medicine Service Version"
            )

            result = {
                "application": "Multi-Agent Precision Medicine Platform",
                "service": "Precision Medicine Service",
                "version": "1.0.0",
                "autogen_version": "0.7.5"
            }

            logger.success(
                "Version information retrieved successfully"
            )

            return result

        except Exception as ex:

            logger.exception(
                f"Failed to retrieve version information: {str(ex)}"
            )

            raise ex