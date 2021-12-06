import express from "express"
import {check} from "express-validator"
const propiedades = express.Router()
const PropiedadController = require('../controllers/propiedades')
const chekAuth = require('../middleware/check-auth')


propiedades.get('/getAllPropiedades',chekAuth, PropiedadController.show_all)

propiedades.get('/filtro/habitaciones/:numeroHabitaciones', chekAuth, PropiedadController.filtro_num_habitaciones)

propiedades.get('/filtro/estacionamientos/:numeroEstacionamientos', chekAuth, PropiedadController.filtro_numero_estacionamientos)

propiedades.get('/filtro/banios/:numeroBanios', chekAuth, PropiedadController.filtro_numero_banios)

propiedades.get('/filtro/metros/:metrosCuadrados', chekAuth, PropiedadController.filtro_metros_cuadrados)

propiedades.get('/filtro/rango/:precioMin/:precioMax', chekAuth, PropiedadController.filtro_precio)

propiedades.get('/filtro/tipo/:renta', chekAuth, PropiedadController.filtro_renta)

propiedades.get('/filtro/propietario/:idPropieatario', chekAuth, PropiedadController.filtro_propietario)

propiedades.get('/misPropiedades', chekAuth, PropiedadController.mis_propiedades)

propiedades.post('/addPropiedad', chekAuth, [ //validation params
], PropiedadController.add)



propiedades.put('/updatePropiedad/:id', chekAuth, [ //validation params

], PropiedadController.update)

propiedades.delete('/deletePropiedad/:id', chekAuth, PropiedadController.eliminar)




module.exports = propiedades