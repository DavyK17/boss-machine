const minionsRouter = require('express').Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
    try {
        const obj = getFromDatabaseById("minions", id);
        if (!obj) res.status(404).send("Minion not found!")

        req.minion = obj;
        return next();
    } catch (err) {
        return next(err);
    }
});

minionsRouter.route("/")
    .get((req, res, next) => {
        return res.send(getAllFromDatabase("minions"));
    })
    .post((req, res, next) => {
        const obj = addToDatabase("minions", req.body);
        return res.status(201).send(obj);
    })
minionsRouter.route("/:minionId")
    .get((req, res, next) => {
        return res.send(req.minion);
    })
    .put((req, res, next) => {
        const obj = updateInstanceInDatabase("minions", req.body);
        return res.send(obj);
    })
    .delete((req, res, next) => {
        const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
        if (!deleted) res.status(500).send();
        return res.status(204).send();
    })

module.exports = minionsRouter;