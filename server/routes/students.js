const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");


//view all records
router.get("/",studentsController.view);

//Add new records
router.get("/adduser",studentsController.adduser);
router.post("/adduser",studentsController.save);

//Update records
router.get("/edituser/:id",studentsController.edituser);
router.post("/edituser/:id",studentsController.edit);

//Delete Records
router.get("/deleteuser/:id",studentsController.delete);

 module.exports = router;