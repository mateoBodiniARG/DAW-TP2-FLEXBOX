window.onload = function () {
  var form = document.getElementById("subscription-form");
  var fullName = document.getElementById("full-name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm-password");
  var age = document.getElementById("age");
  var phone = document.getElementById("phone");
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var postalCode = document.getElementById("postal-code");
  var dni = document.getElementById("dni");
  var modal = document.getElementById("modal");
  var modalMessage = document.getElementById("modal-message");
  var closeButton = document.getElementById("close-button");

  function validateField(field, validator, errorMessageId) {
    field.onblur = function () {
      var error = validator(field.value);
      document.getElementById(errorMessageId).textContent = error ? error : "";
    };
    field.onfocus = function () {
      document.getElementById(errorMessageId).textContent = "";
    };
  }

  function validateFullName(value) {
    return value.length > 6 && /\s/.test(value)
      ? ""
      : "El nombre debe tener más de 6 letras y un espacio.";
  }

  function validateEmail(value) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? "" : "Debe ser un email válido.";
  }

  function validatePassword(value) {
    return value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)
      ? ""
      : "Debe tener al menos 8 caracteres, con letras y números.";
  }

  function validateConfirmPassword(value) {
    return value === password.value ? "" : "Las contraseñas no coinciden.";
  }

  function validateAge(value) {
    return value >= 18 ? "" : "Debe ser un número mayor o igual a 18.";
  }

  function validatePhone(value) {
    return /^\d{7,}$/.test(value)
      ? ""
      : "Debe tener al menos 7 dígitos, sin espacios ni símbolos.";
  }

  function validateAddress(value) {
    return value.length > 4 && /\s/.test(value)
      ? ""
      : "Debe tener al menos 5 caracteres y un espacio.";
  }

  function validateCity(value) {
    return value.length >= 3 ? "" : "Debe tener al menos 3 caracteres.";
  }

  function validatePostalCode(value) {
    return value.length >= 3 ? "" : "Debe tener al menos 3 caracteres.";
  }

  function validateDNI(value) {
    return /^\d{7,8}$/.test(value) ? "" : "Debe tener 7 u 8 dígitos.";
  }

  validateField(fullName, validateFullName, "full-name-error");
  validateField(email, validateEmail, "email-error");
  validateField(password, validatePassword, "password-error");
  validateField(
    confirmPassword,
    validateConfirmPassword,
    "confirm-password-error"
  );
  validateField(age, validateAge, "age-error");
  validateField(phone, validatePhone, "phone-error");
  validateField(address, validateAddress, "address-error");
  validateField(city, validateCity, "city-error");
  validateField(postalCode, validatePostalCode, "postal-code-error");
  validateField(dni, validateDNI, "dni-error");

  form.onsubmit = function (event) {
    event.preventDefault();
    var hasError = false;
    var data = {};
    var fields = form.elements;

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (field.tagName === "INPUT") {
        var errorElement = document.getElementById(field.id + "-error");
        if (errorElement.textContent) {
          hasError = true;
        }
        data[field.name] = field.value;
      }
    }

    var validators = [
      {
        field: fullName,
        validator: validateFullName,
        errorId: "full-name-error",
      },
      { field: email, validator: validateEmail, errorId: "email-error" },
      {
        field: password,
        validator: validatePassword,
        errorId: "password-error",
      },
      {
        field: confirmPassword,
        validator: validateConfirmPassword,
        errorId: "confirm-password-error",
      },
      { field: age, validator: validateAge, errorId: "age-error" },
      { field: phone, validator: validatePhone, errorId: "phone-error" },
      { field: address, validator: validateAddress, errorId: "address-error" },
      { field: city, validator: validateCity, errorId: "city-error" },
      {
        field: postalCode,
        validator: validatePostalCode,
        errorId: "postal-code-error",
      },
      { field: dni, validator: validateDNI, errorId: "dni-error" },
    ];

    validators.forEach(function (item) {
      var error = item.validator(item.field.value);
      document.getElementById(item.errorId).textContent = error;
      if (error) hasError = true;
    });

    if (hasError) {
      alert("Por favor, corrige los errores en el formulario.");
    } else {
      var req = new XMLHttpRequest();
      req.open("POST", "https://jsonplaceholder.typicode.com/users", true);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 201) {
            var response = JSON.parse(req.responseText);
            localStorage.setItem("userData", JSON.stringify(response));
            modalMessage.textContent =
              "Suscripción exitosa. Datos recibidos: " +
              JSON.stringify(response, null, 2);
          } else {
            modalMessage.textContent =
              "Error en la suscripción: " + req.status + " " + req.statusText;
          }
          modal.style.display = "block";
        }
      };

      req.send(JSON.stringify(data));
    }
  };

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var savedData = localStorage.getItem("userData");
  if (savedData) {
    var userData = JSON.parse(savedData);
    for (var key in userData) {
      if (userData.hasOwnProperty(key)) {
        var input = document.getElementsByName(key)[0];
        if (input) {
          input.value = userData[key];
        }
      }
    }
  }
};
