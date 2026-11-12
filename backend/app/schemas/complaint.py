from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Literal

# Schema for submitting a complaint
class ComplaintCreate(BaseModel):
    title: str
    description: str
    category_id: int


# Schema for displaying complaint details
class ComplaintResponse(BaseModel):
    id: int
    user_id: int
    category_id: int
    title: str
    description: str
    status: str
    priority: str
    admin_response: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True) # it allows Pydantic to read values directly from SQLAlchemy model objects.


class ComplaintUpdate(BaseModel):
    status: Literal[   #Literal restricts a field to specific allowed values. For example, status cannot accidentally be "Completed" or "Waiting"
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected"
    ] | None = None

    priority: Literal[
        "Low",
        "Medium",
        "High"
    ] | None = None

    admin_response: str | None = None