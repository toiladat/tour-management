import express from "express"
import * as controller from '../../controllers/client/order.controller'
const route=express.Router()

route.post('/',controller.index)
route.get('/success/:orderCode',controller.success)
export const orderRoute=route