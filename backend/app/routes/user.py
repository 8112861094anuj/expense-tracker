from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user

from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.auth.security import hash_password
from google.oauth2 import id_token
from google.auth.transport import requests

from app.auth.security import create_access_token

router = APIRouter()

@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    hashed_pw = hash_password(user.password)

    new_user = User(
        email=user.email,
        password=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

from fastapi import HTTPException
from app.schemas.user import UserLogin
from app.auth.security import (
    verify_password,
    create_access_token
)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/google-login")
def google_login(data: dict, db: Session = Depends(get_db)):

    try:

        token = data.get("token")

        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request()
        )

        email = idinfo["email"]

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:

            user = User(
                email=email,
                password=""
            )

            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = create_access_token(
            {"sub": user.email}
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    except Exception as e:

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email
    }