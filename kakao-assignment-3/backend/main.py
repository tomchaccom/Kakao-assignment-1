import os
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from sqlalchemy import Boolean, Column, Integer, String, create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import Session, declarative_base, sessionmaker


# DB 설정
ENV_PATH = Path(__file__).resolve().parent / ".env.local"
load_dotenv(ENV_PATH)

database_url = make_url(os.environ["DATABASE_URL"])
if (
    database_url.drivername.startswith("sqlite")
    and database_url.database
    and not Path(database_url.database).is_absolute()
):
    database_url = database_url.set(
        database=str(Path(__file__).resolve().parent / database_url.database)
    )

DATABASE_URL = database_url.render_as_string(hide_password=False)
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
]
connect_args = (
    {"check_same_thread": False}
    if database_url.drivername.startswith("sqlite")
    else {}
)
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# DB 모델 (테이블 구조 정의)
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, nullable=False, default=False)


# Pydantic 스키마 (요청/응답 데이터 구조 정의)
class TodoCreate(BaseModel):
    title: str
    completed: bool = False


class TodoResponse(TodoCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int


# 테이블 생성
Base.metadata.create_all(bind=engine)


# FastAPI 앱 생성
app = FastAPI(title="Todo API")


# FastAPI 앱 미들웨어 및 CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB 세션 의존성
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 전체 Todo 목록 조회
@app.get("/todos", response_model=list[TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).order_by(Todo.id).all()


# 새 Todo 생성
@app.post(
    "/todos",
    response_model=TodoResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new_todo = Todo(title=todo.title, completed=todo.completed)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


# Todo 수정
@app.put("/todos/{id}", response_model=TodoResponse)
def update_todo(id: int, todo: TodoCreate, db: Session = Depends(get_db)):
    existing_todo = db.query(Todo).filter(Todo.id == id).first()
    if existing_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )

    existing_todo.title = todo.title
    existing_todo.completed = todo.completed
    db.commit()
    db.refresh(existing_todo)
    return existing_todo


# Todo 삭제
@app.delete("/todos/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(id: int, db: Session = Depends(get_db)):
    existing_todo = db.query(Todo).filter(Todo.id == id).first()
    if existing_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )

    db.delete(existing_todo)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
