const express = require('express');
const apiRouter = express.Router();

const db = require("./db");

// MINIONS
apiRouter.route("/minions")
    .get((req, res, next) => {
        return res.send(db.getAllFromDatabase("minions"));
    })
    .post((req, res, next) => {
        db.addToDatabase("minions", req.query);
        return res.status(201).send(db.getAllFromDatabase("minions"))
    })

apiRouter.param("minionId", (req, res, next, id) => {
    if (req.method === "PUT" && Object.keys(req.query).length === 0) return res.status(400).send();
    try {
        const minion = db.getFromDatabaseById("minions", id);
        if (!minion) res.status(404).send("Minion not found!")

        req.minion = minion;
        if (req.method === "PUT" && Object.keys(req.query).length !== 0) req.query.id = req.minion.id;
        return next();
    } catch(err) {
        return next(err);
    }
});
apiRouter.route("/minions/:minionId")
    .get((req, res, next) => {
        return res.send(req.minion);
    })
    .put((req, res, next) => {
        db.updateInstanceInDatabase("minions", req.query)
        return res.send("Minion updated successfully!");
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
    db.addToDatabase("ideas", req.query);
    return res.status(201).send(db.getAllFromDatabase("ideas"))
})

apiRouter.param("ideaId", (req, res, next, id) => {
if (req.method === "PUT" && Object.keys(req.query).length === 0) return res.status(400).send();
try {
    const idea = db.getFromDatabaseById("ideas", id);
    if (!idea) res.status(404).send("Idea not found!")

    req.idea = idea;
    if (req.method === "PUT" && Object.keys(req.query).length !== 0) req.query.id = req.idea.id;
    return next();
} catch(err) {
    return next(err);
}
});
apiRouter.route("/ideas/:ideaId")
.get((req, res, next) => {
    return res.send(req.idea);
})
.put((req, res, next) => {
    db.updateInstanceInDatabase("ideas", req.query)
    return res.send("Idea updated successfully!");
})
.delete((req, res, next) => {
    db.deleteFromDatabasebyId("ideas", req.idea.id)
    return res.status(204).send();
})

module.exports = apiRouter;
