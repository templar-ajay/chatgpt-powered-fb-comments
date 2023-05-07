const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/:topic", (req, res) => {
  const topic = req.params.topic;
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "suggest me a positive facebook comment on " + topic + " post",
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.choices[0].message.content);
      res.json({ data: response.data.choices[0].message.content });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error generating text");
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
