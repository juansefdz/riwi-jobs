//selectores
const formLogin = document.querySelector("#form-login");
const emailUser = document.getElementById("email");
const passwordUser = document.getElementById("password");

//URL
const URLUser = "http://localhost:3000/companies";

console.log(formLogin);
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const userEmail = emailUser.value;
  const password = passwordUser.value;
  login(userEmail, password);
});
async function login(email, password) {
  const response = await fetch(`${URLUser}?email=${email}`);
  const data = await response.json();
  console.log(data);

  if (!data.length) {
    console.log("Email no registrado");
    return;
  }

  if (data[0].password === password) {
    localStorage.setItem("isAuthenticated", JSON.stringify(data[0]));
    window.location.href = "administrator.html";
  } else {
    console.log("Contraseña incorrecta.");
  }
}
