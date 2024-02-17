/* SELECTORES */

//botones agregar - editar - eliminar job
const addNewJob = document.getElementById("btn-add-job");
const editJobBtn = document.getElementById("btn-edit-job");
const deleteJob = document.getElementById("btn-delete-job");

// selectores modal new vacancy

const TitleJob = document.getElementById("title-job");
const expJob = document.getElementById("experience");
const salaryJob = document.getElementById("salary");
const locationJob = document.getElementById("location");
const modalityJob = document.getElementById("modality");
const descriptionJob = document.getElementById("description");

//selector form
const formJobs = document.querySelector(".form-jobs");
//selector tbody
const jobsTbody = document.querySelector(".tbody-jobs");

/* URL */
const URLJobs = "http://localhost:3000/jobs";
const URLCompanies = "http://localhost:3000/companies";

let Companielocal = localStorage.getItem("isAuthenticated");
let companieconvert = JSON.parse(Companielocal);

/* EVENTOS */

document.addEventListener("DOMContentLoaded", () => {
  printJobs();
});

//validaciones crear o editar job
addNewJob.addEventListener("click", () => {
  // remover la clase btn-edit-job al hacer clic en el botón de agregar
  formJobs.classList.remove("editJob"); // Cambiado de "btn-edit-job" a "editJob"
});

formJobs.addEventListener("submit", (e) => {
  e.preventDefault();

  if (formJobs.classList.contains("editJob")) {
    // verifica si el formulario está en modo de edición
    const id = formJobs.getAttribute("id");
    editJobs(id); // Llama a la función editJobs para editar el trabajo
  } else {
    createJob();
  }
});

/* FUNCIONES */

//crear job
async function createJob() {
  const jobs = {
    name: TitleJob.value,
    description: descriptionJob.value,
    location: locationJob.value,
    experience: expJob.value,
    modality: modalityJob.value,
    salary: salaryJob.value,
    companieId: Companielocal,
  };

  fetch(URLJobs, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobs),
  });
}

//imprimir job
async function printJobs() {
  try {
    const response = await fetch(`${URLJobs}?_expand=companie`);
    const data = await response.json();

    data.forEach((e) => {
      jobsTbody.innerHTML += `
        <tr>
        <td>
            <div class="d-middle">
            <img
                src="${e.job}"
                alt="img-product"
                width="60"
                height="60"
                class="img-fluid rounded-circle img-company"
            />
            </div>
        </td>
        <td>${e.jobs}</td>
        <td>${e.description}</td>
        <td>${e.location}</td>
        <td>${e.experience}</td>
        <td>${e.modality}</td>
        <td>${e.salary}</td>
        <td>
            <button class="btn btn-primary btn-edit-job editJob" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop" id=${e.id}>
            <i class="bx bx-edit"></i>
            </button>

            <button class="btn btn-danger btn-delete-job" id=${e.id} onclick="delJobs('${e.id}')">
            <i class="bx bx-trash"></i>
            </button>
        </td>
        </tr>
          `;
    });

    const editJob = document.querySelectorAll(".btn-edit-job");

    //EDIT
    editJob.forEach((e) => {
      e.addEventListener("click", async (event) => {
        event.preventDefault();
        const id = event.target.getAttribute("id");
        const response = await fetch(`${URLJobs}/${id}`);
        const data = await response.json();

        TitleJob.value = data.name;
        expJob.value = data.experience;
        salaryJob.value = data.salary;
        locationJob.value = data.location;
        modalityJob.value = data.modality;
        descriptionJob.value = data.description;
        formJobs.classList.add("editJob"); // Corregido: agregar la clase editJob al formulario cuando se edita un trabajo
        formJobs.setAttribute("id", id);
      });
    });
  } catch (error) {
    console.error("ERROR", error);
  }
}

//eliminar job
async function delJobs(id) {
  console.log("entre");
  const URL = `http://localhost:3000/jobs/${id}`;

  try {
    await fetch(URL, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
  }
}

//editar job
async function editJobs(id) {
  const URL = `http://localhost:3000/jobs/${id}`;

  try {
    await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: TitleJob.value, // Corregido: se cambia nameCategory.value a TitleJob.value
        description: descriptionJob.value,
        location: locationJob.value,
        experience: expJob.value,
        modality: modalityJob.value,
        salary: salaryJob.value,
      }),
    });
  } catch (error) {
    console.log("error editando: ", error);
  }
}
