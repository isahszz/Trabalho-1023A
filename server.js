const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         
  password: '',        
  database: 'cadastro'  
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

app.post('/perfumes', (req, res) => {
  const { id, nome, preco, descricao } = req.body;

  if (!id || !nome || !preco || !descricao) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const query = 'INSERT INTO perfumes (id, nome, preco, descricao) VALUES (?, ?, ?, ?)';
  db.query(query, [id, nome, preco, descricao], (err, result) => {
    if (err) {
      return res.status(400).json({ mensagem: "Erro ao cadastrar: " + err.sqlMessage });
    }
    res.status(201).json({ mensagem: "Perfume cadastrado com sucesso!" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:8000/perfumes`);
});
