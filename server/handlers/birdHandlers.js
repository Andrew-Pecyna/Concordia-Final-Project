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
        json: true
    };

    try {
        const birdResponse = await request(options)
    
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
            birds: [],
            profPic: formData.profPic,
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

// Posts new posts to forum collection

const forumPost = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");

        const postData = request.body
        const randomId = uuidv4()

        const newPost = { _id: randomId, ...postData}
        
        await db.collection("forum").insertOne(newPost);

        return response.status(200).json({ status: 200, message: "Post added to forum", data: newPost });

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Gets all forum posts from forum collection

const getForum = async (request, response) => {
    const client = await getClient();

    try {
        await client.connect();
        const db = client.db("birdfeed_db");
        
        const postData = await db.collection("forum").find().toArray();

        postData ? response.status(200).json({ status: 200, data: postData }) :
        response.status(404).json({ status: 404, message: "Post data does not exist", data: undefined })

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Posts all new posts to posts collection

const feedPost = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");

        const postData = request.body
        const randomId = uuidv4()

        const newPost = { _id: randomId, ...postData}
        
        await db.collection("posts").insertOne(newPost);

        return response.status(200).json({ status: 200, message: "Post added to posts collection", data: newPost });

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Get all posts - to be displayed on user HomePage

const getHomeFeed = async (request, response) => {
    const client = await getClient();

    try {
        await client.connect();
        const db = client.db("birdfeed_db");
        
        const postData = await db.collection("posts").find().toArray();

        postData ? response.status(200).json({ status: 200, data: postData }) :
        response.status(404).json({ status: 404, message: "Post data does not exist", data: undefined })

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Deletes feed post from posts collection

const deletePost = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");
        const postsCollection = db.collection("posts");

        const query = { _id: request.params.post_id }

        const result = await postsCollection.deleteOne(query)

        if (result.deletedCount === 1) {
            return response.status(200).json({ status: 200, message: "Post deleted"});
        }

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Deletes forum post from forum collection

const deleteForumPost = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");
        const forumCollection = db.collection("forum");

        const query = { _id: request.params.post_id }

        const result = await forumCollection.deleteOne(query)

        if (result.deletedCount === 1) {
            return response.status(200).json({ status: 200, message: "Forum post deleted"});
        }

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Get all posts by specific user - to be displayed on user profile page

const getUserFeed = async (request, response) => {
    const client = await getClient();

    try {
        await client.connect();
        const db = client.db("birdfeed_db");
        const postsCollection = db.collection("posts");

        let mongoQuery = {};
        if (request.query.userName) {
            mongoQuery["author"] = request.params.userName;
        }
        
        const userPostData = await postsCollection.find({ author: request.params.userName }).toArray();

        userPostData ? response.status(200).json({ status: 200, data: userPostData }) :
        response.status(404).json({ status: 404, message: "User post data does not exist", data: undefined })

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Patches new profile pic to user object

const changePhoto = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");

        const photoData = request.body

        await db.collection("users").updateOne({userName: photoData.userName}, { $set: {profPic: photoData.image}});
        const user = await db.collection("users").findOne({userName: photoData.userName});

        return response.status(200).json({ status: 200, message: "Photo was updated", data: user });

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}

// Posts new bird to bird array in user object

const addBird = async (request, response) => {
    const client = await getClient();
    
    try {
        await client.connect();
        const db = client.db("birdfeed_db");

        const birdData = request.body.bird
        const userData = request.body.user

        await db.collection("users").updateOne({userName: userData}, {$push: {birds: birdData}})
        const user = await db.collection("users").findOne({userName: userData});

        return response.status(200).json({ status: 200, message: "Bird added to birds array in user object.", data: user });

    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close();
    }

}


module.exports = { getBirds, getUser, addUser, forumPost, getForum, feedPost, getHomeFeed, getUserFeed, changePhoto, deletePost, deleteForumPost, addBird };