from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Student Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

students = [
    {
        "id": 1,
        "name": "Arun",
        "email": "arun@example.com",
        "course": "Computer Science"
    },
    {
        "id": 2,
        "name": "Priya",
        "email": "priya@example.com",
        "course": "Artificial Intelligence"
    }
]


class Student(BaseModel):
    name: str
    email: str
    course: str


@app.get("/")
def root():
    return {"message": "Student Management API is running"}


@app.get("/api/students")
def get_students():
    return students


@app.post("/api/students")
def create_student(student: Student):
    new_student = {
        "id": len(students) + 1,
        "name": student.name,
        "email": student.email,
        "course": student.course
    }

    students.append(new_student)

    return {
        "message": "Student created successfully",
        "student": new_student
    }


@app.get("/api/students/{student_id}")
def get_student(student_id: int):
    for student in students:
        if student["id"] == student_id:
            return student

    return {"message": "Student not found"}