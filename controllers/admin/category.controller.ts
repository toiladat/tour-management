import { Request,Response } from "express"
import Category from "../../models/category.models"
export const index= async(req:Request,res:Response)=>{
  const categories= await Category.findAll({
    where:{
      deleted:false,
      status:'active'
    },
    raw:true
  })
  
  res.render('admin/pages/category/index.pug',{
    pageTitle:"Danh Mục Tour",
    categories:categories
  })
}