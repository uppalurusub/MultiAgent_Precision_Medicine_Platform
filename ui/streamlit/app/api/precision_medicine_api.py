from typing import Any, Dict

import requests


class PrecisionMedicineAPI:
    """
    API client for the Multi-Agent Precision Medicine Platform.
    """

    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")

    @staticmethod
    def _handle_response(
        response: requests.Response,
    ) -> Dict[str, Any]:

        try:
            payload = response.json()

        except ValueError:
            payload = {
                "detail": response.text
                or "Invalid API response"
            }

        if not response.ok:

            detail = payload.get(
                "detail",
                payload,
            )

            raise RuntimeError(
                f"API {response.status_code}: {detail}"
            )

        return payload

    def health_check(
        self,
    ) -> Dict[str, Any]:

        response = requests.get(
            f"{self.base_url}/precision-medicine/health",
            timeout=(10, 30),
        )

        return self._handle_response(response)

    def simulate_patient_digital_twin(
        self,
        payload: Dict[str, Any],
    ) -> Dict[str, Any]:

        response = requests.post(
            f"{self.base_url}/precision-medicine",
            json=payload,

            # Multi-Agent execution can be long-running.
            # None disables the requests read timeout.
            timeout=None,
        )

        return self._handle_response(response)

    def get_simulation_status(
        self,
    ) -> Dict[str, Any]:

        response = requests.get(
            f"{self.base_url}/precision-medicine/version",
            timeout=(10, 30),
        )

        return self._handle_response(response)


def health_check(
    base_url: str,
) -> Dict[str, Any]:

    api = PrecisionMedicineAPI(
        base_url=base_url,
    )

    return api.health_check()


def simulate_patient_digital_twin(
    base_url: str,
    payload: Dict[str, Any],
) -> Dict[str, Any]:

    api = PrecisionMedicineAPI(
        base_url=base_url,
    )

    return api.simulate_patient_digital_twin(
        payload=payload,
    )


def get_simulation_status(
    base_url: str,
) -> Dict[str, Any]:

    api = PrecisionMedicineAPI(
        base_url=base_url,
    )

    return api.get_simulation_status()