import http from "http";
import fs from "fs/promises";

import siteCss from "./site.css.js";

const server = http.createServer(async (req, res) => {
  const homeHtml = await fs.readFile("./src/views/home/index.html", {
    encoding: "utf-8",
  });

  if (req.url === `/`) {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    res.write(homeHtml);
  } else if (req.url === `/styles/site.css`) {
    res.writeHead(200, {
      "content-type": "text/css",
    });

    res.write(siteCss);
  }

  res.end();
});

server.listen(4000);

console.log(`Server is listening on http://localhost:4000...`);
