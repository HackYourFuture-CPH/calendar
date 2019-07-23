"use strict";

// router setup
const express = require("express");
const router = express.Router({ mergeParams: true });

const path = require("path");

// controllers
const breaksController = require("../controllers/breaks.controller");

// ENDPOINT: /api/breaks/ :GET to get all breaks
router.get("/", (req, res, next) => {
  breaksController
    .getBreaks(req.query)
    .then(result => res.json(result))
    .catch(next);
});

// ENDPOINT: /api/breaks/:id :GET to get one break
router.get("/:id", (req, res, next) => {
  breaksController.getBreakById(req.params.id).then(results => {
    // Check if the result is empty
    if (!results.propertyIsEnumerable(0)) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(results);
    }
  });
});

// ENDPOINT: /api/breaks/ :POST
router.post("/", (req, res, next) => {
  breaksController
    .createBreak(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res
        .status(400)
        .send("Bad request")
        .end();
    });
});

// ENDPOINT: /api/breaks/ :PATCH
router.patch("/", (req, res, next) => {
  breaksController
    .editBreak({ body: req.body })
    .then(result => res.json(result))
    .catch(next);
});

// ENDPOINT: /api/example/ :DELETE
router.delete("/:id", (req, res, next) => {
  breaksController
    .deleteBreak(req.params.id, req)
    .then(result => {
      // If result is equal to 0, then that means the Break id does not exist
      if (result === 0) {
        res.status(404).send("The Break ID you provided does not exist.");
      } else {
        res.status(200).send("Record has been deleted.");
      }
    })
    .catch(next);
});

module.exports = router;
