const express = require('express');
const apiRouter = express.Router();

const db = require("./db");

// Param handler for :minionId and :ideaId
const paramHandler = (req, res, next, id) => {
    let model = req.route.path.match(/(?<=\/).+(?=s)/)[0];

    if (req.method === "PUT" && Object.keys(req.query).length === 0) return res.status(400).send();
    try {
        const obj = db.getFromDatabaseById(`${model}s`, id);
        if (!obj) res.status(404).send(`Requested ${model} not found!`)

        req[`${model}`] = obj;
        if (req.method === "PUT" && Object.keys(req.query).length !== 0) req.query.id = req[`${model}`].id;
        return next();
    } catch(err) {
        return next(err);
    }
}

// MINIONS
apiRouter.route("/minions")
.get((req, res, next) => {
    return res.send(db.getAllFromDatabase("minions"));
})
.post((req, res, next) => {
    const obj = db.addToDatabase("minions", req.query);
    return res.status(201).send(obj)
})

apiRouter.param("minionId", paramHandler);
apiRouter.route("/minions/:minionId")
.get((req, res, next) => {
    return res.send(req.minion);
})
.put((req, res, next) => {
    const obj = db.updateInstanceInDatabase("minions", req.query)
    return res.send(obj);
})
.delete((req, res, next) => {
    db.deleteFromDatabasebyId("minions", req.minion.id)
    return res.status(204).send();
})

// IDEAS
apiRouter.route("/ideas")
.get((req, res, next) => {
    return res.send(db.getAllFromDatabase("ideas"));
})
.post((req, res, next) => {
    const obj = db.addToDatabase("ideas", req.query);
    return res.status(201).send(obj)
})

apiRouter.param("ideaId", paramHandler);
apiRouter.route("/ideas/:ideaId")
.get((req, res, next) => {
    return res.send(req.idea);
})
.put((req, res, next) => {
    const obj = db.updateInstanceInDatabase("ideas", req.query)
    return res.send(obj);
})
.delete((req, res, next) => {
    db.deleteFromDatabasebyId("ideas", req.idea.id)
    return res.status(204).send();
})

module.exports = apiRouter;