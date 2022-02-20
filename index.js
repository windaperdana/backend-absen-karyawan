const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(routes);
app.use(fileUpload());
app.use('/api', routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(3002,() => console.log('Server is running on port 3002'));