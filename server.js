const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


// JSON middleware for parsing request bodies
app.use(express.json());

// Helmet middleware for secure HTTP headers
app.use(helmet());

// Morgan middleware for logging HTTP requests to console
app.use(morgan('combined'));

// CORS middleware for enabling cross-origin resource sharing
app.use(cors());


mongoose.connect(dbConfig.url).then(function () {
    console.log('Connected to MongoDB Server')
}).catch(function (err) {
    console.log(err)
})

require('./routes/restaurant.route')(app);

// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});