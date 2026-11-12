from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.security import hash_password

from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user import UserLogin, TokenResponse
from app.security import verify_password, create_access_token

from app.dependencies import get_current_user, get_current_admin

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
        role="student"  # Default role for new users
    )   #Creates a Python object using our SQLAlchemy User model.

    # Save user in database
    db.add(new_user)   #Adds the object to the database session.
    db.commit()        #Saves the changes to MySQL.
    db.refresh(new_user) #Retrieves updated database values for the object.

    return new_user


@router.post("/login", response_model=TokenResponse)

def login_user(
    user: OAuth2PasswordRequestForm = Depends(),    #OAuth2PasswordRequestForm is a FastAPI dependency that extracts the username and password from the request form data.
    db: Session = Depends(get_db)
):

    # Find user by username
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    # Verify password
    if not verify_password(
        user.password,
        existing_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not existing_user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User account is inactive"
        )

    # Generate JWT
    access_token = create_access_token(
        data={"sub": str(existing_user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserResponse)
def get_user_profile(
    current_user: User = Depends(get_current_user)
):

    return current_user


@router.get("/admin-check")
def admin_check(
    current_admin: User = Depends(get_current_admin)
):

    return {
        "message": "Welcome Admin!",
        "username": current_admin.username,
        "role": current_admin.role
    }