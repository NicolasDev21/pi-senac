const inputUsername = document.querySelector('#input-username').value;
const inputPassword = document.querySelector('#input-pass').value;
const inputConfirmPass = document.querySelector('#input-confirmPass').value;

const infoCadaster = document.querySelector('#info-cadaster');
const infoCheckCadaster = document.querySelector('#text-info-back-end');


const checkLogin = document.querySelector('#auth');


const btnEyePass = document.querySelector('#icon-eye-pass');


btnEyePass.addEventListener('click', (e) => {
    if (btnEyePass.classList.contains('fi-ss-low-vision')) {

        e = showPassword();
    } else {

        e = hidePassword();
    }
});

function showPassword() {

    const inputConfirmPass = document.querySelector('#input-confirmPass');

    btnEyePass.classList.replace('fi-ss-low-vision', 'fi-rr-eye');
    inputConfirmPass.type = 'text';
};

function hidePassword() {

    const inputConfirmPass = document.querySelector('#input-confirmPass');

    btnEyePass.classList.replace('fi-rr-eye', 'fi-ss-low-vision');
    inputConfirmPass.type = 'password';
};



const btnSubmit = document.querySelector('#btn-submit');

btnSubmit.addEventListener('click', (e) => {

    const inputUsername = document.querySelector('#input-username').value;
    const inputPassword = document.querySelector('#input-pass').value;
    const inputConfirmPass = document.querySelector('#input-confirmPass').value;


    if (inputUsername === '' || inputPassword === '' || inputConfirmPass === '') {
        e.preventDefault()

        infoCadaster.textContent = 'Por favor, preencha todos os campos!';
        infoCadaster.style.backgroundColor = 'rgba(255, 166, 0, 0.555)';

        returnInfoCadaster(infoCadaster);
    } else {

        if (inputPassword !== inputConfirmPass) {

            e.preventDefault()

            infoCadaster.textContent = 'Oops... As senhas devem ser idênticas!';
            infoCadaster.style.backgroundColor = 'rgba(255, 0, 0, 0.501)';

            returnInfoCadaster(infoCadaster);

        };
    };

    // Check user logged | Variable back-end
    const userAuthLogged = document.querySelector('#userAuthLogged');
    setTimeout(() => {

        const checkLogin = userAuthLogged.innerText;
        if (checkLogin === 'true') {

            window.confirm('Desconecte da conta atual para realizar um cadastro!');
            btnSubmit.addEventListener('click', (e) => {

                e.preventDefault();
            });
        };
    }, 300);

});


returnInfoCadaster(infoCadaster);
function returnInfoCadaster(element) {

    setTimeout(() => {
        element.style.backgroundColor = 'transparent';
        element.innerText = 'Faça seu cadastro aqui!';
    }, 3000)
};





  // Check user cadaster | Variable back-end
  const userAlreadyExists = document.querySelector('#userAlreadyExists');
  setTimeout(() => {

      const checkUserExists = userAlreadyExists.innerText;
      if (checkUserExists === 'true') {

          infoCadaster.style.backgroundColor = 'rgba(255, 0, 0, 0.501)';
          infoCadaster.textContent = 'Oops... esse usuário já foi cadastrado :( ';
      };
  }, 200);






