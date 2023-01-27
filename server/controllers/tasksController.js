
const { Tasks } = require("../models/tasks");

module.exports = {
  newTask: async (req, res) => {
    try {
        console.log(req.body)
        const {title, desc, colorEvento, start, end, user_id,} = req.body
        // console.log(parseInt(user_id,10))
         await Tasks.create({
            title: title,
            desc: desc,
            colorEvento: colorEvento,
            start: start,
            end: end,
            userId: +user_id
        })
        res.sendStatus(200)


    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  getTask : async (req,res) => {
    try {
        const {userId} = req.params
        console.log(userId)
        const tasks = await Tasks.findAll({where: {userId:+userId}})
        console.log(tasks)
        res.status(200).send(tasks)

    }
    catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
  }
};
