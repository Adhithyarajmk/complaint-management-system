from pydantic import BaseModel, ConfigDict


# Schema for creating a category
class CategoryCreate(BaseModel):
    name: str
    description: str | None = None


# Schema for returning category details
class CategoryResponse(BaseModel):
    id: int
    name: str
    description: str | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)   #It allows Pydantic to read values directly from SQLAlchemy model objects.