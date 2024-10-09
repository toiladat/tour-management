import { Request,Response } from "express"
import Order from "../../models/order.models"
import {generateOrderCode} from '../../helpers/generate.helpers'
export const index =async(req:Request,res:Response)=>{
  const data=req.body
  //dữ liệu lưu trong bảng orders
  const dataOrders={
    code:"",
    fullName:data.infor.fullName,
    phone:data.infor.phone,
    note:data.infor.note,
    status:'initial'
  }
  const order= await Order.create(dataOrders);

  // cập nhật trường code cho bản ghi
  let orderId= order.dataValues.id;
  const code=generateOrderCode(orderId)
  
  await Order.update({
    code:code
  },{
    where:{
      id:orderId
    }
  })

  res.json({
    message:"Đặt hàng thành công",
    code:200,
    orderCode:code
  })
}