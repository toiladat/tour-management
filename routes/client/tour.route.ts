import expess, { Express } from "express";
import * as controller from '../../controllers/client/tour.controller'
const route=expess.Router()

route.get('/:slugCategory',controller.index)
route.get('/detail/:slugTour',controller.detail)
export const tourRoute=route