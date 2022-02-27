const pingService = require("./ping-service");
const logger = require("../../services/logger.service");


async function pingRequest(req,res) {
    try {
        const { url } = req.params
        const { count } = req.params
        const answer = await pingService.pingRequest(url, count);
        res.send(answer)
    } catch (err) {
        console.error(err)
    }
}

async function getPings(req,res) {
    try {
        const pings = await pingService.getPings()
        res.send(pings)
    } catch (err) {
        console.error('cannot get pings', err);
    }
}



module.exports = {
    pingRequest,
    getPings
};
