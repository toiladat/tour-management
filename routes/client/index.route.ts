import { tourRoute } from "./tour.route"
import { categoryRoute } from "./category.route"
import { cartRoute } from "./cart.route"
import { orderRoute } from "./order.route"
export const clientRoute=(app)=>{
  app.use('/tours',tourRoute)
  app.use('/categories',categoryRoute)
  app.use('/cart',cartRoute)
  app.use('/orders',orderRoute)
}