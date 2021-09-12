const express = require('express');
const { readFile } = require('fs').promises;

const app = express();
const port = process.env.PORT || 80;
const mvpPath = './app/MVP/';

app.use(express.static(__dirname + '/app/MVP/public'));

// Routes
app.get('/', async function(req, res) {
    res.send(await readFile(mvpPath + 'index.html', 'utf8'));
});

app.get('/api/reviews/', async function(req, res) {
    res.send([
        { rating: 5, review: 'amazing' },
        { rating: 2, review: 'not the best' },
        { rating: 4, review: 'Dolore vero dolorum unde nemo commodi a modi iste. Tempore autem voluptas porro officia veniam aliquam. Ducimus magnam consequatur voluptates veritatis architecto voluptatem temporibus. Id quidem ipsam commodi aut. Modi rerum ut tenetur. Quibusdam ipsam laborum est labore sapiente.' }
    ]);
});

app.post('/api/reviews/', function(req, res) {
    //review.create(req.body, res);
});

app.delete('/api/reviews/:id/', function(req, res) {
    //review.delete(req.params.id, res);
});

app.listen(port, () => console.log('Live on http://localhost:' + port));