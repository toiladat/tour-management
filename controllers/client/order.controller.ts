import { Request,Response } from "express"
import Order from "../../models/order.models"
import {generateOrderCode} from '../../helpers/generate.helpers'
import Tour from "../../models/tour.models"
import OrderItem from "../../models/order-item.model"
import moment from "moment"
//[POST]/order
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
  // lưu thông tin vào bảng orders_item
  for( const tour of data.cart){
    const order_item_data={
      orderId:orderId,
      tourId:tour.id,
      quantity:tour.quantity
    }

    const tourInfor= await Tour.findOne({
      where:{
        id:tour.id
      }
    })
    order_item_data['price']=tourInfor['price']
    order_item_data['discount']=tourInfor['discount']
    order_item_data['timeStart']=tourInfor['timeStart']

    await OrderItem.create(order_item_data)
    
  }

  res.json({
    message:"Đặt hàng thành công",
    code:200,
    orderCode:code
  })
}
//[GET]/orders/success
export const success=async(req:Request,res:Response)=>{
  
  //lấy thông tin order
  const orderCode=req.params.orderCode
  const order=await Order.findOne({
    where:{
      code:orderCode,
      deleted:false
    },
    raw:true
  })
  
  order['timeCreateFormat'] = moment(order['createdAt']).format('LLLL');

  //lấy thông tin tours trong order
  const orderItems=await OrderItem.findAll({
    where:{
      orderId:order['id']
    },
    raw:true
  })
  // lấy các trường còn thếu của tour
  let totalBill=0
  for(const tour of orderItems){
    const tourInfor=await Tour.findOne({
      where:{
        id:tour['tourId']
      },
      raw:true
    })
    if(tourInfor['images']){
      tourInfor['images']=JSON.parse(tourInfor['images'])
      tour['image']=tourInfor['images'][0]
    }
    tour['title']=tourInfor['title']
    tour['finalPrice']=(1-tour['discount']/100)*tour['price']
    tour['totalPrice']=tour['finalPrice']*tour['quantity']
    tour['slug']=tourInfor['slug']
    totalBill+=tour['finalPrice']
  }
  



  res.render('client/pages/order/success',{
    pageTitle:"Đặt hàng thành công",
    order:order,
    orderItems:orderItems,
    totalBill:totalBill
  })
}