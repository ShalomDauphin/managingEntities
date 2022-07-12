const express = require("express");
const TrainersRoutes = express.Router();
const fs = require("fs");

const path = "./models/trainerss.json";

const saveTrainersData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(stringifyData);
};

const gettrainersData = () => {
  const jsonData = fs.readFileSync(path);
  return JSON.parse(jsonData);
};

// reading the data from json

TrainersRoutes.get("/trainers", (req, res) => {
  fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

TrainersRoutes.post("/trainers/addtrainers", (req, res) => {
  try {
    var existingtrainers = gettrainersData();
    const newId = Math.floor(1000000 + Math.random() * 900000);
    existingtrainers[newId] = req.body;
    console.log(existingtrainers);

    saveTrainersData(existingtrainers);
    res.send({ success: true, message: "trainers created successfully" });
  } catch (e) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

// get all created trainers from the json file

TrainersRoutes.get("/trainers/list", (req, res) => {
  const trainers = gettrainersData();
  res.send(trainers);
});

//update using patch method
TrainersRoutes.patch("/trainers/:id", (req, res) => {
  var existingtrainers = gettrainersData();
  fs.readFile(path, "utf-8", (err, data) => {
    const accountId = req.params["id"];
    existingtrainers[accountId] = req.body;

    saveTrainersData(existingtrainers);
    res.send(`trainers with is ${accountId} has been updated`);
  });
});

// delete

TrainersRoutes.delete("/trainers/delete/:id", (req, res) => {
  fs.readFile(
    path,
    "utf-8",
    (err, data) => {
      var existingtrainers = gettrainersData();

      const userId = req.params["id"];
      delete existingtrainers[userId];
      saveTrainersData(existingtrainers);
      res.send(`trainers with ${userId} has been deleted`);
    },
    true
  );
});
module.exports = TrainersRoutes;
