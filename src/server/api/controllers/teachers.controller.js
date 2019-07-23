"use strict";

const HttpError = require("../lib/utils/http-error");
const knex = require("../../config/db");
const path = require("path");
const defaultImage = process.env.DEFAULT_LOGO;

const getTeachers = async params => knex("teachers").select("*");

const getTeacherById = async teacherId =>
  knex("teachers")
    .select("*")
    .where({ id: teacherId });

const deleteTeacher = async (teacherId, req) =>
  knex("teachers")
    .where({ id: teacherId })
    .del();

const createTeacher = async body => knex("teachers").insert(body);

module.exports = {
  getTeachers,
  getTeacherById,
  deleteTeacher,
  createTeacher
};
