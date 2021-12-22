const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param("ideaId", (req, res, next, id) => {
    try {
        const obj = getFromDatabaseById("ideas", id);
        if (!obj) return res.status(404).send("Idea not found!")

        req.idea = obj;
        return next();
    } catch (err) {
        return next(err);
    }
});

ideasRouter.route("/")
    .get((req, res, next) => {
        return res.send(getAllFromDatabase("ideas"));
    })
    .post(checkMillionDollarIdea, (req, res, next) => {
        const obj = addToDatabase("ideas", req.body);
        return res.status(201).send(obj);
    })
ideasRouter.route("/:ideaId")
    .get((req, res, next) => {
        return res.send(req.idea);
    })
    .put(checkMillionDollarIdea, (req, res, next) => {
        const obj = updateInstanceInDatabase("ideas", req.body);
        return res.send(obj);
    })
    .delete((req, res, next) => {
        const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
        if (!deleted) return res.status(500).send();
        return res.status(204).send();
    })

module.exports = ideasRouter;