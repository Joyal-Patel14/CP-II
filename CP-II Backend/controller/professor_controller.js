const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const jwt = require('jsonwebtoken');

const professor_schema = require('../model/professor_schema');

module.exports = class professor_controller extends BaseController {
    async professor_insert(req, res) {
        try {
            const professor_data = {
                full_name: req.body.full_name,
                email: req.body.email,
                mobile: req.body.mobile,
                username: req.body.username,
                password: req.body.password
            };

            const already_data = await professor_schema.find({username: req.body.username});

            if(already_data.length !== 0) {
                throw new Forbidden("Data is already registered");
            }

            const professorData = new professor_schema(professor_data);
            const new_professor = await professorData.save();

            return this.sendJSONResponse(
                res,
                "professor added", 
                {
                    length: 1
                },
                new_professor
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async professor_login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const professor = await professor_schema.find({username: username});

            if(professor.length === 0) {
                throw new Forbidden("username is not registered");
            }

            if(professor[0].password !== password) {
                throw new Forbidden("Incorrect password");
            }

            const required_data = {
                id: professor[0]._id,
                full_name: professor[0].full_name,
                email: professor[0].email,
                mobile: professor[0].mobile,
                username: professor[0].username,
                password: professor[0].password,
            };

            const token = jwt.sign(required_data, "asd", { expiresIn:'365d' });

            const result = {
                token: token
            };

            return this.sendJSONResponse(
                res,
                "successfully login",
                {
                    length:1
                },
                result
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }
}