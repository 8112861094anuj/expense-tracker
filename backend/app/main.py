from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.models.user import User
from app.models.expense import Expense

from app.routes.user import router as user_router
from app.routes.expense import router as expense_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://expense-tracker-vert-seven-56.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(expense_router)


@app.get("/")
def root():
    return {
        "message": "Expense Tracker API Running"
    }