const socket = io();
console.log(socket);

/**
 * création d'une connexion pour chaque socket à la connection
 

socket.on("client:connecte:ok", (event) => {
  socket.on("client connecte:ok", event);
  console.log(`Client connecté ? : `, socket.id);
});*/

//let el = document.getElementById("test");
//const content = element.innerHTML;
//var text = document.getElementById("chat-message").textContent;
// Ajouter un écouteur d'évènements à la table
function modifyText() {
  const el = document.querySelector("#chat-message");
  console.log(`Cliké !`);
}
const el = document.querySelector("#chat-messages");
el.addEventListener("click", modifyText(), false);
/*
el.addEventListener(
  "click",
  () =>
    function () {
      alert(`clické !`);
      document.getElementById("chat-message").textContent = "BIBId !";
    },
  false
);
*/
/*
let el = document.getElementById("message-input");
//let input = document.getElementById("input");
//this.innerHTML = this.innerHTML === "Menu" ? "Close" : "Menu";
el.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    if (el.value) {
      socket.emit("client:chat:send", el.value);
      el.value = " ";
    }
  },
  false
);
*/

//socket.on("server:chat:send", (srv_pseudo) => {

//}
/*
socket.on("render message", (e) => {
  let textarea = document.getElementById("user-message");
  textarea.textContent = `${e.target.value}`;
}); */

/* RECHERCHE
//document.querySelector("#txt").addEventListener();
// Ajouter un écouteur d'évènements au formulaire
const btn = document.querySelector(".go");
//const a = document.querySelector("a");

// gestion de l'événement click - asynchrone par essence
btn.onclick = console.log("Clické !");

// reception événement "client:chat:send"
socket.on("server:chat:send", (srv_pseudo) => {
  console.log("Ici Client >>", srv_pseudo);
  //console.log(arg); // world
  // error = alert(`Pseudo Obligatoire alert!`);
  console.log("Ici Client >> Message bien reçu du serveur !");
});
// emission événement "client:chat:send"
socket.emit("client:chat:send", {
  cli_pseudo: "toto",
  cli_message: "message envoyé du client au serveur",
});
*/
