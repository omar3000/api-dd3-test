import {Request, Response} from 'express'
import {validationResult} from 'express-validator'
import {v4 as uuidv4} from 'uuid'

const Propiedad = require('../models/Propiedad')
const User = require("../models/User")
const { Op } = require("sequelize");;

exports.show_all = (req: Request, res: Response) => {
    Propiedad.findAll()
        .then((item: any) => {
            let getItem = JSON.stringify(item, null, 2)
            res.send(getItem)
        })
        .catch((err: Error) => {
            res.send("error: " + err)
        })

}

exports.filtro_num_habitaciones = (req: Request, res: Response) => {

    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            numeroHabitaciones: req.params.numeroHabitaciones
        }
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}

exports.filtro_numero_estacionamientos = (req: Request, res: Response) => {
  
    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            numeroEstacionamientos: req.params.numeroEstacionamientos
        }
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}

exports.filtro_numero_banios = (req: Request, res: Response) => {

    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            numeroBanios: req.params.numeroBanios
        }
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}

exports.filtro_metros_cuadrados = (req: Request, res: Response) => {
    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            metrosCuadrados: req.params.metrosCuadrados
        }
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}

exports.filtro_renta = (req: Request, res: Response) => {
    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            renta: req.params.renta
        }
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}

exports.filtro_precio = (req: Request, res: Response) => {

    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            [Op.and]: [
                {
                    precio: {
                        [Op.between]: [req.params.precioMin, req.params.precioMax]
                    }
                } 
            ]
        }
        
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}

exports.filtro_propietario = (req: Request, res: Response) => {
    Propiedad.findAll({
        include: [{
            model: User
       }],
        where: {
            userid: req.params.idPropieatario
        }
        
    })
    .then((item: any) => {
        let getItem = JSON.stringify(item, null, 2)
        res.send(getItem)
    })
    .catch((err: Error) => {
        res.send("error: " + err)
    })

}


exports.add = (req, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array(), status: "Faild"})
        return res.status(422).json({errors: errors.array()})
    }
 
    const currentUserId = req.userData.userId;
    const today: string = new Date().toLocaleString();
    const todaySubStr: string = today.substr(0, today.length - 3);
    const newItemInfo: object = {
        id: uuidv4(),
        renta: req.body.renta,
        userid: currentUserId,
        numeroHabitaciones: req.body.numeroHabitaciones,
        numeroEstacionamientos: req.body.numeroEstacionamientos,
        numeroBanios: req.body.numeroBanios,
        precio: req.body.precio,
        metrosCuadrados: req.body.metrosCuadrados,
        createdAt: todaySubStr
    }
  
    Propiedad.create(newItemInfo)
        .then((item: any) => {
            res.json({errorText: item.name + " created", status: "Success"})
        })
        .catch((err: Error) => {
            res.send("error: " + err)
        })

}

exports.mis_propiedades = (req, res: Response) => {
    const currentUserId = req.userData.userId
    return Propiedad.findAll({
        where: {
            userid: currentUserId
        },
        order: [
            ['createdAt', 'ASC']
        ]
    })
        .then((items: any) => {
            res.json(items)
        })
        .catch((err: object) => {
            res.status(500).json({
                error: err
            })
        })

}

exports.eliminar = (req: Request, res: Response) => {
    Propiedad.destroy({
        where:{
            id:req.params.id
        }
    })
        .then(() => {
            res.json({errorText: 'Propiedad was successfully deleted', status: "Success"})
        })
        .catch((err:Error) => {
            res.json({message: err})
        })
}

exports.update = (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array(), status: "Faild"})
        return res.status(422).json({errors: errors.array()})
    }
 
    const today: string = new Date().toLocaleString();
    const todaySubStr: string = today.substr(0, today.length - 3);
    const newItemInfo: object = {
        renta: req.body.renta,
        numeroHabitaciones: req.body.numeroHabitaciones,
        numeroEstacionamientos: req.body.numeroEstacionamientos,
        numeroBanios: req.body.numeroBanios,
        precio: req.body.precio,
        metrosCuadrados: req.body.metrosCuadrados,
        updatedAt: todaySubStr
    }
  
    Propiedad.update(newItemInfo,{where:{id: req.params.id}})
        .then((item: any) => {
            res.json({errorText: item.name + " updated", status: "Success"})
        })
        .catch((err: Error) => {
            res.send("error: " + err)
        })
    
}



