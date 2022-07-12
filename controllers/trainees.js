const express = require("express");
const TraineesRoutes = express.Router();
const fs = require("fs");

const path = "./models/trainees.json";

const saveTrainessData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(stringifyData);
};

const getTraineesData = () => {
  const jsonData = fs.readFileSync(path);
  return JSON.parse(jsonData);
};

// reading the data from json

TraineesRoutes.get("/trainees", (req, res) => {
  fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

TraineesRoutes.post("/trainees/addtrainees", (req, res) => {
  var existingtrainees = getTraineesData();
  const newId = Math.floor(1000000 + Math.random() * 900000);
  existingtrainees[newId] = req.body;
  console.log(existingtrainees);

  saveTrainessData(existingtrainees);
  res.send({ success: true, message: "trainees created successfully" });
});

// get all created trainees from the json file

TraineesRoutes.get("/trainees/list", (req, res) => {
  const trainees = getTraineesData();
  res.send(trainees);
});

//update using patch method
TraineesRoutes.patch("/trainees/:id", (req, res) => {
  var existingtrainees = getTraineesData();
  fs.readFile(path, "utf-8", (err, data) => {
    const accountId = req.params["id"];
    existingtrainees[accountId] = req.body;

    saveTrainessData(existingtrainees);
    res.send(`trainees with is ${accountId} has been updated`);
  });
});

// delete

TraineesRoutes.delete("/trainees/delete/:id", (req, res) => {
  fs.readFile(
    path,
    "utf-8",
    (err, data) => {
      var existingtrainees = getTraineesData();

      const userId = req.params["id"];
      delete existingtrainees[userId];
      saveTrainessData(existingtrainees);
      res.send(`trainees with ${userId} has been deleted`);
    },
    true
  );
});
module.exports = TraineesRoutes;
