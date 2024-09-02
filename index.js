const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const taskRoutes = require("./routes/task")


const app = express();

app.use(cors()); // liberar acesso para todas as rotas

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.get("/ola", function(req, res){
    res.send("<h1>Ola</h1>")
})

app.use('/api/task', taskRoutes)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
  }).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server runing on port ${port}`))