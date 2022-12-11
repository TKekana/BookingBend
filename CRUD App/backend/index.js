const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const dba = require('./queries')
const port = 3000


const db = require("./models");
const Role = db.role

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to our Booking App!" });
// });

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({message: 'Node.js, Express, and Postgres API' })
})

app.get('/users', dba.getUsers)
app.get('/users/:id', dba.getUserById)
app.post('/users', dba.createUser)
app.put('/users/:id', dba.updateUser)
app.delete('/users/:id', dba.deleteUser)

app.listen(port, () => {
  console.log(`Engines are Up & Running on port: ${port}.`)
})

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}