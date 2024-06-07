var formulario = document.getElementById("subscription-form");
var inputNombreCompleto = document.getElementById("full-name");
var inputEmail = document.getElementById("email");
var inputContraseña = document.getElementById("password");
var inputConfirmarContraseña = document.getElementById("confirm-password");
var inputEdad = document.getElementById("age");
var inputTelefono = document.getElementById("phone");
var inputDireccion = document.getElementById("address");
var inputCiudad = document.getElementById("city");
var inputCodigoPostal = document.getElementById("postal-code");
var inputDNI = document.getElementById("dni");

var errorNombreCompleto = document.getElementById("full-name-error");
var errorEmail = document.getElementById("email-error");
var errorContraseña = document.getElementById("password-error");
var errorConfirmarContraseña = document.getElementById(
  "confirm-password-error"
);
var errorEdad = document.getElementById("age-error");
var errorTelefono = document.getElementById("phone-error");
var errorDireccion = document.getElementById("address-error");
var errorCiudad = document.getElementById("city-error");
var errorCodigoPostal = document.getElementById("postal-code-error");
var errorDNI = document.getElementById("dni-error");

function validarNombreCompleto() {
  var nombreCompleto = inputNombreCompleto.value;
  if (nombreCompleto.length <= 6 || nombreCompleto.indexOf(" ") === -1) {
    errorNombreCompleto.textContent =
      "El nombre completo debe tener más de 6 letras y al menos un espacio.";
    return false;
  } else {
    errorNombreCompleto.textContent = "";
    return true;
  }
}

function validarEmail() {
  var email = inputEmail.value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorEmail.textContent = "El email debe tener un formato válido.";
    return false;
  } else {
    errorEmail.textContent = "";
    return true;
  }
}

function validarContraseña() {
  var contraseña = inputContraseña.value;
  if (
    contraseña.length < 8 ||
    !/\d/.test(contraseña) ||
    !/[a-zA-Z]/.test(contraseña)
  ) {
    errorContraseña.textContent =
      "La contraseña debe tener al menos 8 caracteres, formados por letras y números.";
    return false;
  } else {
    errorContraseña.textContent = "";
    return true;
  }
}

function validarConfirmarContraseña() {
  var contraseña = inputContraseña.value;
  var confirmarContraseña = inputConfirmarContraseña.value;
  if (contraseña !== confirmarContraseña) {
    errorConfirmarContraseña.textContent = "Las contraseñas no coinciden.";
    return false;
  } else {
    errorConfirmarContraseña.textContent = "";
    return true;
  }
}

function validarEdad() {
  var edad = parseInt(inputEdad.value, 10);
  if (isNaN(edad) || edad < 18) {
    errorEdad.textContent =
      "La edad debe ser un número entero mayor o igual a 18.";
    return false;
  } else {
    errorEdad.textContent = "";
    return true;
  }
}

function validarTelefono() {
  var telefono = inputTelefono.value;
  var telefonoRegex = /^\d{7,}$/;
  if (!telefonoRegex.test(telefono)) {
    errorTelefono.textContent =
      "El teléfono debe ser un número de al menos 7 dígitos, sin espacios, guiones ni paréntesis.";
    return false;
  } else {
    errorTelefono.textContent = "";
    return true;
  }
}

function validarDireccion() {
  var direccion = inputDireccion.value;
  if (direccion.length < 5 || direccion.indexOf(" ") === -1) {
    errorDireccion.textContent =
      "La dirección debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.";
    return false;
  } else {
    errorDireccion.textContent = "";
    return true;
  }
}

function validarCiudad() {
  var ciudad = inputCiudad.value;
  if (ciudad.length < 3) {
    errorCiudad.textContent = "La ciudad debe tener al menos 3 caracteres.";
    return false;
  } else {
    errorCiudad.textContent = "";
    return true;
  }
}

function validarCodigoPostal() {
  var codigoPostal = inputCodigoPostal.value;
  if (codigoPostal.length < 3) {
    errorCodigoPostal.textContent =
      "El código postal debe tener al menos 3 caracteres.";
    return false;
  } else {
    errorCodigoPostal.textContent = "";
    return true;
  }
}

function validarDNI() {
  var dni = inputDNI.value;
  var dniRegex = /^\d{7,8}$/;
  if (!dniRegex.test(dni)) {
    errorDNI.textContent = "El DNI debe ser un número de 7 u 8 dígitos.";
    return false;
  } else {
    errorDNI.textContent = "";
    return true;
  }
}

var campos = [
  { input: inputNombreCompleto, error: errorNombreCompleto },
  { input: inputEmail, error: errorEmail },
  { input: inputContraseña, error: errorContraseña },
  { input: inputConfirmarContraseña, error: errorConfirmarContraseña },
  { input: inputEdad, error: errorEdad },
  { input: inputTelefono, error: errorTelefono },
  { input: inputDireccion, error: errorDireccion },
  { input: inputCiudad, error: errorCiudad },
  { input: inputCodigoPostal, error: errorCodigoPostal },
  { input: inputDNI, error: errorDNI },
];

campos.forEach(function (campo) {
  campo.input.addEventListener("blur", function () {
    validarCampo(campo);
  });
});

function validarCampo(campo) {
  if (campo.input.value.trim() === "") {
    campo.error.textContent = "Este campo es obligatorio.";
    return false; 
  } else {
    campo.error.textContent = "";
    return true; 
  }
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  var todoValido = true;
  var mensajes = [];

  campos.forEach(function (campo) {
    if (!validarCampo(campo)) {
      todoValido = false;
      mensajes.push(campo.error.textContent);
    }
  });

  if (todoValido) {
    var datosFormulario = campos
      .map(function (campo) {
        return campo.input.name.replace("-", " ") + ": " + campo.input.value;
      })
      .join("\n");
    alert("Formulario enviado con éxito:" + datosFormulario);
  } else {
    alert("Errores en el formulario:" + mensajes.join("\n"));
  }
});
