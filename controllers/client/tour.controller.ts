import { Request,Response } from "express"
//[GET] /tours
export const index=async(req:Request,res:Response)=>{
  res.render('client/pages/tours/index.pug',{
    pageTitle:"Danh sách tours du lịch"
  })
}