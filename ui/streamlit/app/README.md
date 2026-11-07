# Healthcare Digital Twin Streamlit App

Streamlit frontend for the FastAPI Multi-Agent Precision Medicine router.

## API endpoints used

- `POST /precision-medicine`
- `GET /precision-medicine/health`
- `GET /precision-medicine/version`

The requested `get_simulation_status()` client function is mapped to the router's
version endpoint because the supplied router does not expose a separate
simulation-status endpoint.

## Run

1. Start the FastAPI backend on port 8000.
2. Create and activate a Python virtual environment.
3. Install dependencies:

   `pip install -r requirements.txt`

4. Start Streamlit:

   `streamlit run app.py`

5. Update the FastAPI Base URL in the sidebar if required.

## Structure

```text
healthcare-digital-twin-streamlit-app/
├── .streamlit/config.toml
├── api/digital_twin_api.py
├── components/
│   ├── agent_results.py
│   ├── request_form.py
│   ├── response_view.py
│   └── sidebar.py
├── utils/formatters.py
├── app.py
├── precision_medicine_request.json
├── requirements.txt
└── README.md
```
