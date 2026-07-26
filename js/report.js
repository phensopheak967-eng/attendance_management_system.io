// ==========================
// Attendance Reports
// ==========================

let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

const today =
new Date().toISOString().split("T")[0];

document.getElementById("reportDate").value = today;

document
.getElementById("search")
.addEventListener("keyup", loadReport);

loadReport();

function loadReport(){

    const date =
    document.getElementById("reportDate").value;

    const keyword =
    document.getElementById("search")
    .value
    .toLowerCase();

    const report =
    attendance.filter(student=>{

        return student.date===date &&

        (
            student.studentId
            .toLowerCase()
            .includes(keyword)

            ||

            student.name
            .toLowerCase()
            .includes(keyword)
        );

    });

    let html="";

    let present=0;
    let absent=0;
    let late=0;

    report.forEach(student=>{

        if(student.status==="Present") present++;

        if(student.status==="Absent") absent++;

        if(student.status==="Late") late++;

        let badge="";

        if(student.status==="Present"){

            badge=
            '<span class="badge bg-success">Present</span>';

        }

        else if(student.status==="Absent"){

            badge=
            '<span class="badge bg-danger">Absent</span>';

        }

        else{

            badge=
            '<span class="badge bg-warning text-dark">Late</span>';

        }

        html+=`

        <tr>

            <td>

                <img
                src="${student.photo}"
                width="50"
                height="50"
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

                ${student.date}

            </td>

            <td>

                ${badge}

            </td>

        </tr>

        `;

    });

    document.getElementById("reportTable").innerHTML = html;

    document.getElementById("presentCount").innerHTML = present;

    document.getElementById("absentCount").innerHTML = absent;

    document.getElementById("lateCount").innerHTML = late;

}