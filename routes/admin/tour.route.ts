import express from 'express'
import * as controller from '../../controllers/admin/tour.controller'
const route=express.Router()

route.get('/',controller.index)
route.get('/create',controller.create)
route.post('/create',controller.creatPost)
export const tourRoute=route