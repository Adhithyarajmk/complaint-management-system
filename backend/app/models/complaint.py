from sqlalchemy import (
    String,
    Integer,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Complaint(Base):

    __tablename__ = "complaints"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"),
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Pending",
        nullable=False
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        default="Medium",
        nullable=False
    )

    admin_response: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()  #func.now() is used in SQLAlchemy to get the current date and time from the database.
    )

    category = relationship(
        "Category",
        back_populates="complaints"
    )   #back_populates="complaints" connects this relationship to the complaints attribute in the Category model.

    user = relationship(
        "User",
        back_populates="complaints"
    )    #This allows SQLAlchemy to access the student associated with a complaint.
       #back_populates tells SQLAlchemy which attribute represents the other side of that same relationship.
