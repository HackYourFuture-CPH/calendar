"use strict";

const HttpError = require("../lib/utils/http-error");
const knex = require("../../config/db");
const path = require("path");

const moduleColumns = [
  "modules.id as id",
  "modules.title as title",
  "modules.start_date as start_date",
  "modules.end_date as end_date",
  "classes.id as class_id",
  "classes.title as class_title"
];

const getModules = async params =>
  knex("modules")
    .join("classes", "modules.class_id", "=", "classes.id")
    .columns(moduleColumns);

const getModuleById = async moduleId => {
  return knex("modules")
    .join("classes", "modules.id", "=", "classes.id")
    .where("modules.id", moduleId)
    .columns(moduleColumns);
};

const deleteModule = async (modulesId, req) => {
  return knex("modules")
    .where({ id: modulesId })
    .del();
};

const createModule = async body => {
  console.log(body);

  const [moduleId] = await knex("modules").insert({
    title: body.title,
    start_date: body.start_date,
    end_date: body.end_date,
    class_id: body.class_id
  });

  if (body.teacher_1) {
    // should be done at the same time, teacher1 and teacher2 requests!
    const [teacher1Id] = await knex("module_teachers").insert({
      teacher_id: body.teacher_1,
      module_id: moduleId
    });
  }

  if (body.teacher_2) {
    // should be done at the same time, teacher1 and teacher2 requests!
    const [teacher1Id] = await knex("module_teachers").insert({
      teacher_id: body.teacher_2,
      module_id: moduleId
    });
  }

  return {
    successful: true
  };
};

module.exports = {
  getModules,
  getModuleById,
  deleteModule,
  createModule
};
