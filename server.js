const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const users = {
  "capitaoGOAT": "goatpassword",
  "passageiro1": "password1",
  "passageiro2": "password2",
  "passageiro3": "password3",
  "passageiro4": "password4",
  "passageiro5": "password5",
  "passageiro6": "password6",
  "passageiro7": "password7"
};

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] === password) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
