const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");

const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/v1/events", async (_req, res) => {
  console.log();
  const data = JSON.parse(fs.readFileSync("./events.json", "utf8"));
  res.json(data);
});

app.post("/api/v1/event/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./events.json", "utf8"));

  data = data.map((x) =>
    x.id === req.params.id ? { id: req.params.id, ...req.body } : x
  );

  fs.writeFileSync("./events.json", JSON.stringify(data), "utf-8");
  res.sendStatus(200);
});

app.post("/api/v1/events", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./events.json", "utf8"));
  data = [...data, { id: uuidv4(), ...req.body }];

  fs.writeFileSync("./events.json", JSON.stringify(data), "utf-8");
  res.sendStatus(200);
});

app.delete("/api/v1/event/:id", async (req, res) => {
  let data = JSON.parse(fs.readFileSync("./events.json", "utf8"));

  data = data.filter((x) => x.id !== req.params.id);

  fs.writeFileSync("./events.json", JSON.stringify(data), "utf-8");
  res.sendStatus(200);
});

app.get("/api/v1/favorites/:email", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("./favorites.json", "utf8"));
  res.json(data.find((x) => x.email === req.params.email)?.favorites || []);
});

app.post("/api/v1/favorites/:email", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./favorites.json", "utf8"));

  const favorites = data.find((x) => x.email === req.params.email);

  if (!favorites) {
    data = [...data, { email: req.params.email, favorites: [{ ...req.body }] }];
    fs.writeFileSync("./favorites.json", JSON.stringify(data), "utf-8");
    return res.sendStatus(200);
  }

  const doesExist = favorites.favorites.find((x) => x.id === req.body.id);

  if (doesExist) return res.sendStatus(200);

  data = data.map((x) =>
    x.email === req.params.email
      ? {
          email: x.email,
          favorites: [...x.favorites, { ...req.body }],
        }
      : x
  );

  fs.writeFileSync("./favorites.json", JSON.stringify(data), "utf-8");
  res.sendStatus(200);
});

app.delete("/api/v1/favorites/:email/:id", async (req, res) => {
  let data = JSON.parse(fs.readFileSync("./favorites.json", "utf8"));

  data = data.map((x) =>
    x.email === req.params.email
      ? {
          email: x.email,
          favorites: x.favorites.filter((y) => y.id !== req.params.id),
        }
      : x
  );

  fs.writeFileSync("./favorites.json", JSON.stringify(data), "utf-8");
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
