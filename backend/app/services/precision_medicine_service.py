from datetime import datetime

from app.config.settings import (
    settings,
    usage_capture,
    INPUT_PRICE_PER_1M,
    OUTPUT_PRICE_PER_1M,
)

logger = settings.get_logger()


from app.implementation.precision_medicine_impl import (
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
        start_ts = time.perf_counter()

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
                mlflow.log_param("start_time", start_time.isoformat())
                mlflow.set_tag("source", "FastAPI")
                mlflow.set_tag("endpoint", "monitoring/analyze")
                mlflow.set_tag("llm_provider", "OpenRouter")

                with usage_capture() as usage:

                    response = await self.impl.generate_precision_plan(
                        request=request
                    )

                execution_time = time.perf_counter() - start_ts
                usage_values = usage.as_dict()

                # Log configuration and actual usage separately.
                mlflow.log_param("llm_model", usage_values["model"])
                mlflow.log_param(
                    "input_price_per_1m_usd", INPUT_PRICE_PER_1M
                )
                mlflow.log_param(
                    "output_price_per_1m_usd", OUTPUT_PRICE_PER_1M
                )
                mlflow.log_param("input", request)
                mlflow.log_param("output", response)
                mlflow.log_param("execution_time", execution_time)

                metric_names = (
                    "input_tokens",
                    "output_tokens",
                    "total_tokens",
                    "input_cost_usd",
                    "output_cost_usd",
                    "total_cost_usd",
                    "llm_call_count",
                    "usage_reported_call_count",
                )
                for metric_name in metric_names:
                    mlflow.log_metric(
                        metric_name,
                        float(usage_values[metric_name])
                    )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

                mlflow.set_tag("llm_usage_source", usage_values["source"])
                mlflow.log_param("end_time", datetime.now().isoformat())

                logger.info(
                    "LLM usage captured: "
                    f"model={usage_values['model']}, "
                    f"input_tokens={usage_values['input_tokens']}, "
                    f"output_tokens={usage_values['output_tokens']}, "
                    f"total_tokens={usage_values['total_tokens']}, "
                    f"input_cost_usd={usage_values['input_cost_usd']:.15f}, "
                    f"output_cost_usd={usage_values['output_cost_usd']:.15f}, "
                    f"total_cost_usd={usage_values['total_cost_usd']:.15f}, "
                    f"llm_call_count={usage_values['llm_call_count']}, "
                    f"usage_reported_call_count="
                    f"{usage_values['usage_reported_call_count']}"
                )

                if usage_values["usage_reported_call_count"] == 0:
                    logger.warning(
                        "No token usage was reported by the AutoGen model "
                        "client. Check that MonitoringImplementation uses "
                        "settings.get_model_client() and that the provider "
                        "returns usage metadata."
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