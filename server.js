require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const authMid = require('./middleware/auth');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const bodyParser = require('body-parser'); //post body handler

app.use(cors(corsOptions))

//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// static directories
app.use(express.static('public'));

app.use(authMid)
// app.use(express.json())

// list of routes
const auth = require('./routes/auth')
const organizations = require('./routes/organizations')
const achievements = require('./routes/achievements')
const divisions = require('./routes/divisions')
const recruitment = require('./routes/recruitment')
const tools = require('./routes/tools')
const socials = require('./routes/socials')
const activities = require('./routes/activities')
const products = require('./routes/products')
const member_achievement = require('./routes/member_achievement')
const news = require('./routes/news')
const highscore = require('./routes/highscore')
const pivot_product_tools = require('./routes/pivot_product_tools')
const pivot_division_activities = require('./routes/pivot_division_activities')
const pivot_division_tools = require('./routes/pivot_division_tools')

app.use(auth)
app.use(organizations)
app.use(achievements)
app.use(divisions)
app.use(recruitment)
app.use(tools)
app.use(socials)
app.use(activities)
app.use(products)
app.use(member_achievement)
app.use(news)
app.use(highscore)
app.use(pivot_product_tools)
app.use(pivot_division_activities)
app.use(pivot_division_tools)

app.get('/', (req, res) => { 
	res.send('Hello World')
}) 


app.listen(port, () => {
  console.log(`server running on port ${port}`)
  // console.log(require('path').join(__dirname))
})