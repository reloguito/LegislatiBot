from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from .. import schemas, models, database
from ..services import auth_service

router = APIRouter()

@router.post("/register", response_model=schemas.UserInDB)
def register_user(
    user: schemas.UserCreate, 
    db: Session = Depends(database.get_db)
):
    """Registra un nuevo usuario (user o admin)."""
    db_user = auth_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )
    return auth_service.create_user(db=db, user=user)

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(database.get_db)
):
    """Inicia sesión y devuelve un token JWT."""
    user = auth_service.get_user_by_email(db, email=form_data.username)
    if not user or not auth_service.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth_service.create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/onboarding", response_model=schemas.OnboardingProfile)
def complete_onboarding(
    profile: schemas.OnboardingProfileCreate,
    current_user: models.User = Depends(auth_service.get_current_user),
    db: Session = Depends(database.get_db)
):
    """Completa el perfil de onboarding del usuario logueado."""
    return auth_service.create_onboarding_profile(db=db, profile=profile, user_id=current_user.id)

@router.get("/users/me", response_model=schemas.UserInDB)
def read_users_me(
    current_user: models.User = Depends(auth_service.get_current_user)
):
    """Obtiene la información del usuario actual."""
    return current_user