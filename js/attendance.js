// =============================
// Attendance Management
// =============================

let students =
JSON.parse(localStorage.getItem("students")) || [];

let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

// Today's Date
const today = new Date().toISOString().split("T")[0];

document.getElementById("attendanceDate").value = today;

// Load Students
showAttendance();

function showAttendance(){

    let html = "";

    students.forEach(student=>{

        html += `

        <tr>

            <td>

                <img
                src="${student.photo}"
                width="55"
                height="55"
                class="rounded-circle"
                style="object-fit:cover;">

            </td>

            <td>

                ${student.studentId}

            </td>

            <td>

                ${student.name}

            </td>

            <td>

                ${student.department}

            </td>

            <td>

                ${student.class}

            </td>

            <td>

                <select
                id="status${student.studentId}"
                class="form-select">

                    <option value="Present">

                        ✅ Present

                    </option>

                    <option value="Absent">

                        ❌ Absent

                    </option>

                    <option value="Late">

                        ⏰ Late

                    </option>

                </select>

            </td>

        </tr>

        `;

    });

    document.getElementById("attendanceTable").innerHTML = html;

}

function saveAttendance(){

    const date =
    document.getElementById("attendanceDate").value;

    attendance =
    attendance.filter(a=>a.date!==date);

    students.forEach(student=>{

        attendance.push({

            studentId:student.studentId,

            name:student.name,

            department:student.department,

            class:student.class,

            photo:student.photo,

            date:date,

            status:
            document.getElementById(
                "status"+student.studentId
            ).value

        });

    });

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    alert("Attendance saved successfully!");

}