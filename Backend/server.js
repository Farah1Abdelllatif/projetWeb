// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'issatsio', // Assurez-vous que le nom de la base de données est correct
});
//gestion cours
app.get('/cours', (req, res) => {
  const sql = 'select * from cours';
  db.query(sql, (err, data) => {
    if (err) return res.json('error');
    return res.json(data);
  });
});


app.delete('/cours/:id', (req, res) => {
  const courseId = req.params.id;
  const sql = "DELETE FROM cours WHERE id=?";
  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    console.log('Cours supprimé avec succès');
    return res.status(200).json({ message: 'Cours supprimé avec succès' });
  });
});


// Modifier un cours existant
app.put('/cours/:id', (req, res) => {
  const courseId = req.params.id; // Récupérer l'identifiant du cours depuis les paramètres de l'URL
  const { titre, code, description, document } = req.body; // Récupérer les nouvelles données du cours depuis le corps de la requête
  
  // Requête SQL pour mettre à jour le cours dans la base de données
  const sql = 'UPDATE cours SET titre=?, code=?, description=?, document=? WHERE id=?';

  db.query(sql, [titre, code, description, document, courseId], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    console.log('Cours mis à jour avec succès');
    return res.status(200).json({ message: 'Cours mis à jour avec succès' });
  });
});


app.get('/course/:id', (req, res) => {
  const sql = "SELECT titre, code, description, document FROM cours WHERE id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }
    const course = result[0]; // Récupérer le premier (et unique) résultat
    return res.status(200).json(course);
  });
});




app.post('/create', (req, res) => {
  const { titre, code, description, document } = req.body;
  const sql =
    'INSERT INTO cours (titre, code, description, date, document) VALUES (?, ?, ?, NOW(), ?)';

  db.query(sql, [titre, code, description, document], (err, result) => {
    if (err) {
      console.error('Erreur de base de données :', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    console.log('Nouveau cours inséré avec succès');
    return res.status(200).json({ message: 'Cours ajouté avec succès' });
  });
});

//connexion a la base
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion à la base de données MySQL réussie');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM login WHERE email=? AND password=?';

  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    if (data.length > 0) {
      return res.status(200).json({ message: 'Connexion réussie' });
    } else {
      return res
        .status(401)
        .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }
  });
});

app.post('/register', (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;
  const sql =
    'INSERT INTO login (fullName,  email,tel, password) VALUES (?, ?, ?, ?)';

  db.query(sql, [fullName, email, phoneNumber, password], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    console.log('Nouvel utilisateur inséré avec succès');
    return res
      .status(200)
      .json({ message: 'Utilisateur enregistré avec succès' });
  });
});

const PORT = process.env.PORT || 8083; // Changer le port de 8081 à 8082
app.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
