import express from "express"
import * as controller from '../../controllers/client/order.controller'
const route=express.Router()

route.post('/',controller.index)
export const orderRoute=route