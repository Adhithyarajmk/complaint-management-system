from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse
from app.dependencies import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


# Admin: Create a category
@router.post("/", response_model=CategoryResponse)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    existing_category = db.query(Category).filter(
        Category.name == category.name
    ).first()

    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    new_category = Category(
        name=category.name,
        description=category.description
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category


# Logged-in users: View active categories
@router.get("/", response_model=list[CategoryResponse])
def get_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Category).filter(
        Category.is_active == True
    ).all()