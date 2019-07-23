"use strict";

const express = require("express");
const router = express.Router();

// ::V1 router
const classesRouter = require("./classes.router");
const teachersRouter = require("./teachers.router");
const modulesRouter = require("./modules.router");
const breaksRouter = require("./breaks.router");

// /api/episodes
router.use("/classes", classesRouter);
router.use("/teachers", teachersRouter);
router.use("/modules", modulesRouter);
router.use("/breaks", breaksRouter);

module.exports = router;
