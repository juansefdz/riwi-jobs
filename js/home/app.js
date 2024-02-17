/* SELECTORES */

const searchJobs = document.querySelector(".search-job");
const printJobs = document.getElementById("print-jobs");
const submitJobs= document.getElementById("btn-submit")
const modalityJob=document.getElementById("modality-filter")
let timer;


/* URLS */
const URLJobs = "http://localhost:3000/jobs";
/* IMPRIMIR HOME  */

document.addEventListener("DOMContentLoaded",  (e) =>{
  e.preventDefault();
  getJobs()
  
});


submitJobs.addEventListener("click",(event)=>{
  console.log("entre");
  getJobs();
  cleanHTML();
  
  
})

async function getJobs() {

  const response = await fetch(`${URLJobs}?name=${searchJobs.value}&modality=${modalityJob.value}`);
  const data = await response.json();
  console.log(data);
  printJobsHome(data);
}

function printJobsHome(data) {
  
  if (!data) {
    const titleAlert = document.createElement("h2");
    titleAlert.textContent = "No se encontraron empleos";
    titleAlert.classList.add("alert");

    printJobs.appendChild(titleAlert);
    return;
  }
  data.forEach((e) => {
    printJobs.innerHTML += `
          <div class="card-job">
          <h2>${e.name}</h2>
  
          <p>
          ${e.description}
          </p>
  
          <div class="row">
            <div class="col-6">
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bx bx-current-location"></i>
                <span class="fw-semibold">${e.location}</span>
              </div>
  
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bx bx-time"></i>
                <span class="fw-semibold">10-02-2024</span>
              </div>
            </div>
  
            <div class="col-6 d-flex justify-content-end">
              <img
                src="assets/img/logo.webp"
                alt="logo"
                height="80"
                width="80"
                class="object-fit-contain rounded-circle img-company"
              />
            </div>
          </div>
        </div>
              `;
  });
}

function cleanHTML() {
  while (printJobs.firstChild) {
    printJobs.removeChild(printJobs.firstChild);
  }
}
