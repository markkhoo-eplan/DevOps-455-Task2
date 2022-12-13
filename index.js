const express = require("express");
const app = express();
const port = 3003;

app.use("/", express.static("public"));

// app.get("/", (req, res) => {
//   return res.send("Hello World!");
// });

app.get("/health", (req, res) => {
  return res.status(200).send(true);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
