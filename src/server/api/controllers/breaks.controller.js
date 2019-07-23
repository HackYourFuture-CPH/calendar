"use strict";

const HttpError = require("./../lib/utils/http-error");
const knex = require("../../config/db");
const path = require("path");
const defaultImage = process.env.DEFAULT_LOGO;

const getBreaks = async params => knex("breaks").select("*");

const getBreakById = async breakId =>
  knex("breaks")
    .select("*")
    .where({ id: breakId });

const deleteBreak = async (breakId, req) =>
  knex("breaks")
    .where({ id: breakId })
    .del();

const createBreak = async body => knex("breaks").insert(body);

module.exports = {
  getBreaks,
  getBreakById,
  deleteBreak,
  createBreak
};
