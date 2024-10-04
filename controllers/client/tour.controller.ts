import { Request, Response } from "express"
import Tour from "../../models/tour.models"
//[GET] /tours
export const index = async (req: Request, res: Response) => {


  // select * from tours where deleted=false and status='active'
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  })
  console.log(tours);


  res.render('client/pages/tours/index.pug', {
    pageTitle: "Danh sách tours du lịch"
  })
}