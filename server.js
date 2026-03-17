//configura servidor
const express = require('express');
const path = require("path");
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));/*front*/

app.use("/clientes",clientesRoutes);



app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});