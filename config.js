const fs = require("fs");
const myArgs = process.argv.slice(2);

//Add logging to the Command Line Interface using eventLoggin
//load logEvents module

const logEvents = require("./logEvents");
//define/extend and EventEmitter class
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
//add listener to the log event
myEmitter.on("log", (event, level, msg) =>
  logEvents("log", (event, level, msg))
);

const { configjson } = require("./templates");

function displayConfig() {
  if (DEBUG) console.log("config.displayConfig()");
  fs.readFile(__dirname + "/json/config.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
  });
  myEmitter.emit(
    "log",
    "config.displayConfig()",
    "INFO",
    "display config.json"
  );
}

function resetConfig() {
  if (DEBUG) console.log("config.resetConfig()");
  let configdata = JSON.stringify(configjson, null, 2);
  fs.writeFile(__dirname + "/json/config.json", configdata, (err) => {
    if (err) throw err;
    if (DEBUG) console.log("Configuration returned to Normal");
    myEmitter.emit(
      "log",
      "config.resetConfig()",
      "INFO",
      "Configuration returned to Normal"
    );
  });
}

function setConfig() {
  if (DEBUG) console.log("config.setConfig()");
  if (DEBUG) console.log(myArgs);

  let match = false;
  fs.readFile(__dirname + "/json/config.json", (error, data) => {
    if (error) throw error;
    if (DEBUG) console.log(JSON.parse(data));
    let cfg = JSON.parse(data);
    for (let key of Object.keys(cfg)) {
      if (key === myArgs[2]) {
        cfg[key] = myArgs[3];
        match = true;
        break;
      }
    }
    if (!match) {
      console.log("invalid key: ${myArgs[2]}, try another.");
      myEmitter.emit(
        "log",
        "config.setConfig()",
        "Warning",
        "invalid key: ${myArgs[2]}, try another."
      );
    }
    if (DEBUG) console.log(cfg);
    data = JSON.stringify(cfg, null, 2);
    fs.writeFile(__dirname + "/json/config.json", data, (error) => {
      if (error) throw error;
      if (DEBUG) console.log("Config file Successfully updated!");
      myEmitter.emit(
        "log",
        "config.setConfig()",
        "INFO",
        'config.json "{myArgs[2]}": update to "{myArgs[3]}"'
      );
    });
  });
}

function configApp() {
  if (DEBUG) console.log("configApp()");

  switch (myArgs[1]) {
    case "--show":
      if (DEBUG) console.log("--show");
      displayConfig();
      break;
    case "--reset":
      if (DEBUG) console.log("--reset");
      resetConfig();
      break;
    case "--set":
      if (DEBUG) console.log("--set");
      setConfig();
      break;

    case "--help":
    case "--h":
    default:
      fs.readFile(__dirname + "/views/config.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
  }
}
module.exports = {
  configApp,
};
