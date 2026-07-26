// ===============================
// Student Management System
// ===============================

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Generate Student ID
function generateStudentID() {
    // const nextNumber = students.length + 1;
    // document.getElementById("studentId").value =
    //     "BIT" + String(nextNumber).padStart(4, "0");
}

// Photo Preview
document.getElementById("photo").addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("photoPreview").src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

});

// Display Students
function showStudents() {

    let table = "";

    students.forEach((student, index) => {

        table += `
        <tr>

            <td>
                <img src="${student.photo}"
                width="50"
                height="50"
                style="border-radius:50%;object-fit:cover;">
            </td>

            <td>${student.studentId}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.class}</td>

            <td>${student.phone}</td>

            <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editStudent(${index})">

                Edit

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteStudent(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("studentTable").innerHTML = table;

}

// Save Student
function saveStudent() {

    const student = {

        studentId: document.getElementById("studentId").value,

        name: document.getElementById("name").value,

        gender: document.getElementById("gender").value,

        dob: document.getElementById("dob").value,

        department: document.getElementById("department").value,

        class: document.getElementById("class").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        photo: document.getElementById("photoPreview").src

    };

    // Validation
    if (student.name === "") {

        alert("Student name is required.");
        return;

    }

    if (student.email !== "" &&
        !student.email.includes("@")) {

        alert("Invalid email address.");
        return;

    }

    if (editIndex === -1) {

        students.push(student);

    } else {

        students[editIndex] = student;
        editIndex = -1;

    }

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    bootstrap.Modal.getInstance(
        document.getElementById("studentModal")
    ).hide();

    clearForm();

    generateStudentID();

    showStudents();

}

// Edit Student
function editStudent(index) {

    editIndex = index;

    const student = students[index];

    document.getElementById("studentId").value = student.studentId;
    document.getElementById("name").value = student.name;
    document.getElementById("gender").value = student.gender;
    document.getElementById("dob").value = student.dob;
    document.getElementById("department").value = student.department;
    document.getElementById("class").value = student.class;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("address").value = student.address;
    document.getElementById("photoPreview").src = student.photo;

    new bootstrap.Modal(
        document.getElementById("studentModal")
    ).show();

}

// Delete Student
function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        showStudents();

    }

}

// Clear Form
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("gender").value = "Male";
    document.getElementById("dob").value = "";
    document.getElementById("department").selectedIndex = 0;
    document.getElementById("class").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";

    document.getElementById("photoPreview").src =
        "https://via.placeholder.com/180x180?text=Photo";

}

// Search
document.getElementById("search").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = students.filter(student =>

        student.studentId.toLowerCase().includes(keyword) ||

        student.name.toLowerCase().includes(keyword) ||

        student.department.toLowerCase().includes(keyword) ||

        student.class.toLowerCase().includes(keyword) ||

        student.phone.toLowerCase().includes(keyword)

    );

    let table = "";

    filtered.forEach((student, index) => {

        table += `
        <tr>

            <td>
                <img src="${student.photo}"
                width="50"
                height="50"
                style="border-radius:50%;">
            </td>

            <td>${student.studentId}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.class}</td>

            <td>${student.phone}</td>

            <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editStudent(${index})">

                Edit

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteStudent(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("studentTable").innerHTML = table;

});

// Initialize
generateStudentID();
showStudents();