import os   #helps access environment variables.

from dotenv import load_dotenv   
from sqlalchemy import URL, create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

load_dotenv()   ##loads the variables stored in .env


# Database configuration
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")


# Database URL
DATABASE_URL = URL.create(

    drivername="mysql+pymysql",   #	Specifies the database type and driver.
    username=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=int(DB_PORT),  #converts str port no: to int ("3306" into 3306)
    database=DB_NAME
)


# Create engine
engine = create_engine(DATABASE_URL)   #responsible for managing communication between Python and the database.(connection manager between FastAPI and MySQL.)


# Create database session  (A session represents a workspace where we perform database operations.)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Base class for models
class Base(DeclarativeBase):  #parent class for our SQLAlchemy models
    pass


# Database dependency
def get_db():

    db = SessionLocal()  #creates a database session

    try:
        yield db  #provides that session to the API endpoint.

    finally:  #ensures the session is closed after the request finishes.
        db.close()


with engine.connect() as connection:
    print("Database connection successful!")