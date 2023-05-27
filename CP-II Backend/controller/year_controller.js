const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const jwt = require('jsonwebtoken');

const year_schema = require('../model/year_schema');
const professor_schema = require('../model/professor_schema');

module.exports = class year_controller extends BaseController {
    async year_insert(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const data = {
                year : req.body.year,
                prof_id: tokenData.id
            }

            const yearData = new year_schema(data);
            const newYearData = await yearData.save();

            return this.sendJSONResponse(
                res,
                "new year added", 
                {
                    length: 1
                },
                newYearData
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async year_display(req, res) {
        try {
            const tokenData = req.userdata;

            const professor = await professor_schema.findOne({_id: tokenData.id});

            if(!professor) {
                throw new Forbidden("You are not professor");
            }

            const year = await year_schema.find({prof_id: tokenData.id});

            return this.sendJSONResponse(
                res,
                "years", 
                {
                    length: 1
                },
                year
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    // async year_update(req, res) {
    //     try {
    //         const tokenData = req.userdata;

    //         const professor = await professor_schema.findOne({_id: tokenData.id});

    //         if(!professor) {
    //             throw new Forbidden("You are not professor");
    //         }

            
    //     } catch (error) {
    //         if(error instanceof NotFound){
    //             throw error;
    //         }
    //         return this.sendErrorResponse(req, res, error);
    //     }
    // }
}