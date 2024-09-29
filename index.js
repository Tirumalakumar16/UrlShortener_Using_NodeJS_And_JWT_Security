const express = require("express");
const app = express();
const path = require('path')
const { PORT } = require("./config/constants");
const { connectMongoDb } = require("./config/connection");
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly,checkAuth} = require('./middlewares/auth')


const urlRouter = require("./routes/url");
const staticRouter = require('./routes/staticRoutes')
const userRouter = require('./routes/user');

const portNumber = PORT;

connectMongoDb()
  .then(() => console.log("MongoDb Connected successfully"))
  .catch((err) => console.log(err));

app.set('view engine', "ejs")
app.set('views',path.resolve('./views'))

//to recieve json data from the client as body
app.use(express.json())

//to recieve form data from the client as body
app.use(express.urlencoded({extended : false}))

//to parse the cookies from the client
//and attach it to the request object
//as req.cookies
app.use(cookieParser());

//add middleware to check if the user is logged in or not 
//if not logged in redirect to login page
//if logged in attach the user object to the request object
//and call the next middleware
app.use("/url",restrictToLoggedInUserOnly, urlRouter);
app.use('/',checkAuth,staticRouter);
app.use('/user',userRouter);
app.use('/signIn',checkAuth,staticRouter);
app.use('/signUp',checkAuth,staticRouter);

app.listen(portNumber, () => {
  console.log(`Server started on port: ${portNumber}`);
});
