const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
const ping = require("node-http-ping");

module.exports = {
  pingRequest,
  getPings
};

async function pingRequest(url ,count) {
  try {
    const answer = _sendPing(url ,count);
    const collection = await dbService.getCollection("ping");
    const isPingExist = await collection.findOne({ url });
    if (isPingExist) {
      await collection.updateOne({ url }, { $inc: { count: 1 } });
    } else {
      await collection.insertOne({ url , count: 1});
    }
    return answer;
  } catch (err) {
    logger.error("cannot insert ping", err);
    throw err;
  }
}

async function getPings() {
  try {
    const collection = await dbService.getCollection("ping");
    let pings = await collection.find().toArray()
    pings.sort((a,b) => b.count - a.count)
    return pings.slice(0,5)
  } catch (err) {
    console.error(`Failed to pings `);
  }
}

async function _sendPing(url, count = 80) {
  try {
    const time = await ping(url, count);
    return `Ping to ${url}, Response time: ${time}ms`;
  } catch (err) {
    console.error(`Failed to ping ${url}`);
    return `Failed to ping ${url}`;
  }
}

