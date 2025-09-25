import http from "http";
import fs from "fs/promises";

import cats from "./cats.js";

async function renderView(path) {
  const html = fs.readFile(path, { encoding: "utf-8" });
  return html;
}

async function homeView() {
  const html = await renderView("./src/views/home/index.html");

  const catHtml = cats.map((cat) => catTemplate(cat)).join(`\n`);

  const result = html.replace("{{cats}}", catHtml);

  return result;
}

async function addBreedView() {
  const html = await renderView("./src/views/addBreed.html");
  return html;
}

async function addCatView() {
  const html = await renderView("./src/views/addCat.html");
  return html;
}

function catTemplate(cat) {
  return `<li>
            <img
              src=${cat.imageUrl}
              alt=${cat.name}
            />
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p>
              <span>Description: </span>${cat.description}
            </p>
            <ul class="buttons">
              <li class="btn edit"><a href="">Change Info</a></li>
              <li class="btn delete"><a href="">New Home</a></li>
            </ul>
          </li>`;
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
    case "/cats/add-cat":
      const addCat = await addCatView();

      res.writeHead(200, {
        "content-type": "text/html",
      });

      res.write(addCat);
      break;
    default:
      res.end();
      break;
  }
  res.end();
});

server.listen(4000);

console.log(`Server is listening on http://localhost:4000...`);
