require("dotenv").config();
const { sequelize } = require("../server/util/database");

// models //
const {Users} = require('./models/users')
const {Projects} = require('./models/projects')
const { Roles } = require("./models/roles");
const { Tasks } = require("./models/tasks")
const { Messages } = require('./models/messages')

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

// controller functions //
const { register, login } = require('./controllers/authController')
const { newTask, getTask } = require('./controllers/tasksController')
const { newProject, getProjects} = require('./controllers/projectsController')

Users.hasMany(Projects)
Users.hasMany(Tasks)
Projects.belongsTo(Users)
Tasks.belongsTo(Projects)
Users.hasOne(Roles)
Roles.belongsTo(Users)

Users.hasMany(Messages)
Messages.belongsTo(Users)


// end Points //
app.post('/register', register)
app.post('/login', login)

app.post('/tasks', newTask)
app.get('/tasks/:userId', getTask)

app.post('/projects', newProject)
app.get('/projects/:userId', getProjects)


sequelize
  .sync()
  // .sync({force: true})
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) =>console.log(err));
