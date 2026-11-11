from fastapi import FastAPI

from app.database import Base, engine
from app.models import User
from app.routers import auth

Base.metadata.create_all(bind=engine)  #create_all()-It checks the registered SQLAlchemy models and creates their corresponding database tables if they don't already exist.

app=FastAPI(title="Complaint Management System") 

app.include_router(auth.router)  #This registers all the endpoints defined inside auth.py with our main FastAPI application.

@app.get("/")
async def  home():
    return {"message": "Welcome to Complaint Management System"}
