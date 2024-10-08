import { Request, Response } from "express"
import Tour from "../../models/tour.models"
import sequelize from "../../configs/database"
import { QueryTypes } from "sequelize"
import { Json } from "sequelize/types/utils"
//[GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {

  const slug = req.params.slugCategory
  const query = `SELECT tours.*, price * (1 - discount/100) AS price_special
  FROM tours
  JOIN tours_categories ON tours.id = tours_categories.tour_id
  JOIN categories ON tours_categories.category_id = categories.id
  WHERE
    categories.slug = '${slug}'
    AND categories.deleted = false
    AND categories.status = 'active'
    AND tours.deleted = false
    AND tours.status = 'active';`

  const tours = await sequelize.query(query, {
    type: QueryTypes.SELECT
  })
  for( const tour of tours){
    if(tour['images']){
      const arrayImage=JSON.parse(tour['images'])
      if(arrayImage.length>0)
        tour['image']=arrayImage[0]
    }
    if(tour['price_special']){
      tour['price_special']=parseInt(tour['price_special'])
    }
  }
    

  res.render('client/pages/tours/index.pug', {
    pageTitle: "Danh sách tours du lịch",
    tours:tours
  })
}
//[GET]/tours/detail/:slugTour
export const  detail=async(req:Request,res:Response)=>{
  console.log(req.params);
  res.render('client/pages/tours/detail.pug',{
    pageTitle:"Chi tiết tour"
  })
  
}