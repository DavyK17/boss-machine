const checkMillionDollarIdea = (req, res, next) => {
    const { weeklyRevenue, numWeeks } = req.body;
    const totalRevenue = Number(weeklyRevenue) * Number(numWeeks);
    if (!weeklyRevenue || !numWeeks || isNaN(weeklyRevenue) || isNaN(numWeeks) || totalRevenue < 1000000) {
        return res.status(400).send("This is not a million dollar idea!");
    } 
    return next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
