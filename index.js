const chalk = require('chalk');
const fs = require('fs');

const path = require('path');

const basePath = path.join(__dirname, 'views');

const url = require('url');


const express = require('express');
const server = express();
const port = 3000;

const exphbs = require('express-handlebars');
const { count } = require('console');
const { StringDecoder } = require('string_decoder');
const { stringify } = require('querystring');

// Definindo nosso template engine:
server.engine('handlebars', exphbs.engine());

// Definindo o mecanismo de visualização:
server.set('view engine', 'handlebars');


// Definindo a pasta de arquivos estaticos:
server.use(express.static('public'));

// Descodificando a requisição web:
server.use(
    express.urlencoded({ extended: true }),
);
server.use(express.json());


// Declarando o partials:
const hbs = exphbs.create(
    {
        partialsDir: ['view/partials'],
    }
);
// Definindo a engine com partials:
server.engine('handlebars', hbs.engine);




if (!fs.existsSync('./users-cadaster')) {
    fs.mkdirSync('./users-cadaster');
};
if (!fs.existsSync('./services-schedule')) {
    fs.mkdirSync('./services-schedule');
};




// Rota principal (Home)
server.get('/', (req, res) => {

    res.render('home');
});






// Rota de cadastro:
server.get('/cadaster', (req, res) => {

    if (fs.existsSync('./user-logged')) {

        console.log(chalk.yellow('Page cadaster | Info: Desconecte da conta atual para cadastrar!'));

        const userAuthLogged = true;
        return res.render('cadaster', { userAuthLogged });

    } else {

        return res.render('cadaster');
    };
});

server.post('/cadaster', (req, res) => {

    const query = req.body;
    const userCadaster = {
        username: query.username,
        password: query.password,
        chekPassword: query.passConfirm,
    }


    checkExistsUser(userCadaster.username);
    if (checkExistsUser(userCadaster.username) === true) {

        console.log(chalk.yellow.bold(`O usuário "${userCadaster.username}" já possuí cadastro no sistema!`));

        const userAlreadyExists = true;
        return res.render('cadaster', { userAlreadyExists });

    } else {
        registerUserSystem(userCadaster.username, userCadaster.password);
        return res.render('home');
    };
});










// Rota de login:
server.get('/login', (req, res) => {

    if (fs.existsSync('./user-logged')) {

        console.log(chalk.yellow('Page login | Infor: Já existe um usuário logado!'));

        const userAuthLogged = true;
        return res.render('home', { userAuthLogged });

    } else {

        console.log(chalk.yellow(' Page Login | Info: Nenhum usuário logado!'));
        return res.render('login');
    };
});

server.post('/login', (req, res, next) => {

    const query = req.body;
    const userLogin = { username: query.username, password: query.password };


    if (userLogin.username === '' || userLogin.password === '') {
        console.log(chalk.yellow('Page login | Info: Preencha todos os campos!'));
        return res.render('login');

    } else {

        const checkCadaster = checkExistsUser(userLogin.username);
        if (checkCadaster === false) {

            console.log(chalk.red('Page login | Info: Usuário não identificado!'));

            const userNotIdentify = true;
            return res.render('login', { userNotIdentify });

        } else {

            console.log(chalk.blue('Page login | info: Usuário identificado!'));
            const userAccountData = getUserRegistrationData(userLogin.username);

            const login = userAccountData.username;
            const pass = userAccountData.password;


            if (login === userLogin.username && pass === userLogin.password) {

                console.log(chalk.bgGreen('Page login | Info: Acesso permitido!'));

                if (!fs.existsSync('./user-logged')) {
                    fs.mkdirSync('./user-logged');
                };
                registerUserLoginData(userLogin, userLogin.username);

                return res.render('home');

            } else {

                console.log(chalk.red('Page login | Info: Acesso negado. Verifique as credenciais!'));

                const checkCredentials = true;
                return res.render('login', { checkCredentials });
            };
        };
    };

});





function getCadasterUserLogged() {

    const folderUserLogged = readFolder('./user-logged');
    const nameUserLogged = folderUserLogged[0];

    const userLoggedData = fs.readFileSync(
        `./users-cadaster/${nameUserLogged}`,
        { encoding: 'utf-8', flag: 'r' },
        (err) => console.log(err)
    );
    const userLoggedOBJ = JSON.parse(userLoggedData);

    return userLoggedOBJ;
};



// Rota de visualização do perfil:
server.get('/view-profile', (req, res) => {

    if (fs.existsSync('user-logged')) {

        console.log(chalk.green('Page view-profile | Info: Usuário logado!'));

        const userLoggedData = getCadasterUserLogged();

        console.log(chalk.yellow('Page view-profile | Info: Dados do usuário logado:'))
        console.table(userLoggedData);


        if (userLoggedData.ficha === true) {

            console.log(chalk.yellow('Page view-profile | Info: O usuário já preencheu a ficha.'))

            const checkFicha = true;
            return res.render('view-profile', { userLoggedData });
        } else {

            console.log(chalk.red('Page view-profile | Info: O usuário não preencheu a ficha.'))

            const notCheckFicha = true;
            return res.render('view-profile', { userLoggedData, notCheckFicha });
        }


    } else {

        console.log(chalk.red('Page view-profile | Nenhum usuário logado!'));
        return res.render('login');
    };


});
server.post('/view-profile', (req, res) => {

    const post = req.body;

    if (post.downloadFicha) {
        console.log(chalk.yellow('Page view-profile | Info: O usuário baixou o arquivo!'));

        return res.sendFile('C:/Users/ismael.ngsilva/Desktop/project magic hands/magic-hands/public/archive/ficha-de-amnese.xlsx');
    };

    if (post.submit) {
        const fileSubmit = req.body;

        console.log(chalk.yellow('Page view-profile | Info: O usuário enviou o arquivo!'));
        console.log(chalk.blue(`Aquivo enviado: ${fileSubmit}`));

        const userLoggedData = getCadasterUserLogged();
        userLoggedData.ficha = true;

        fs.writeFileSync(
            `./users-cadaster/${userLoggedData.username}.json`,
            JSON.stringify(userLoggedData),
            (err) => console.log(err),
        );

        res.render('view-profile', { userLoggedData });
    };



    if (post.submitSchedule) {

        const userLoggedData = getCadasterUserLogged();
        const customerName = userLoggedData.username;


        if (!fs.existsSync(`./services-schedule/${customerName}-schedule`)) {
            fs.mkdirSync(`./services-schedule/${customerName}-schedule`);
        };


        console.log(chalk.blue('Page view-profile | Info: O usuário agendou um serviço!'));

        console.log(chalk.yellow('Detalhes do agendamento:'));
        console.table(post);



        const randomID = Math.floor(Math.random() * 10000);
        const stringID = String(randomID);

        class Schedule {
            constructor(id, typeService, dateSchedule, imageSchedule) {
                this.id = id;
                this.typeService = typeService;
                this.dateService = dateSchedule;
                this.imageSchedule = imageSchedule;
            };
        };
        let schedule = new Schedule(randomID, post.typeService, post.dateSchedule, './images/undefined');


        if (schedule.typeService === 'massagem-com-pedras-quentes') {
            schedule.imageSchedule = './images/massage-photo1.jpg';
        };
        if (schedule.typeService === 'massagem-de-aromaterapia') {
            schedule.imageSchedule = './images/massage-photo2.jpg';
        }
        if (schedule.typeService === 'massagem-esportiva') {
            schedule.imageSchedule = './images/massage-photo3.png';
        }
        if (schedule.typeService === 'massagem-de-ponto-gatilho') {
            schedule.imageSchedule = './images/massage-photo4.jpg';
        }

        try {
            fs.writeFileSync(
                `./services-schedule/${customerName}-schedule/${stringID}.json`,
                JSON.stringify(schedule),
                (err) => console.log(err)
            );
        } catch (error) {
            console.log(err);
        } finally {
            console.log(chalk.yellow('System | Info: Processo de agendamento finalizado.'))
        };


        const userDataSchedules = fs.readdirSync(
            `./services-schedule/${customerName}-schedule`,
            { encoding: 'utf8', flag: 'r' },
            (err) => console.log(err),
        );
        console.log(userDataSchedules);


        userLoggedData.agendamentos += 1;

        fs.writeFileSync(
            `./users-cadaster/${customerName}.json`,
            JSON.stringify(userLoggedData),
            (err) => console.log(err)
        );


        const checkSchedule = true;
        res.render('view-profile', { userLoggedData, checkSchedule, schedule });
    };

});




// Rota de preenchimento de ficha:
server.get('/form-registration', (req, res) => {

    res.render('/form-registration');
})





// Rota de agendamentos:
server.get('/agendamentos', (req, res) => {

    

    if (fs.existsSync('user-logged')) {

        const userLoggedData = getCadasterUserLogged();
        console.log(chalk.green('Page agendamentos | Info: Usuário logado!'));
        const customerName = userLoggedData.username;


        if(fs.existsSync(`./services-schedule/${customerName}-schedule`)){

            const userScheduleFolderData = fs.readdirSync(
                `./services-schedule/${customerName}-schedule`,
                {encoding: 'utf8', flag: 'r'},
                (err) => console.log(err),
            );

            if(userScheduleFolderData.length === 0){
                fs.rmdirSync(`./services-schedule/${customerName}-schedule`);
            };
        };


        if (fs.existsSync(`./services-schedule/${customerName}-schedule`)) {

            const folderUserSchedules = fs.readdirSync(
                `./services-schedule/${customerName}-schedule`,
                { encoding: 'utf8', flag: 'r' },
                (err) => console.log(err),
            );

            const mapAllSchedules = folderUserSchedules.map((schedule) => {
                const scheduleUser = fs.readFileSync(
                    `./services-schedule/${customerName}-schedule/${schedule}`,
                    { encoding: 'utf8', flag: 'r' },
                    (err) => console.log(err),
                );
                const scheduleUserOBJ = JSON.parse(scheduleUser);
                return scheduleUserOBJ;
            });
            res.render('agendamentos', { userLoggedData, mapAllSchedules });

        } else {
            const notExistsUserSchedule = true
            res.render('agendamentos', { userLoggedData, notExistsUserSchedule })
        };

    } else {

        console.log(chalk.red('Page view-profile | Nenhum usuário logado!'));
        return res.render('login');
    };
});

server.post('/agendamentos', (req, res) => {

    const post = req.body;

    const userLoggedData = getCadasterUserLogged();
    const customerName = userLoggedData.username;


    if (post.deleteSchedule) {
        if (fs.existsSync(`./services-schedule/${customerName}-schedule`)) {

            fs.unlinkSync(
                `./services-schedule/${customerName}-schedule/${post.codSchedule}.json`,
                (err) => console.log(err),
            );
            console.log(chalk.blue('Page agendamentos | Info: Usuário excluiu um agendamento!'));
            console.log(chalk.yellow(`Page agendamentos | Info: O arquivo "${post.codSchedule}.json" foi deletado!`));
        };
    };



    const folderUserSchedules = fs.readdirSync(
        `./services-schedule/${customerName}-schedule`,
        { encoding: 'utf8', flag: 'r' },
        (err) => console.log(err),
    );
    const mapAllSchedules = folderUserSchedules.map((schedule) => {
        const scheduleUser = fs.readFileSync(
            `./services-schedule/${customerName}-schedule/${schedule}`,
            { encoding: 'utf8', flag: 'r' },
            (err) => console.log(err),
        );
        const scheduleUserOBJ = JSON.parse(scheduleUser);
        return scheduleUserOBJ;
    });


    userLoggedData.agendamentos -= 1;
    fs.writeFileSync(
        `./users-cadaster/${customerName}.json`,
        JSON.stringify(userLoggedData),
        (err) => console.log(err)
    );

    res.render('agendamentos', { userLoggedData, mapAllSchedules });
});














// ALL FUNCTIONS FROM SISTEM:


// Função "Registrar dados do usuário na pasta (/users-cadsater)":
function registerUserSystem(username, password) {
    const userObject = {
        username: username,
        password: password,
        type_access: "default",
        ficha: false,
        agendamentos: 0
    };

    const userFileName = username;

    // Resgistrando dados do usuário:
    fs.writeFileSync(
        `./users-cadaster/${userFileName}.json`,
        JSON.stringify(userObject),
        (err) => console.log(err),
    );

    console.log(chalk.blue.bold(`Page cadaster | Info: O usuário "${username}" foi cadastrado no sistema!`));
};

// Função "Validar se o usuário foi cadstrado no sistema":
function checkExistsUser(username) {

    const nameuser = username;

    if (fs.existsSync(`./users-cadaster/${nameuser}.json`)) {

        return true;
    } else {
        return false;
    };
};

// Função "Resgatar dados do usuário cadastrado":
function getUserRegistrationData(username) {

    const accountUserJSON = fs.readFileSync(
        `./users-cadaster/${username}.json`,
        { encoding: 'utf-8', flag: 'r' },
        (err) => console.log(err),
    );

    const accountUserObject = JSON.parse(accountUserJSON);
    return accountUserObject;
};

// Função "Resgatar dados do usuário logado":
function getFileUserLogged(fileNameUser) {

    const userLoggedJSON = fs.readFileSync(
        `./user-logged/${fileNameUser}`,
        { encoding: 'utf8', flag: 'r' },
        (err) => console.log(err),
    );

    const userLoggedOBJ = JSON.parse(userLoggedJSON)

    return userLoggedOBJ;
};

// Função "Ler pasta":
function readFolder(folderName) {

    const folder = fs.readdirSync(
        `./${folderName}`,
        { encoding: 'utf8', flag: 'r' },
        (err) => console.log(err),
    );

    return folder;
};

// Função "Registrar o input de dados de login do usuário na pasta (/user-logged)":
function registerUserLoginData(accountOBJ, username) {
    fs.writeFileSync(
        `./user-logged/${username}.json`,
        JSON.stringify(accountOBJ),
        (err) => console.log(err)
    );
};











// Rota de saída
server.get('/exit', (req, res) => {

    if (fs.existsSync('./user-logged')) {

        const folderUserLogged = readFolder('user-logged');
        const fileUserLogged = folderUserLogged[0];

        const userLogged = getFileUserLogged(fileUserLogged);
        console.log(userLogged)

        fs.unlinkSync(`./user-logged/${fileUserLogged}`, (err) => {
            if (err) {
                console.log(err);
            }

            console.log(chalk.yellow(`Page exit | Info: O arquivo "${fileUserLogged}" foi excluído`))
        })

        if (!fs.existsSync(`./user-logged/${fileUserLogged}`)) {

            fs.rmdirSync(`./user-logged`);
        };
    };

    console.log(chalk.red('Page exit | Info: O usuário foi desconectado!'));

    res.render('home');
});

















server.listen(port, () => {
    console.log(chalk.bgGreen.bold('Servidor Conectado!'));
});