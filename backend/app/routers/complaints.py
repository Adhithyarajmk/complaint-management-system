from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.complaint import Complaint
from app.models.category import Category
from app.models.user import User
from app.schemas.complaint import ComplaintCreate, ComplaintResponse,ComplaintUpdate
from app.dependencies import get_current_user,get_current_admin


router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)


# Submit a complaint (Students only)
@router.post("/", response_model=ComplaintResponse, status_code=201)
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can submit complaints"
        )

    category = db.query(Category).filter(
        Category.id == complaint.category_id,
        Category.is_active == True
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    new_complaint = Complaint(
        user_id=current_user.id,
        category_id=complaint.category_id,
        title=complaint.title,
        description=complaint.description
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return new_complaint


# View complaints submitted by the logged-in student
@router.get("/", response_model=list[ComplaintResponse])
def get_my_complaints(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can view their complaints"
        )

    complaints = db.query(Complaint).filter(
        Complaint.user_id == current_user.id
    ).all()

    return complaints

# Admin: View all complaints
@router.get("/admin/", response_model=list[ComplaintResponse])
def get_all_complaints(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    complaints = db.query(Complaint).all()

    return complaints


# Admin: Update complaint status, priority and response
@router.patch("/admin/{complaint_id}")
def update_complaint(
    complaint_id: int,
    complaint_data: ComplaintUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    update_data = complaint_data.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No update data provided"
        )

    for field, value in update_data.items():
        setattr(complaint, field, value)

    db.commit()
    db.refresh(complaint)

    return {
        "message": "Complaint updated successfully",
        "complaint": complaint
    }