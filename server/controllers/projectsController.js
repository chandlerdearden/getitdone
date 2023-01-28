const {Projects} = require("../models/projects")

module.exports = {
    newProject: async (req, res) => {
        try {
            const {title, desc, start, end, colorEvento, user_id} = req.body
            await Projects.create({
                title,
                start,
                end,
                userId: +user_id,
                colorEvento,
                desc,
            })
            res.sendStatus(200)

        }
        catch(err) {
            console.log(err)
            res.sendStatus(400)
        }
    },

    getProjects : async ( req, res) => {
        try {
            const {userId} = req.params
            console.log(userId)
            const projects = await Projects.findAll({where: {userId:+userId}})
            console.log(projects)
            res.status(200).send(projects)
    
        }
        catch(err) {
            console.log(err)
            res.sendStatus(400)
        }

    }
}