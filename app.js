const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    exposedHeaders: '*',
  };

app.use(cors(corsOptions));

app.use(express.json());

const apis = require('./api');

app.use("/api", apis);

app.listen( 3000, () => {
    console.log('Servidor executando na porta 3000');
})