from datetime import date, datetime
from typing import Any

def humanize_key(value: str) -> str:
    return str(value).replace("_", " ").strip().title()

def format_value(value: Any) -> str:
    if value is None:
        return "N/A"
    if isinstance(value, bool):
        return "Yes" if value else "No"
    if isinstance(value, float):
        return f"{value:,.2f}"
    if isinstance(value, int):
        return f"{value:,}"
    if isinstance(value, (date, datetime)):
        return value.isoformat()
    return str(value)

def severity_icon(value: str) -> str:
    text = str(value).lower()
    if any(x in text for x in ("critical", "severe", "high", "failed", "abnormal")):
        return "🔴"
    if any(x in text for x in ("moderate", "warning", "likely")):
        return "🟠"
    if any(x in text for x in ("low", "normal", "up", "success", "completed")):
        return "🟢"
    return "🔵"
