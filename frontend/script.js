const API_URL = "http://127.0.0.1:8000/api/students";


// ===============================
// LOAD STUDENTS
// ===============================

async function loadStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const students = await response.json();

        const tableBody = document.getElementById("studentTableBody");

        tableBody.innerHTML = "";

        students.forEach(student => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to connect to FastAPI server.");
    }
}


// ===============================
// ADD STUDENT
// ===============================

document.getElementById("studentForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const course = document.getElementById("course").value;


        const student = {
            name: name,
            email: email,
            course: course
        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            });


            if (!response.ok) {
                throw new Error("Failed to add student");
            }


            const result = await response.json();


            document.getElementById("message").textContent =
                result.message;


            document.getElementById("studentForm").reset();


            // Reload student list
            loadStudents();


        } catch (error) {

            console.error("Error:", error);

            document.getElementById("message").textContent =
                "Unable to connect to FastAPI server.";
        }
    }
);


// ===============================
// LOAD STUDENTS WHEN PAGE OPENS
// ===============================

loadStudents();