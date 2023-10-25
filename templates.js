const folders = ['models', 'views', 'routes', 'logs', 'json'];

const configjson = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the OurApp.',
    main: 'ourapp.js',
    superuser: 'adm1n',
    database: 'exampledb'
};

const tokenjson = [{
    created: '2023-01-31 6:30:00',
    username: 'username',
    email: 'user@example.com',
    phone: '5556597890',
    token: 'token',
    expires: '1969-02-03 12:30:00',
    confirmed: 'tbd'
}];

const usagetxt = `

ourapp <command> <option>

Usage:

ourapp --help                            displays help
ourapp init --all                        creates the folder structure and config file
ourapp init --mk                         creates the folder structure
ourapp init --cat                        creates the config file with default settings
ourapp config --show                     displays a list of the current config settings
ourapp config --reset                    resets the config file with default settings
ourapp config --set                      sets a specific config setting
ourapp token --count                     displays a count of the tokens created
ourapp token --list                      list all the usernames with tokens
ourapp token --new <username>            generates a token for a given username, saves tokens to the json file
ourapp token --upd p <username> <phone>  updates the json entry with phone number
ourapp token --upd e <username> <email>  updates the json entry with email
ourapp token --fetch <username>          fetches a user record for a given username
ourapp token --search u <username>       searches a token for a given username
ourapp token --search e <email>          searches a token for a given email

`;

const inittxt = `

ourapp init <command> <option>

Usage:

ourapp init --all          creates the folder structure and config file
ourapp init --mk           creates the folder structure
ourapp init --cat          creates the config file with default settings

`;

const configtxt = `

ourapp <command> <option>

Usage:

ourapp config --show     displays a list of the current config settings
ourapp config --reset    resets the config file with default settings
ourapp config --set      sets a specific config setting

`;

const tokentxt = `

ourapp <command> <option>

Usage:

ourapp token --count                     displays a count of the tokens created
ourapp token --list                      list all the usernames with tokens
ourapp token --new <username>            generates a token for a given username, saves tokens to the json file
ourapp token --upd p <username> <phone>  updates the json entry with phone number
ourapp token --upd e <username> <email>  updates the json entry with email
ourapp token --fetch <username>          fetches a user record for a given username
ourapp token --search u <username>       searches a token for a given username
ourapp token --search e <email>          searches a token for a given email
ourapp token --search p <phone>          searches a token for a given phone number

`;

module.exports = {
    folders,
    configjson,
    tokenjson,
    usagetxt,
    inittxt,
    configtxt,
    tokentxt,
};
