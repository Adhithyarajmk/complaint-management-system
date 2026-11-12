import jwt

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.security import SECRET_KEY, ALGORITHM
from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)      #When an API endpoint requires authentication, it extracts the token from the request's Authorization header using the OAuth2PasswordBearer instance. The token is then validated and used to identify the authenticated user.


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )     #It verifies the JWT signature and checks its expiration.If the token is invalid or expired, PyJWT raises an exception
 
        user_id = payload.get("sub")     #sub-subject ,We'll store the user's ID inside this JWT claim.

        if user_id is None:
            raise credentials_exception

    except jwt.InvalidTokenError:
        raise credentials_exception

    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User account is inactive"
        )

    return user



#What is get_current_user()?

# This function identifies the currently authenticated user.

# It:
# 1. Extracts the token.
# 2. Verifies the token.
# 3. Gets the user ID.
# 4. Retrieves the user from MySQL.
# 5. Checks whether the account is active.
# 6. Returns the user object.

def get_current_admin(
    current_user: User = Depends(get_current_user)    #It retrieves the authenticated user from MySQL
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    return current_user