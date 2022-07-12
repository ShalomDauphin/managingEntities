const express = require("express");
const router = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const fs = require("fs");
const accountRoutes = require("./controllers/staff.js"); // import account route
const TraineesRoutes = require("./controllers/trainees.js");
const TrainersRoutes = require("./controllers/trainers.js");
router.use(accountRoutes); // use account route
router2.use(TraineesRoutes); // use account route
router3.use(TrainersRoutes); // use account route
module.exports = router;
module.exports = router2;
module.exports = router3;
