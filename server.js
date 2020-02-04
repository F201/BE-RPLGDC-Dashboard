require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT

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

// list of routes
const organizations = require('./routes/organizations')
const achievements = require('./routes/achievements')
const divisions = require('./routes/divisions')
const recruitment = require('./routes/recruitment')
const tools = require('./routes/tools')
const socials = require('./routes/socials')
const activities = require('./routes/activities')
const products = require('./routes/products')

app.use(organizations)
app.use(achievements)
app.use(divisions)
app.use(recruitment)
app.use(tools)
app.use(socials)
app.use(activities)
app.use(products)

app.get('/', (req, res) => { 
	res.send('Hello World')
}) 


app.listen(port, () => {
	console.log(`server running on port ${port}`)
})