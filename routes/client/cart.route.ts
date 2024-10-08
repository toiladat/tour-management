import express, { Express } from "express";
const route= express.Router()
import * as controller from '../../controllers/client/cart.controller'


route.get('/',controller.index)
route.post('/list-json',controller.tourList)
export const cartRoute=route