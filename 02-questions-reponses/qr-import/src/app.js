import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { importerDonneesCSV } from "./import.service.js";

const rl = readline.createInterface({ input, output });

console.log("** QR-IMPORT **");

const start = async () => {
  const menu = `
        1. Importer les données CSV
        2. Afficher le nombre de questions
        3. Afficher une question
        99. Sortir
      `;
  const saisie = await rl.question(menu);

  switch (saisie) {
    case "1":
      console.log(">> Import des données");
      // lancer l'import
      await importerDonneesCSV();
      await start();
      break;
    case "2":
      console.log("Affichage nombre de questions");
      await start();
      break;
    case "3":
      console.log("Affichage détail question");
      await start();
      break;
    case "99":
      console.log("Au revoir");
      rl.close();
      break;
    default:
      console.log("desolé...");
      await start();
  }
};

start();
