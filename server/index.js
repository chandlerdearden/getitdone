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

const path = require('path')
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

// controller functions //
const { register, login } = require('./controllers/authController')
const { newTask, getTask, deleteTask } = require('./controllers/tasksController')
const { newProject, getProjects, deleteProject} = require('./controllers/projectsController')
const { getUser, getAllUsers, updateUser } = require('./controllers/profileController')
const {newMessage, getMessages, deleteMessage, autoMessage, readMessage} = require('./controllers/messageController')

Users.hasMany(Projects)
Users.hasMany(Tasks)
Projects.belongsTo(Users)
Tasks.belongsTo(Projects)
Users.hasOne(Roles)
Roles.belongsTo(Users)

Users.hasMany(Messages)
Messages.belongsTo(Users)
Messages.belongsTo(Users, {foreignKey: 'creator_id'});


// end Points //
app.post('/register', register)
app.post('/login', login)

app.post('/tasks', newTask)
app.get('/tasks/:userId', getTask)
app.delete('/tasks/:id', deleteTask)

app.post('/projects', newProject)
app.get('/projects/:userId', getProjects)
app.delete('/projects/:id', deleteProject)


app.get('/user/:userId', getUser )
app.get('/allusers/:userId', getAllUsers)
app.put('/user/:userId', updateUser)

app.post('/messages', newMessage)
app.put('/readMessage', readMessage)
app.get('/messages/:userId', getMessages)
app.delete('/messages/:id', deleteMessage)


app.use(express.static(__dirname + '/../build'))
app.get('*', (req,res)=> {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


sequelize
  .sync()
  // .sync({force: true})
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) =>console.log(err));
