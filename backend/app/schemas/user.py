from pydantic import BaseModel, Field, ConfigDict


# Schema for user registration
class UserCreate(BaseModel):

    username: str = Field(min_length=3, max_length=50)  #Field() allows us to define validation rules.

    email: str

    password: str = Field(min_length=8)


# Schema for returning user information
class UserResponse(BaseModel):

    id: int
    username: str
    email: str
    role: str
    is_active: bool

    model_config = ConfigDict(from_attributes=True)  #This allows Pydantic to read values directly from SQLAlchemy model objects.


class UserLogin(BaseModel):

    username: str
    password: str


class TokenResponse(BaseModel):

    access_token: str
    token_type: str