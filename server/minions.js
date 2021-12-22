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
        if (!obj) return res.status(404).send("Minion not found!")

        req.minion = obj;
        return next();
    } catch (err) {
        return next(err);
    }
});

minionsRouter.use("/:minionId/work", (req, res, next) => {
    const work = getAllFromDatabase("work")
    req.minion.work = work.filter(task => task.minionId === req.minion.id);
    next();
});

minionsRouter.param("workId", (req, res, next, id) => {
    try {
        const obj = getFromDatabaseById("work", id);
        if (!obj) return res.status(404).send("Work not found!")

        req.minion.work = obj;
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
        if (!deleted) return res.status(500).send();
        return res.status(204).send();
    })
minionsRouter.route("/:minionId/work")
    .get((req, res, next) => {
        return res.send(req.minion.work);
    })
    .post((req, res, next) => {
        const obj = addToDatabase("work", req.body);
        return res.status(201).send(obj);
    })
minionsRouter.route("/:minionId/work/:workId")
    .put((req, res, next) => {
        if (req.params.minionId !== req.body.minionId) return res.status(400).send("The minion ID does not match for this work!");
        const obj = updateInstanceInDatabase("work", req.body);
        return res.send(obj);
    })
    .delete((req, res, next) => {
        const deleted = deleteFromDatabasebyId("work", req.params.workId);
        if (!deleted) return res.status(500).send();
        return res.status(204).send();
    })

module.exports = minionsRouter;