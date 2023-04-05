$('#login_btn').on('click', () => {
  $('#modalLoginForm').modal('show')  
})

$('#register_btn').on('click', () => {
  $('#modalRegisterForm').modal('show')
})

//EVENTO SUBMIT FORMULARIO LOGIN
formLogin.addEventListener("submit", (event) => {
  
  event.preventDefault();

  var fieldsValidate = {    
    defaultFormemail   : { type: 'input', name: 'Email' },
    defaultFormpass : { type: 'input', name: 'Password' }
  };

  //Si paso todas las validaciones
  if (validateForm(fieldsValidate, 'formContact', false)) {
    const cabeceras = new Headers();
    cabeceras.append("Content-Type", "application/json");

    let objUser = {        
      email     : defaultFormemail.value,
      password  : defaultFormpass.value
    }

    fetch("http://localhost:3002/api/login", {
      method: "POST",
      headers: cabeceras,
      body: JSON.stringify(objUser),
      redirect: 'follow'
    })        
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data);
        if (data.code === 200) {                        
          formLogin.reset();
          localStorage.setItem("jwt", data.token)
          location.href = '/'
        } else {
          toastr.error(data.message)            
        }
      })
      .catch(error => {
      console.log(error);
      })    
  }

});

//EVENTO SUBMIT FORMULARIO REGISTRO
formRegister.addEventListener("submit", (event) => {
  
  event.preventDefault();
  
  var fieldsValidate = {    
    registerFormname   : { type: 'input', name: 'Nombre' },
    registerFormemail  : { type: 'input', name: 'Email' },
    registerFormpass   : { type: 'input', name: 'Password' },
    verifyFormpass    : { type: 'input', name: 'Repetir Password' }
  };

  //Si paso todas las validaciones
  if (validateForm(fieldsValidate, 'formRegister', false)) {
    if (registerFormpass.value == verifyFormpass.value) {
      
      const cabeceras = new Headers();
      cabeceras.append("Content-Type", "application/json");

      let objUser = {
        name      : registerFormname.value,
        email     : registerFormemail.value,
        password  : registerFormpass.value
      }

      console.log('objUser: ',objUser);
      fetch("http://localhost:3002/api/users", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(objUser)
      })        
        .then(response => response.json())
        .then(data => {
          console.log('data: ', data);
          if (data.code === 201) {            
            formRegister.reset();
            $('#modalRegisterForm').modal('hide');
            $('#modalLoginForm').modal('show');
          } else {
            alertSystem('error', data.message);
          }
        })
        .catch(error => {
        console.log(error);
        })
    } else {      
      toastr.error('Las password no coinciden!')
    }
  }

});