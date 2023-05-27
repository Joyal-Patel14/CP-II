const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const jwt = require('jsonwebtoken');

const professor_schema = require('../model/professor_schema');
const semester_schema = require('../model/semester_schema');

module.exports = class semester_controller extends BaseController {
    async semester_insert(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const data = {
                prof_id: tokenData.id,
                year: req.body.year,
                semesters: req.body.semesters
            }

            const newSemesters = new semester_schema(data);
            const semesters = await newSemesters.save();

            return this.sendJSONResponse(
                res,
                "new semesters added", 
                {
                    length: 1
                },
                semesters
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async semester_display(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const semesters = await semester_schema.find({prof_id: tokenData.id});

            return this.sendJSONResponse(
                res,
                "semesters", 
                {
                    length: 1
                },
                semesters
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async semester_update(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const newsem = await semester_schema.findByIdAndUpdate({_id: req.query.id}, {$set:{year: req.body.year, semesters: req.body.semesters}}, {new: true});

            return this.sendJSONResponse(
                res,
                "semester updated", 
                {
                    length: 1
                },
                newsem
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async semester_delete(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const newsem = await semester_schema.findByIdAndDelete({_id: req.query.id});

            return this.sendJSONResponse(
                res,
                "semester deleted", 
                {
                    length: 1
                },
                newsem
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }
}