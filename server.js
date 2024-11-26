const express = require('express');
const path = require('path');
const morgan = require('morgan');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

server.post('/submit', (req, res) => {
  const { name, adjective, noun, verb, place } = req.body;

  if (!name || !adjective || !noun || !verb || !place) {
    return res.send(
      `<h1>Submission Failed</h1><p>Please fill out all fields!</p>`
    );
  }

  const story = `
    <h1>Your Mad Lib Story</h1>
    <p>Once upon a time, <b>${name}</b> went on an <b>${adjective}</b> adventure to <b>${place}</b>.</p>
    <p>There, they found a mysterious <b>${noun}</b> and decided to <b>${verb}</b> with it!</p>
    <p>This marked the beginning of an unforgettable journey.</p>
  `;
  res.send(story);
});

const port = process.argv[2] === 'local' ? 8080 : 80;
server.listen(port, () => console.log(`Server is running on port ${port}`));
