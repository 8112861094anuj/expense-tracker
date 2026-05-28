from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests
import os

from app.auth.dependencies import get_current_user
from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


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

        if not token:
            raise HTTPException(
                status_code=400,
                detail="Token missing"
            )

        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
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

        print("========== GOOGLE LOGIN ERROR ==========")
        print(e)
        print("=======================================")

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