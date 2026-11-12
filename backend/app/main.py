from fastapi import FastAPI

from app.database import Base, engine
from app.models import User
from app.routers import auth, categories,complaints
from app.database import Base, engine
from app.models import User, Category, Complaint   #SQLAlchemy needs to know about your models before it can create their corresponding tables.That's why we import all models before calling create_all()

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)  #create_all()-It checks the registered SQLAlchemy models and creates their corresponding database tables if they don't already exist.

app=FastAPI(title="Complaint Management System") 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)  #This registers all the endpoints defined inside auth.py with our main FastAPI application.
app.include_router(categories.router)
app.include_router(complaints.router)  

@app.get("/")
async def  home():
    return {"message": "Welcome to Complaint Management System"}
