import { Tasks } from "../models/tasks";
module.exports = {
    getTasks : async (req, res) => {
        const tasks = Task.FindAll()

    }
}