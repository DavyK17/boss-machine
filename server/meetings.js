const meetingsRouter = require('express').Router();

const {
    addToDatabase,
    createMeeting,
    getAllFromDatabase,
    deleteAllFromDatabase,
} = require("./db");

meetingsRouter.route("/")
    .get((req, res, next) => {
        return res.send(getAllFromDatabase("meetings"));
    })
    .post((req, res, next) => {
        const obj = addToDatabase("meetings", createMeeting());
        return res.status(201).send(obj);
    })
    .delete((req, res, next) => {
        deleteAllFromDatabase("meetings");
        return res.status(204).send();
    })

module.exports = meetingsRouter;