//Selectores y variables globales
const form = document.getElementById("formRegister");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const nameCompany = document.getElementById("company");
const imgCompany = document.getElementById("img-company");
const URL = "http://localhost:3000/companies";

//Eventos
form.addEventListener("submit", (event) => {
  event.preventDefault();

  createUser();
});

async function createUser() {
  //Validar la información
  if (!validatePassword()) {
    showAlert("Contraseña no válida");
    return;
  }
  //Validar que el email no esté registrado
  if (await validateEmail()) {
    showAlert("El email ya se encuentra registrado.");
    return;
  }

  console.log("PASASTE LAS VALIDACIONES");

  try {
    //Crear al usuario
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail.value,
        password: userPassword.value,
        nameCompany: nameCompany.value,
        imageCompany: imgCompany.value,
        nit: "",
      }),
    });
  } catch (error) {
    console.log("Ocurrió un error al crear el usuario.");
  }
}

function validatePassword() {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  //Validar que las dos contraseñas sean iguales, tengan una minima longitud de 6 caracteres y tengan un caracter especial
  return (
    userPassword.value === passwordConfirmation.value &&
    regex.test(userPassword.value)
  );
}

async function validateEmail() {
  try {
    //
    const response = await fetch(`${URL}?email=${userEmail.value}`);

    const data = await response.json();
    //Si data tiene elementos quiere decir que el email ya está registrado
    console.log(data);
    return data.length;
  } catch (error) {
    return false;
  }
}
