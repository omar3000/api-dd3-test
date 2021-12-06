require('dotenv').config({path: "src/.env"})
import {Request, Response} from "express"
import {validationResult} from "express-validator"
import {v4 as uuidv4} from "uuid"
const Propiedad = require("../models/Propiedad")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const saltRounds: number = 10
const jwt = require("jsonwebtoken")
const sequelize = require("../database/db");



exports.get_all = (req: Request, res: Response) => {
    User.findAll()
        .then((user) => {
            let allUsers = JSON.stringify(user, null, 2)
            res.send(allUsers)
        })
}


exports.crear = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    bcrypt.genSalt(saltRounds, function (err: Error, salt) {
        bcrypt.hash(req.body.password, salt, function (err: Error, hash: String) {
            const today: string = new Date().toLocaleString()
            const todaySubStr: string = today.substr(0, today.length - 3)
            const newUserInfo: object = {
                id: uuidv4(),
                email: req.body.email,
                password: hash,
                created: todaySubStr
            }
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then((user) => {
                    if (!user) {
                        User.create(newUserInfo)
                            .then((user) => {
                                res.json({
                                    successText: user.email + " registered",
                                    status: "Success",
                                    userId: user.dataValues.id
                                })
                            })
                            .catch((err: Error) => {
                                res.send("error: " + err)
                            })
                    } else {
                    res.json({errorText: "This email is already registered", status: "Faild"})}
                })
                .catch((err: Error) => {
                    res.send("error: " + err)
                })
        })
    })

}

exports.update = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    bcrypt.genSalt(saltRounds, function (err: Error, salt) {
        bcrypt.hash(req.body.password, salt, function (err: Error, hash: String) {
            const today: string = new Date().toLocaleString()
            const todaySubStr: string = today.substr(0, today.length - 3)
            const newUserInfo: object = {
                email: req.body.email,
                password: hash,
                updatedAt: todaySubStr
            }

            User.update(newUserInfo,{where:{id: req.params.id}})
            .then((user) => {
                res.json({
                    successText: user.email + " updated",
                    status: "Success",
                })
            })
            .catch((err: Error) => {
                res.send("error: " + err)
            })


                   
         
        })
    })

}

exports.eliminar = async (req: Request, res: Response) => {

    let transaction;

    try {
        transaction = await sequelize.transaction();
    
        await Propiedad.destroy({
            where:{
                userid:req.params.id
            }
        });
    
        await User.destroy({
            where:{
                id:req.params.id
            }
        });

        res.json({errorText: 'Usuario y sus propiedades was successfully deleted', status: "Success"})
    
    } catch (err) {

        // Rollback transaction if any errors were encountered
        await transaction.rollback();

       
        res.json({message: err})
        
    }

}


exports.users_log_in = (req: Request, res: Response) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then((user) => {
            if (user === null) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            } else {
            bcrypt.compare(req.body.password, user.password, (err: Error, result: Response) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token: any = jwt.sign(
                        {
                            email: user.email,
                            userId: user.id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "500h"
                        },
                    )
                    return res.status(200).json({
                        userId: user.id,
                        status: "Success",
                        message: 'Auth successful for 500h',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })};
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

