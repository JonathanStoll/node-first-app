const fs = require("fs");
const requestHandeler = (request, response) => {
    const url = request.url;
    const method = request.method;
    if (url === "/") {
        response.setHeader("Content-Type", "text/html");
        response.write("<html>");
        response.write("<head>");
        response.write("<title>Enter message</title>");
        response.write("</head>");
        response.write("<body>");

        response.write(
          '<form  action="/message" method="POST"><input type="text" name="message"><button type="submit" value="Send">SEND</button></form>'
        );
        response.write("</body>");
        response.write("</html>");
        return response.end();
      }
      if (url === "/message" && method === "POST") {
        const body = [];
        request.on("data", (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        return request.on("end", () => {
          const message = Buffer.concat(body).toString();
          const finalMessage = message.split("=")[0];
          console.log(message);
          fs.writeFile("message.txt", finalMessage, (err) => {
            response.writeHead(302, { Location: "/" });
            return response.end();
          });
        });
      }
      response.setHeader("Content-Type", "text/html");
      response.write("<html>");
      response.write("<head>");
      response.write("<title>Hello World</title>");
      response.write("</head>");
      response.write("<body>");
      response.write("<h1>Hello World</h1>");
      response.write("</body>");
      response.write("</html>");
      response.end();
}
module.exports = requestHandeler;