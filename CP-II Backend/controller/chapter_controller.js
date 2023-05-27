const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const jwt = require('jsonwebtoken');

const professor_schema = require('../model/professor_schema');
const chapter_schema = require('../model/chapter_schema');

module.exports = class chapter_controller extends BaseController {
    async chapter_insert(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const data = {
                prof_id: tokenData.id,
                subject: req.body.subject,
                class: req.body.class,
                chapter: req.body.chapter,
                topics: req.body.topics
            }

            const newData = new chapter_schema(data);
            const chapter = await newData.save();

            return this.sendJSONResponse(
                res,
                "chapter added",
                {
                    length:1
                },
                chapter
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async chapter_display(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const chapter = await chapter_schema.find({prof_id: tokenData.id});

            return this.sendJSONResponse(
                res,
                "chapters",
                {
                    length:1
                },
                chapter
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async chapter_update(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const newChapter = await chapter_schema.findByIdAndUpdate({_id: req.query.id}, {$set: {
                chapter: req.body.chapter,
                topics: req.body.topics,
                class: req.body.class
            }}, {new: true});

            return this.sendJSONResponse(
                res,
                "chapter updated",
                {
                    length:1
                },
                newChapter
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async chapter_delete(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const newChapter = chapter_schema.findByIdAndDelete({_id: req.query.id}, {new: true});

            return this.sendJSONResponse(
                res,
                "chapter deleted", 
                {
                    length: 1
                },
                newChapter
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }
}