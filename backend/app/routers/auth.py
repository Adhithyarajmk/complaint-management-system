from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.security import hash_password


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)   #APIRouter() helps organize API endpoints into separate files.


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    # Check whether username already exists
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    # Check whether email already exists
    existing_email = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Hash the password
    hashed_password = hash_password(user.password)

    # Create user object
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role="user"
    )   #Creates a Python object using our SQLAlchemy User model.

    # Save user in database
    db.add(new_user)   #Adds the object to the database session.
    db.commit()        #Saves the changes to MySQL.
    db.refresh(new_user) #Retrieves updated database values for the object.

    return new_user