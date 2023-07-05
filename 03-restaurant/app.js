import express from "express";
import mysql from "mysql2";

// connexion to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant-db",
  connectionLimit: 10,
});

const pool$ = pool.promise();

// server port + express
const port = 3000;
const app = express();

// Pug view
app.set("views", "./views");
app.set("view engine", "pug");

//Encode data
app.use(express.urlencoded({ extended: true }));

// création de la function lister
async function List() {
  // Database request
  const [rows] = await pool$.execute(`select * from dish`);
  return rows;
}

// Home page
app.get("/plats/lister", async (req, res) => {
  const dishes = await List();
  res.render("home", {
    title: "Administration des plats 👋",
    dishes,
  });
});

// Create page
app.get("/plats/creer", async (req, res) => {
  const dishes = await List();
  res.render("create", {
    title: "Créer un plat",
    dishes,
  });
});

// Request create
app.post("/plats/creer", async (req, res) => {
  // const dishes = await Create();
  // Database request
  await pool$.execute(`INSERT INTO dish (name, price) VALUES(?,?)`, [
    req.body.name,
    req.body.price,
  ]);
  res.redirect("/plats/lister");
});

// Update page
app.get("/plats/editer/:id", async (req, res) => {
  let id = req.params.id;
  const [[rows]] = await pool$.execute(`SELECT * FROM dish WHERE id=?`, [id]);
  res.render("edit", {
    title: "Modifier le plat " + [rows.name],
    data: rows,
  });
});

// Request update
app.post("/plats/editer/:id", async (req, res) => {
  let id = req.params.id;
  await pool$.execute(`UPDATE dish SET name=?, price=? WHERE id=?`, [
    req.body.name,
    req.body.price,
    id,
  ]);
  res.redirect("/plats/lister");
});
/* A TESTER
app.delete("/plats/supprimer/:id", (req, res) => {
  let id = req.params.id;
    await pool$.execute("DELETE FROM dish WHERE id=?;", [id]);
    next();
  },
  (req, res) => {
    res.redirect("/plats/lister/");
  }
});
*/
app.get("/plats/supprimer/:id", async (req, res) => {
  let id = req.params.id;
  const [rows] = await pool$.execute(
    "SELECT name, price FROM dish WHERE id=?;",
    [id]
  );
  res.render("delete", {
    /*valueID: id,
    valueName: rows[0].name,
    valuePrice: rows[0].price,*/
    data: rows,
    id,
  });
});

app.post(
  "/plats/supprimer/:id",
  async (req, res, next) => {
    let id = req.params.id;
    await pool$.execute("DELETE FROM dish WHERE id=?;", [id]);
    next();
  },
  (req, res) => {
    res.redirect("/plats/lister/");
  }
);

/** selon la doc à mettre en dernier */
app.use(express.static("public"));
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
