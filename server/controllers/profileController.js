const { Users } = require("../models/users");

module.exports = {
  getUser: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const FoundUser = await Users.findOne({ where: { id: userId } });
      console.log(FoundUser);
      res.status(200).send({
        firstname: FoundUser.dataValues.firstname,
        lastname: FoundUser.dataValues.lastname,
        color: FoundUser.dataValues.color,
        email: FoundUser.dataValues.email,
        username: FoundUser.dataValues.username,
      });
    } catch (err) {
      res.sendStatus(400);
    }
  },
  getAllUsers: async (req, res) => {
    try {
    //   const { userId } = req.params;
      const allUsers = await Users.findAll({
        attributes: ['username', 'id']
      })
      res.status(200).send(allUsers)
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
