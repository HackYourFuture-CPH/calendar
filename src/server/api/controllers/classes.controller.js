"use strict";

const HttpError = require("../lib/utils/http-error");
const knex = require("../../config/db");
const path = require("path");
const defaultImage = process.env.DEFAULT_LOGO;

const getClasses = async params => knex("classes").select("*");

const getClassById = async classId =>
  knex("classes")
    .select("*")
    .where({ id: classId });

const deleteClass = async (classId, req) =>
  knex("classes")
    .where({ id: classId })
    .del();

const createClass = async body => knex("classes").insert(body);

module.exports = {
  getClasses,
  getClassById,
  deleteClass,
  createClass
};
