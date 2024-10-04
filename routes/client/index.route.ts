import { tourRoute } from "./tour.route"

export const clientRoute=(app)=>{
  app.use('/tours',tourRoute)
}