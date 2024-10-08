import { Request, Response } from "express"
import Tour from "../../models/tour.models"

export const index = (req: Request, res: Response) => {
  res.render('client/pages/cart/index', {
    pageTitle: "Giỏ hàng"
  })
}


export const tourList = async (req: Request, res: Response) => {
  const tours = req.body
  let total = 0
  for (const tour of tours) {
    const tourInfor = await Tour.findOne({
      where: {
        id: tour.id,
        deleted: false,
        status: 'active'
      },
      raw: true
    })
    tour['title'] = tourInfor['title']
    tour['slug']=tourInfor['slug']
    tour['price'] = tourInfor['price']
    if (tourInfor['discount'])
      tour['price'] = (1 - tourInfor['discount'] / 100) * tourInfor['price']
    tour['total']=tour['price']*tour['quantity']
    
    tour['image'] = ''
    if (tourInfor['images']) {
      tourInfor['images'] = JSON.parse(tourInfor['images'])
      tour['image'] = tourInfor['images'][0]
    }

    total+=tour['total']
  }
  res.json({
    tours: tours,
    total: total
  })
}