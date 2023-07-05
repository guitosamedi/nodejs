import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
 
// Pug view
app.set("views", "./views");
app.set("view engine", "pug");

//Encode data
app.use(express.urlencoded({ extended: true }));

let appTitle = "La parole pour tous !";
let hello = "Bienvenue ";

/*** Affichage page Home ****/
app.get("/", async (req, res) => {
  res.render("home", {
    title: appTitle,
    subtitle: hello,
  });
});

/*** Affichage page Chat ****/
app.get("/chat/", async (req, res) => {
  res.render("chat", {
    title: appTitle,
    subtitle: hello,
  });
});

/*** Post Pseudo **
app.post("/", async (req, res) => {
  const v_pseudo = req.body.pseudo;
  if (v_pseudo == "") {
    console.log(`Pseudo Obligatoire !`);
  } else {
    console.log(`Bienvenue `, v_pseudo);
    return res.redirect("/chat/" + v_pseudo);
  }
  return res.render("home", {
    title: appTitle,
  });
});
*/
/*** Affichage du chat **
app.get("/chat/:pseudo", async (req, res) => {
  const v_pseudo = req.params.pseudo;
  //const message = req.body.message;
  res.render("chat", {
    title: appTitle,
    subtitle: hello + " " + v_pseudo + " !",
    // pseudo: pseudo,
    // message: message,
  });
  // return res.redirect("/chat/" + v_pseudo);
});
*/

// Socket IO
const io = new Server(httpServer);
// On connecte le server
io.on("connection", (socket) => {
  //pseudo = socket.id;
  //pseudo = "toto";
  console.log("un client vient de se connecter avec socket.id=", socket.id);
  // reception événement "client:chat:send"
  socket.on("client:chat:send", (messages) => {
    // console.log(text);
    console.log("Ici Server >>", messages);

    // emission événement "server:chat:send"
    io.emit("chat:all", "hello world!");
    /*socket.emit("server:chat:send", {
      messages: "Envoi de tous les messages du serveur au client",
    });*/
  });
});

/**** express.static selon la doc à mettre en dernier ****/
app.use(express.static("public"));
const port = 3000;
httpServer.listen(port, () => {
  console.log("App started on port " + port);
});

/*req.body.addEventListener(
  "#bibi"
  () => {
    socket.emit("test1");
  },
  false
);*/
/*
// Socket IO
const io = new Server(httpServer);
io.on("connection", (socket) => {
  //pseudo = socket.id;
  //pseudo = "toto";
  console.log("un client vient de se connecter avec socket.id=", pseudo);

  // emission événement "client:connecte:ok"
  socket.emit("client:connecte:ok");

  // setInterval(() => {
  //     socket.emit('hello', {
  //         dateHeure: new Date(),
  //         message: 'Coucou !'
  //     })
  // }, 1000)
});

setInterval(() => {
  io.emit("hello", {
    dateHeure: new Date(),
    message: "Coucou !",
  });
}, 1000);
*/
