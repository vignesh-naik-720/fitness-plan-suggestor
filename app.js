const express = require('express');
const bodyParser = require('body-parser');
const fitnessaiRoutes = require('./controllers/fitnessai')

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api/fitness", fitnessaiRoutes);

app.listen(8080, ()=>console.log("App Started on port number 8080"));