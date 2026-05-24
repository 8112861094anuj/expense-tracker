from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models import User, Expense

from app.routes.user import router as user_router

try:
    print("Database connected successfully")
except Exception as e:
    print(f"Database connection failed: {e}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)

@app.get("/")
def root():
    return {"message": "Expense Tracker API Running"}

from app.routes.expense import router as expense_router

app.include_router(expense_router)

from fastapi.middleware.cors import CORSMiddleware