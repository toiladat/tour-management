import expess, { Express } from "express";
import * as controller from '../../controllers/client/tour.controller'
const route=expess.Router()

route.get('/',controller.index)

export const tourRoute=route