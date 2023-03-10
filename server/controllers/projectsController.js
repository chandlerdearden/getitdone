const { Projects } = require("../models/projects");
const {Messages} = require('../models/messages')

module.exports = {
  newProject: async (req, res) => {
    try {
      const { title, desc, start, end, creator_id, colorEvento, user_id } =
        req.body;
      await Projects.create({
        title,
        start,
        end,
        userId: +user_id,
        colorEvento,
        desc,
      }).then(async () => {
        await Messages.create({
          creator_id,
          content: desc,
          subject: `A New ${title}, has been assigned to you!`,
          userId: +user_id,
        });
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  getProjects: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const projects = await Projects.findAll({ where: { userId: +userId } });
      console.log(projects);
      res.status(200).send(projects);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      await Projects.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
