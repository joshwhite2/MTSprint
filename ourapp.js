/********
 * filename: ourapp.js
 * Created Oct. 24 2023
 * Authors:
 * Josh White
 * Matt Young
 * Ryan Crowley
 * revised:
 */
global.DEBUG = true;

const fs = require("fs");
const { initializeApp } = require('init.js');
const { configApp }= require("/init.js");
const { tokenApp } = require("/token.js")

const myArgs = process.argv.slice(2);
if(DEBUG) if (myArgs.length >= 1) console.log('the ourapp.args: ', myArgs);

switch (myArgs[0]) {
    case 'init':
        case 'i':
            if(DEBUG) console.log(myArgs[0], '--initialize the application');
            initializeApp();
            break;
    case 'config':
        case 'c':
            if(DEBUG) console.log(myArgs[0], '--display the config file');
            configApp();
            break;
    case 'token':
        case 't':
            if (DEBUG) console.log(myArgs[0], '--display the tokens');
            tokenApp();
            break;
    case 'help':
        case 'h':
            default:
                fs.readFile(__dirname + "/usage.txt", (error, data)=>{
                    if(error) throw error;
                    console.log(data.tostring());
                })
}