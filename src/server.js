const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Projeto no ar');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
