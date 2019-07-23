"use strict";

// router setup
const express = require("express");
const router = express.Router({ mergeParams: true });

const path = require("path");

// controllers
const classesController = require("./../controllers/classes.controller");

// ENDPOINT: /api/classes/ :GET to get all classes
router.get("/", (req, res, next) => {
  classesController
    .getClasses(req.query)
    .then(result => res.json(result))
    .catch(next);
});

// ENDPOINT: /api/classes/:id :GET to get one class
router.get("/:id", (req, res, next) => {
  classesController.getClassById(req.params.id).then(results => {
    // Check if the result is empty
    if (!results.propertyIsEnumerable(0)) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(results);
    }
  });
});

// ENDPOINT: /api/classes/ :POST
router.post("/", (req, res, next) => {
  classesController
    .createClass(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res
        .status(400)
        .send("Bad request")
        .end();
    });
});

// ENDPOINT: /api/classes/ :PATCH
router.patch("/", (req, res, next) => {
  classesController
    .editClass({ body: req.body })
    .then(result => res.json(result))
    .catch(next);
});

// ENDPOINT: /api/example/ :DELETE
router.delete("/:id", (req, res, next) => {
  classesController
    .deleteClass(req.params.id, req)
    .then(result => {
      // If result is equal to 0, then that means the class id does not exist
      if (result === 0) {
        res.status(404).send("The class ID you provided does not exist.");
      } else {
        res.status(200).send("Record has been deleted.");
      }
    })
    .catch(next);
});

module.exports = router;
