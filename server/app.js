const express = require('express');
const dotenv = require('dotenv');
const database = require('./config/database');  
const cors = require('cors');
const bodyParser = require('body-parser');


// IMPORT ROUTES
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');




dotenv.config();
database();
const app = express();


// ========================================================= MIDDLEWARES =========================================================  //

app.use(cors());
app.use(express.json());
app.use(express.static("../client/build"));
app.use(bodyParser.urlencoded({extended: true}))

// ========================================================= ROUTES =============================================================  //

app.use('/api/user',userRoutes)
app.use('/api/product', productRoutes);


// =============================================================================================================================== //

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);