"use strict";

require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const { api_key } = process.env;
const request = require('request-promise')
const { v4: uuidv4 } = require("uuid");

const getClient = async () => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return client;
}

// Endpoint handlers below

// Returns the all bird species objects in API
// (req, res) used because of conflict with "request" from request promise
const getBirds = async (req, res) => {

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

// Searches users collection for specific user
const getUser = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");
        const { email } = request.params
        
        const userData = await db.collection("users").findOne({email});

        userData ? response.status(200).json({ status: 200, data: userData }) :
        response.status(404).json({ status: 404, message: "User does not exist", data: undefined })

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Posts new user to user collection
const addUser = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");

        const formData = request.body
        const randomId = uuidv4()

        const newUser = {
            _id: randomId,
            userName: formData.userName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }
        
        await db.collection("users").insertOne(newUser);

        return response.status(200).json({ status: 200, message: "account Created", data: newUser });

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

module.exports = { getBirds, getUser, addUser };