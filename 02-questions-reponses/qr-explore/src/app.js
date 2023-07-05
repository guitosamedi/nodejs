import http from "node:http";

let server = http.createServer();

server.on("request", async (req, res) => {
  if (req.url.startsWith("/questions/list")) {
    const api = await fetch("http://localhost:3000/questions-reponses");
    //const data = [];
    const data = await api.json();
    console.log(data);
    const reponse = data
      .map(
        (d) => `
        <tr>
          <td>${d.id}</td>
          <td>${d.question}</td>
        </tr>
        `
      )
      .join("");

    // Page list
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `
            <!doctype html>
            <html>
                <head>
                <meta charset="UTF-8">
                <title>Liste des questions - QR</title>
                </head>
                    <body>
                    <header><h1>Liste des questions</h1></header>
                        <section>
                            <table>
                              <th>
                                <tr>
                                  <td>ID</td>
                                  <td>Questions</td>
                                </tr>
                              </th>
                            ${reponse}
                            </table>
                        </section>
                    </body>
            </html>
    `
    );
  } else if (req.url.startsWith("/")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `
        <!doctype html>
        <html>
            <head>
            <meta charset="UTF-8">
            <title>Accueil - QR</title>
            </head>
                <body>
                <header><h1>QR Explore</h1>
                <h2> Exploration de questions / reponses</h2></header>
                    <section>
                    <p>Bienvenue dans l'application QR explore !</p>
                    <p> Cette application va vous permettre d'explorer les questions/réponses du système.</p>
                        <a href="/questions/list"><button type="button" class="btn btn-primary">Voir les questions</button></a>
                    </section>
                </body>
        </html>
`
    );
  }
});
let port = 3001;
server.listen(port, () => {
  console.log("App Server is running on port " + port);
});
