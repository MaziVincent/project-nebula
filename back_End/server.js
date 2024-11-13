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
//const prerender = require('prerender-node')
const reverseProxy = require('./middleware/reverseproxy')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

//set up prerender
//prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
//connect to mongo db
connectDB();
//logger
app.use(logger);
//
//app.use(reverseProxy);
//ping
app.use('/ping', require('./routes/ping'));
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false, limit:'50mb'}));

app.use(express.json({limit:'50mb'}));

app.use(cookieParser())

app.use('/uploads', express.static('uploads'));
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/recentProps', require('./routes/recentProps'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/email', require('./routes/email'));
//app.use('/property', require('./routes/property'));
app.use(verifyJWT);
app.use('/api/owner', require('./routes/owner'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/agent', require('./routes/agent'));
app.use('/api/shop', require('./routes/shop'));
app.use('/api/apartment', require('./routes/apartment'));
app.use('/api/land', require('./routes/land'));
app.use('/api/house', require('./routes/house'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/listings', require('./routes/listingRoutes'));



app.get('*/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});