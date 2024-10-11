import express from 'express'

import * as controller from '../../controllers/admin/category.controller'

const route=express.Router()

route.get('/',controller.index)

export const cateogryRoute=route