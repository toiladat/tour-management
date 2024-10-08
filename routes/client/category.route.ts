import expess, { Express } from "express";
import * as controller from '../../controllers/client/category.controller'
const route=expess.Router()

route.get('/',controller.index)

export const categoryRoute=route