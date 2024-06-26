


const userBtn = document.querySelector('#btn-user');
const navbar = document.querySelector('#navbar');


userBtn.addEventListener('click', (e) => {

    if (!userBtn.classList.contains('btn-user-active')) {

        activeNavbar();

    } else {

        disableNavbar();
    };

});


function activeNavbar() {

    userBtn.classList.replace('fi', 'btn-user-active');
    userBtn.style.color = 'cyan';

    e = navbar.classList.replace('nav-off', 'nav-active');
};

function disableNavbar() {
    userBtn.classList.replace('btn-user-active', 'fi');
    userBtn.style.color = 'var(--color-opacity)';

    e = navbar.classList.replace('nav-active', 'nav-off');
}


// Validando a variavél back-end
const userAuthLogged = document.querySelector('#userAuthLogged');
setTimeout(() => {
    const checkAuth = userAuthLogged.innerText
    if(checkAuth === 'true'){
        alert('Você já está logado!');
    };
}, 300);

