const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const jwt = require('jsonwebtoken');

const professor_schema = require('../model/professor_schema');
const subject_schema = require('../model/subject_schema');

module.exports = class subject_controller extends BaseController {
    async subject_insert(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const data = {
                prof_id: tokenData.id,
                subject: req.body.subject,
                class: req.body.class
            }

            const newData = new subject_schema(data);
            const subject = await newData.save();

            return this.sendJSONResponse(
                res,
                "new class added", 
                {
                    length: 1
                },
                subject
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async subject_display(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const subject = await subject_schema.find({prof_id: tokenData.id});

            return this.sendJSONResponse(
                res,
                "subjects", 
                {
                    length: 1
                },
                subject
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async subject_update(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const newSubject = await subject_schema.findByIdAndUpdate({_id: req.query.id}, {$set:{subject: req.body.subject, class: req.body.class}}, {new: true});

            return this.sendJSONResponse(
                res,
                "subject updated", 
                {
                    length: 1
                },
                newSubject
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async subject_delete(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const newSubject = await subject_schema.findByIdAndDelete({_id: req.query.id}, {new: true});

            return this.sendJSONResponse(
                res,
                "subject deleted", 
                {
                    length: 1
                },
                newSubject
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }
}