require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT

const bodyParser = require('body-parser'); //post body handler

//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// static directories
app.use(express.static('public'));

// list of routes
const organizations = require('./routes/organizations')
const achievements = require('./routes/achievements')
const divisions = require('./routes/divisions')
const recruitment = require('./models/recruitment')

app.use(organizations)
app.use(achievements)
app.use(divisions)
app.use(recruitment)

app.get('/', (req, res) => { 
	res.send('Hello World')
}) 


app.listen(port, () => {
	console.log(`server running on port ${port}`)
})