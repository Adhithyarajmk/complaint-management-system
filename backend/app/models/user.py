from sqlalchemy import String, Integer, Boolean, DateTime
from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from sqlalchemy.orm import relationship


class User(Base):   #allows SQLAlchemy to recognize the class as a database model.

    __tablename__ = "users"  #tells SQLAlchemy to create a MySQL table named users

    id: Mapped[int] = mapped_column(   
        Integer,
        primary_key=True,
        index=True
    )

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        String(20),
        default="user",
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    complaints = relationship(
    "Complaint",
    back_populates="user"
)