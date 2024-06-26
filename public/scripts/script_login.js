const inputUsername = document.querySelector('#input-username');
const inputPassword = document.querySelector('#input-pass');
const infoLogin = document.querySelector('#text-info-login');




const btnEyePass = document.querySelector('#icon-eye-pass');

btnEyePass.addEventListener('click', (e) => {

    if (btnEyePass.classList.contains('fi-ss-low-vision')) {

        e = showPassword();
    } else {

        e = hidePassword();
    }
});

function showPassword() {

    btnEyePass.classList.replace('fi-ss-low-vision', 'fi-rr-eye');
    inputPassword.type = 'text';
};

function hidePassword() {
    btnEyePass.classList.replace('fi-rr-eye', 'fi-ss-low-vision');
    inputPassword.type = 'password';
};



const btnSubmit = document.querySelector('#btn-submit');

btnSubmit.addEventListener('click', (e) => {

    const username = document.querySelector('#input-username').value;
    const password = document.querySelector('#input-pass').value;



    if (username === '' || password === '') {

        e.preventDefault();

        infoLogin.textContent = 'Por favor, preeencha todos os campos!';
        infoLogin.style.backgroundColor = 'rgba(255, 166, 0, 0.555)';

        setTimeout(() => {
            returnDefaultTextInfo(infoLogin);
        }, 3000);
    };
});


returnDefaultTextInfo(infoLogin);
function returnDefaultTextInfo(elementTextInfo) {

    infoLogin.innerText = '* Acesse sua conta por aqui! *'
    infoLogin.style.color = '#ffffffa8';
    infoLogin.style.backgroundColor = 'transparent';
};


// Manipulating back-end variable
const userNotIdentify = document.querySelector('#userNotIdentify');
setTimeout(() => {

    const userNotExists = userNotIdentify.innerText;
    if (userNotExists === 'true') {

        infoLogin.textContent = 'Oops... Este usuário ainda não foi cadastrado :(';
        infoLogin.style.backgroundColor = 'rgba(255, 0, 0, 0.501)';

        setTimeout(() => {
            returnDefaultTextInfo(infoLogin);
        }, 3000);
    };
}, 200);

// Manipulating back-end variable
const checkCredentials = document.querySelector('#checkCredentials');
setTimeout(() => {

    const passIncorrect = checkCredentials.innerText;
    if (passIncorrect === 'true') {

        infoLogin.textContent = 'Oops... Verifique as credenciais de acesso ! Tente novamente.';
        infoLogin.style.backgroundColor = 'rgba(255, 0, 0, 0.501)';

        setTimeout(() => {
            returnDefaultTextInfo(infoLogin);
        }, 3000);
    };

}, 200);



