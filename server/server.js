// Import libraries.
const express = require("express");

const morgan = require("morgan")

const router = require("./routes/birdRoutes")

const PORT = 8000;

const app = express();

// Server will be expecting json-formatted data.
app.use(express.json());

app.use(morgan("tiny"))

// Requests for static files will look in public.
app.use(express.static("public"));

app.use(router);

app.get("*", (request, response) => {
    return response
    .status(404)
    .json({ status: 404, message: "No endpoint found." });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));