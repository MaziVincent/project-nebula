require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

//connect to mongo db
connectDB();
app.use(logger);

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cookieParser())

app.use('/uploads', express.static('uploads'));
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/recentProps', require('./routes/recentProps'));
app.use('/customer', require('./routes/customer'));
app.use(verifyJWT);
app.use('/owner', require('./routes/owner'));
app.use('/properties', require('./routes/propertyRoutes'));
app.use('/admin', require('./routes/admin'));
app.use('/agent', require('./routes/agent'));
app.use('/shop', require('./routes/shop'));
app.use('/apartment', require('./routes/apartment'));
app.use('/land', require('./routes/land'));
app.use('/house', require('./routes/house'));
app.use('/user', require('./routes/api/user'));
app.use('/listings', require('./routes/listingRoutes'));



app.get('*/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});