from pydantic import BaseModel, Field

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

    class Config:
        from_attributes = True

class ExpenseUpdate(BaseModel):
    title: str
    amount: float = Field(gt=0)
    category: str

