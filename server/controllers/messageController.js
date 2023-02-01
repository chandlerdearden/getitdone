const {Messages} = require('../models/messages')
const { Users } = require('../models/users')

module.exports ={
    newMessage: async (req, res) => {
        try {
            const {creator_id, userId, content, subject} = req.body
            await Messages.create({
                creator_id: +creator_id,
                userId: +userId,
                content,
                subject,
            })
            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(400)
        }
    },
    getMessages : async (req,res) => {
        try {
            const {userId} = req.params
            console.log(userId)
            const messages = await Messages.findAll({
                where: {userId: userId},
                include: [{
                    model: Users,
                    attributes: ['username'],
                }],
                join: {
                    from: 'messages.creator_id',
                    to: 'users.id'
                }
            });
            res.status(200).send(messages)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(400)
        }
    },
    deleteMessage: async ( req,res) => {
        try {
            const {id} = req.params
            await Messages.destroy({where: {message_id: +id}})
            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(400)
        }
    }
}