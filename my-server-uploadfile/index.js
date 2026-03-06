const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 10000000 },
    abortOnLimit: true,
  })
);

// Serve index.html from public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/image/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload', req.params.id));
});

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file uploaded.');
  }

  const image = req.files.image;
  const uploadPath = path.join(__dirname, 'upload', image.name);

  image.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(`Upload successful: ${image.name}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
