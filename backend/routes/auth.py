from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.jwt import verify_token
from fastapi import Depends




router = APIRouter()

# Fake database user
fake_user = {
    "email": "admin@test.com",
    "password": "1234",
    "role": "admin"
}

class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    if data.email != fake_user["email"] or data.password != fake_user["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": "demo_token_123",
        "user": {
            "email": fake_user["email"],
            "role": fake_user["role"]
        }
    }
@router.get("/profile")
def profile(user=Depends(verify_token)):
    return user
