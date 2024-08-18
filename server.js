const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', (req, res) => {
    console.log('Received file:', req.files);
    res.status(200).json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});
