require('dotenv').config({path: "src/.env"})
import express from "express"
import {check} from "express-validator"
const chekAuth = require('../middleware/check-auth')
const UsersController = require('../controllers/users')
const users = express.Router()

users.get('/getAllUsers', chekAuth, UsersController.get_all)


users.post('/crear', [ //validation params
        check('email')
            .isEmail()
            .normalizeEmail(),
        check('password')
            .isLength({min: 5, max: 20})
    ], UsersController.crear);

users.put('/updateUser/:id', chekAuth, [ 
    check('email')
        .isEmail()
        .normalizeEmail(),
    check('password')
        .isLength({min: 5, max: 20})
], UsersController.update)

users.post('/logIn', UsersController.users_log_in)

users.delete('/deleteUser/:id', chekAuth, UsersController.eliminar)




module.exports = users