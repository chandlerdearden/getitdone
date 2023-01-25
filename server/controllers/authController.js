require("dotenv").config();
const { SECRET } = process.env;
const { Users } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createToken = (username, id) => {
  return jwt.sign(
    {
      username: username,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await Users.findOne({ where: { username: username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPassword
        );
        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          console.log(token);
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token: token,
            exp,
          });
        }
      } else {
        res.status(400).send("Username is Incorrect, please try again");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  register: async (req, res) => {
    try {
      const { username, password, color, email, firstName, lastName } = req.body;
      const foundUser = await Users.findOne({ where: { username: username } });
      if (foundUser) {
        res
          .status(400)
          .send(
            "username is not available, please choose a different username"
          ) 
      } else {
        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await Users.create( {
            username: username, 
            hashedPassword: hash,
            color,
            email,
            firstname: firstName,
            lastname: lastName
        });
        // console.log(newUser.dataValues + "this is the new user")
        const token = createToken(
            newUser.dataValues.username,
            newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 48;

        res.status(200).send({
            username: newUser.dataValues.username,
            userId: newUser.dataValues.id,
            token,
            exp,
        })


      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
