"use strict";

// router setup
const express = require("express");
const router = express.Router({ mergeParams: true });

const path = require("path");

// controllers
const teachersController = require("./../controllers/teachers.controller");

// ENDPOINT: /api/teachers/ :GET to get all teachers
router.get("/", (req, res, next) => {
  teachersController
    .getTeachers(req.query)
    .then(result => res.json(result))
    .catch(next);
});

// ENDPOINT: /api/teachers/:id :GET to get one teachers
router.get("/:id", (req, res, next) => {
  teachersController.getTeacherById(req.params.id).then(results => {
    // Check if the result is empty
    if (!results.propertyIsEnumerable(0)) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(results);
    }
  });
});

// ENDPOINT: /api/teachers/ :POST
router.post("/", (req, res, next) => {
  teachersController
    .createTeacher(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res
        .status(400)
        .send("Bad request")
        .end();
    });
});

// ENDPOINT: /api/teachers/ :PATCH
router.patch("/", (req, res, next) => {
  teachersController
    .editTeacher({ body: req.body })
    .then(result => res.json(result))
    .catch(next);
});

// ENDPOINT: /api/example/ :DELETE
router.delete("/:id", (req, res, next) => {
  teachersController
    .deleteTeacher(req.params.id, req)
    .then(result => {
      // If result is equal to 0, then that means the teachers id does not exist
      if (result === 0) {
        res.status(404).send("The teachers ID you provided does not exist.");
      } else {
        res.status(200).send("Record has been deleted.");
      }
    })
    .catch(next);
});

module.exports = router;
