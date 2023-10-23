const express = require("express");
const User = require("../models/user");
const Fact = require("../models/fact");

const jwtUtil = require("../helpers/jwtUtil");
const axios = require("axios");

const router = express.Router();

//GET gets user's profile info
router.get("/profile/:username", jwtUtil.verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });

    console.log(username, user);
    if (!user) {
      console.log("User not found... ", "this is user.. ", user)
      return res
        .status(404)
        .json({ message: `${username} not found in the database` });
    }

    res.status(200).json(user);
  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
});

//PUT updates user's profile info
router.put("/profile/:username", jwtUtil.verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const {newUsername} = req.body;
    const user = await User.findOneAndUpdate({ username: username }, {username: newUsername}, {
      new: true
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `${username} not found in the database` });
    }
    res.status(200).json(user);
    console.log("Updated user: ", user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE deletes user's profile
router.delete("/profile/:username", jwtUtil.verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `${username} not found in the database` });
    }
    res.sendStatus(204);
    console.log("The following user has been deleted", user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET gets a saveable fact from api
router.get("/facts", jwtUtil.verifyToken, async (req, res) => {
  try {
    const facts = await axios.get("https://dogapi.dog/api/v2/facts?limit=3");
    console.log(facts);
    res.status(200).send(facts.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

//POST save a fact to user's saved facts array
router.post("/facts", jwtUtil.verifyToken, async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const { username, factBody } = req.body;
    const user = await User.findOne({ username: username });
    const fact = await Fact.findOne({ username: username, fact: factBody });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the fact is already saved
    if (fact) {
      return res.status(400).json({ message: "Fact already saved" });
    }

    await Fact.create({
      username: username,
      fact: factBody,
    });

    res.status(200).json({ message: "Fact saved successfully" });
  } catch (error) {
    console.error("Error trying to save here: ", error);
    res.status(500).json({ message: error.message });
  }
});

// Get saved facts from user
router.get("/saved/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    const facts = await Fact.find({ username: username });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No such user found in database" });
    }

    res.status(200).json({ facts: facts.map(({ fact }) => fact) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE delete a saved fact
router.delete(
  "/saved/:username",
  jwtUtil.verifyToken,
  async (req, res) => {
    try {
      const { username } = req.params;
      const { factBody } = req.body; 
  
      const deletedFact = await Fact.findOneAndDelete({ username: username, fact: factBody });
  
      if (!deletedFact) {
        return res.status(200).json({ message: "Fact not found for specified user"});
      }

      res.status(200).json({message: "Fact successfully deleted"})

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
