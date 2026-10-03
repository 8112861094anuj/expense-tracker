from pydantic import BaseModel, Field
from datetime import datetime

class ExpenseCreate(BaseModel):
    title: str
    amount: float = Field(gt=0)
    category: str

class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ExpenseUpdate(BaseModel):
    title: str
    amount: float = Field(gt=0)
    category: str

