const widgetInfoSchedules = document.querySelector('#div-info-schedules');



setTimeout(() => {
    const notExistsUserSchedule = document.querySelector('#notExistsUserSchedule');

    const qtdSchedules = document.querySelector('#qtd-schedules');


    if (notExistsUserSchedule) {
        if (notExistsUserSchedule.textContent === 'true') {
            widgetInfoSchedules.style.display = 'flex';
        };
    };

    if (qtdSchedules.innerText === 0) {
        widgetInfoSchedules.style.display = 'flex';
    };

}, 100)



// Funções do widget delete schedule
const containerWidget = document.querySelector('#containerWidget');
const widgetDeleteSchedule = document.querySelector('#widgetDeleteSchedule');

const btnOpenWidget = document.querySelectorAll('.btnOpenWidget');
console.log(btnOpenWidget);


btnOpenWidget.forEach((button) => {

    button.addEventListener('click', () => {

        widgetDeleteSchedule.style.display = 'flex';
        containerWidget.style.display = 'flex';
    });
});




// Inputs:
const inputCodShcedule = document.querySelector('#codSchedule');
const btnDelete = document.querySelector('#btnDelete');

btnDelete.addEventListener('click', (e) => {

    const infoDelete = document.querySelector('#info-delete');
    const codScheduleValue = inputCodShcedule.value;

    if (codScheduleValue === '') {
        e.preventDefault();

        infoDelete.style.color = 'crimson';
        infoDelete.innerText = '* Código inválido! *';
        infoDelete.style.fontStyle = 'italic';

        setTimeout(() => {

            infoDelete.style.color = '#000';
            infoDelete.innerText = '* Digite o código do agendamento *';
            infoDelete.style.fontStyle = 'none';
        }, 3000);
    };
});




const btnCloseWidgetSchedule = document.querySelector('#btnCloseWidget');
// Action close widget:
btnCloseWidgetSchedule.addEventListener('click', () => {

    widgetDeleteSchedule.style.display = 'none';
    containerWidget.style.display = 'none';
});









