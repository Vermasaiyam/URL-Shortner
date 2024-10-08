const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if (!body){
        return res.status(400).json({error: "URL is required."});
    }
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    // return res.json({id: shortId});
    return res.render('home', {id: shortId});
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}