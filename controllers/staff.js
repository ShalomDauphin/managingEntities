const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

const path = "./models/staff.json";

const saveStaffData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(stringifyData);
};

const getStaffData = () => {
  const jsonData = fs.readFileSync(path);
  return JSON.parse(jsonData);
};

// reading the data from json

accountRoutes.get("/staff", (req, res) => {
  fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

accountRoutes.post("/staff/addstaff", (req, res) => {
  try {
    var existingStaff = getStaffData();
    const newId = Math.floor(1000000 + Math.random() * 900000);
    existingStaff[newId] = req.body;
    console.log(existingStaff);

    saveStaffData(existingStaff);
    res.send({ success: true, message: "staff created successfully" });
  } catch (e) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

// get all created staff from the json file

accountRoutes.get("/staff/list", (req, res) => {
  const accounts = getStaffData();
  res.send(accounts);
});

//update using patch method
accountRoutes.patch("/staff/:id", (req, res) => {
  var existingStaff = getStaffData();
  fs.readFile(path, "utf-8", (err, data) => {
    const accountId = req.params["id"];
    existingStaff[accountId] = req.body;

    saveStaffData(existingStaff);
    res.send(`staff with is ${accountId} has been updated`);
  });
});

// delete

accountRoutes.delete("/staff/delete/:id", (req, res) => {
  fs.readFile(
    path,
    "utf-8",
    (err, data) => {
      var existingStaff = getStaffData();

      const userId = req.params["id"];
      delete existingStaff[userId];
      saveStaffData(existingStaff);
      res.send(`staff with ${userId} has been deleted`);
    },
    true
  );
});
module.exports = accountRoutes;
