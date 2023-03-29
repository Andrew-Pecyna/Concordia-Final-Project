"use strict";

require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const { api_key } = process.env;
const request = require('request-promise')

const getClient = async () => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return client;
}

// Endpoint handlers below


const getBirds = async (req, res) => {
    console.log(api_key)
    const options = {
        uri: 'https://nuthatch.lastelm.software/birds',
        headers: {
            'api-key': api_key
        },
        json: true // Automatically parses the JSON string in the response
    };

    try {
        const birdResponse = await request(options)
        // const parsedResponse = await JSON.parse(birdResponse)
        // const birdData = parsedResponse.data
        console.log(birdResponse)
        return res.status(200).json({status: 200, data: birdResponse});
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getBirds };