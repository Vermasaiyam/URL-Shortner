const express = require("express");
const cookieParser = require('cookie-parser');

const {connectToMongoDb} = require('./connect');
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const path = require('path');

//ROUTES
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');


const URL = require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected"));

// for server side rendering - ejs (more egs. pug.js, handlebars.js)
app.set('view engine', 'ejs');
// ejs ko btana ki hmari files kha pdi h ejs ki
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/',staticRoute);
app.use('/url',restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user', userRoute);

app.get('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    { 
        $push : {
        visitHistory: {
            timestamp: Date.now(),
        },
    }})
    res.redirect(entry.redirectUrl);
})


app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`));