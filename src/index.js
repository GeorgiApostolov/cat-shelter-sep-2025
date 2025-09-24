import http from "http";
import fs from "fs/promises";

async function homeView() {
  const html = await fs.readFile("./src/views/home/index.html", {
    encoding: "utf-8",
  });

  return html;
}

async function addBreedView() {
  const html = await fs.readFile("./src/views/addBreed.html", {
    encoding: "utf-8",
  });
  return html;
}

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/":
      const html = await homeView();

      res.writeHead(200, {
        "content-type": "text/html",
      });

      res.write(html);
      break;

    case "/styles/site.css":
      const siteCss = await fs.readFile("./src/styles/site.css", {
        encoding: "utf-8",
      });

      res.writeHead(200, {
        "content-type": "text/css",
      });

      res.write(siteCss);
      break;

    case "/cats/add-breed":
      const addBreed = await addBreedView();

      res.writeHead(200, {
        "content-type": "text/html",
      });

      res.write(addBreed);
      break;
    default:
      res.end();
      break;
  }
  res.end();
});

server.listen(4000);

console.log(`Server is listening on http://localhost:4000...`);
