const containerForWidgets = document.querySelector('#container-widgets');
const btnCloseWidgetExit = document.querySelector('#btn-close-widget-exit');




const widgetExit = document.querySelector('#widget-exit');

const btnExitAccount = document.querySelector('#btn-exit-account');
btnExitAccount.addEventListener('click', () => {

    containerForWidgets.style.display = 'flex';
    widgetExit.style.display = 'flex';
});

const btnConfirmExit = document.querySelector('#btn-submit-exit');
btnConfirmExit.addEventListener('mouseout', () => {

    const figure = document.querySelector('#figure-field-exit');
    figure.innerText = ':|';

});
btnConfirmExit.addEventListener('mouseover', () => {

    const figure = document.querySelector('#figure-field-exit');
    figure.innerText = ':(';

});

const btnCancelExit = document.querySelector('#btn-cancel-exit');
btnCancelExit.addEventListener('click', () => {

    containerForWidgets.style.display = 'none';
    widgetExit.style.display = 'none';
});

btnCancelExit.addEventListener('mouseout', () => {

    const figure = document.querySelector('#figure-field-exit');
    figure.innerText = ':|';

});
btnCancelExit.addEventListener('mouseover', () => {

    const figure = document.querySelector('#figure-field-exit');
    figure.innerText = ':)';

});


btnCloseWidgetExit.addEventListener('click', () => {

    containerForWidgets.style.display = 'none';
    widgetExit.style.display = 'none';
});
btnCloseWidgetExit.addEventListener('mouseover', () => {

    const figure = document.querySelector('#figure-field-exit');
    figure.innerText = ':D';
});
btnCloseWidgetExit.addEventListener('mouseout', () => {

    const figure = document.querySelector('#figure-field-exit');
    figure.innerText = ':|';
});










const btnSendFicha = document.querySelector('#btn-send-ficha');
const infoFicha = document.querySelector('#text-info-ficha');

const checkSchedule = document.querySelector('#checkSchedule');



// MANIPULATION VARIABLES OF BACK-END:

// Validate user send "ficha"
setTimeout(() => {
    const widgetFormRegister = document.querySelector('#widget-form-registration');

    const notCheckFicha = document.querySelector('#notCheckFicha');

    if (notCheckFicha) {
        if (notCheckFicha.textContent === 'true') {
            containerForWidgets.style.display = 'flex';
            widgetFormRegister.style.display = 'flex';
        };
    };
}, 100);


// Validate user schedule
setTimeout(() => {
    if(checkSchedule){
        const containerInformationPage = document.querySelector('#container-information-page');

        if(checkSchedule.textContent === 'true'){
            containerInformationPage.style.display = 'flex';

            setTimeout(() => {
                containerInformationPage.style.display = 'none';
            }, 3500);
        }
    }
}, 200);






btnSendFicha.addEventListener('click', (e) => {

    const userFicha = document.querySelector('#file-ficha-user').value;
    const infoFicha = document.querySelector('#text-info-ficha');

    console.log(userFicha);

    if (userFicha === '' || userFicha === null || userFicha === undefined) {

        e.preventDefault();

        infoFicha.style.display = 'flex';
        setTimeout(() => {
            infoFicha.style.display = 'none';
        }, 2000);

    } else {

        const widgetForm = document.querySelector('#widget-form-registration');
        e = widgetForm.style.display = 'none'
        containerForWidgets.style.display = 'none';
    }

});




const widgetShcedule = document.querySelector('#widget-card-service');

const btnLinkService1 = document.querySelector('#link-service1');
const btnLinkService2 = document.querySelector('#link-service2');
const btnLinkService3 = document.querySelector('#link-service3');
const btnLinkService4 = document.querySelector('#link-service4');


btnLinkService1.addEventListener('click', () => {

    containerForWidgets.style.display = 'flex';
    widgetShcedule.style.display = 'flex';
});
btnLinkService2.addEventListener('click', () => {

    containerForWidgets.style.display = 'flex';
    widgetShcedule.style.display = 'flex';
});
btnLinkService3.addEventListener('click', () => {

    containerForWidgets.style.display = 'flex';
    widgetShcedule.style.display = 'flex';
});
btnLinkService4.addEventListener('click', () => {

    containerForWidgets.style.display = 'flex';
    widgetShcedule.style.display = 'flex';
});



const btnCloseSchedule = document.querySelector('#btn-close-schedule');

btnCloseSchedule.addEventListener('click', () => {

    containerForWidgets.style.display = 'none';
    widgetShcedule.style.display = 'none';
});











