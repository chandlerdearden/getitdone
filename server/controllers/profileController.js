const {Users} = require('../models/users')

module.exports = {
    getUser: async (req, res) => {
        try{
            const {userId} = req.params;
            console.log(userId)
            const FoundUser = await Users.findOne({ where: { id: userId } });
            console.log(FoundUser)
            res.status(200).send(FoundUser)
        }
        catch(err) {
            res.sendStatus(400)
        }
      }
}
