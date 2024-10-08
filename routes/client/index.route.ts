import { tourRoute } from "./tour.route"
import { categoryRoute } from "./category.route"
export const clientRoute=(app)=>{
  app.use('/tours',tourRoute)
  app.use('/categories',categoryRoute)
}