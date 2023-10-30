global.DEBUG = false;
const http = require("http");
const fs = require("fs");
const { parse } = require("querystring");
const { newToken, tokenCount } = require("./token");

const server = http.createServer(async (req, res) => {
  let path = "./public/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      fetchFile(path);
      break;
    case "/new":
      if (req.method === "POST") {
        collectRequestData(req, (result) => {
          const { username } = result;
          const theToken = newToken(result.username); //implementing token generating function
          res.end(`
                    <!doctype html>
                    <html>
                    <style>
                      body {
                        background-color: #024059;
                        color: #2bf0fb;
                        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
                        text-align: center;
                        font-size: large;
                      }

                      a {
                        color: #980bbf;
                        text-decoration: none;
                        transition: color 0.3s;
                      }

                      a:hover {
                        color: #f2e307;
                      }
                    </style>
                    <body>
                        ${result.username} token is ${theToken} <br />
                        <a href="http://localhost:3000">[home]</a> <br />
                        <a href="http://localhost:3000/count">[token count]</a>
                    </body>
                    </html>
                `);
        });
      } else {
        // Redirect GET requests back to index page to create a new token
        res.statusCode = 302; // 302 - redirect
        res.setHeader("Location", "/");
        res.end();
      }
      break;
    case "/count":
      var theCount = await tokenCount();
      res.end(`
                <!doctype html>
                <html>
                <style>
                  body {
                    background-color: #024059;
                    color: #2bf0fb;
                    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
                    text-align: center;
                    font-size: large;
                  }

                  a {
                    color: #980bbf;
                    text-decoration: none;
                    transition: color 0.3s;
                  }

                  a:hover {
                    color: #f2e307;
                  }
                </style>
                <body>
                    Token count is ${theCount} <br />
                    <a href="http://localhost:3000">[home]</a>
                </body>
                </html>
            `);
    default:
      break;
  }

  function fetchFile(path) {
    fs.readFile(path, function (err, data) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        if (DEBUG) console.log("file was served.");
        res.writeHead(res.statusCode, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
});
server.listen(3000);

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}
