const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/perfumes', (req, res) => {
  const query = 'SELECT * FROM perfumes';
  db.query(query, (err, resultados) => {
    if (err) {
      return res.status(400).json({ mensagem: 'Erro ao buscar perfumes' });
    }
    res.json(resultados);
  });
});

app.post('/perfumes', (req, res) => {
  const { id, nome, preço, descrição } = req.body;
  if (!id || !nome || !preço || !descrição) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const query = 'INSERT INTO perfumes (id, nome, preco, descricao) VALUES (?, ?, ?, ?)';
  db.query(query, [id, nome, preço, descrição], (err, result) => {
    if (err) {
      return res.status(400).json({ mensagem: "Erro ao cadastrar: " + err.sqlMessage });
    }
    res.status(201).json({ mensagem: "Perfume cadastrado com sucesso!" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:8000/perfumes`);
});
