import { Request, Response } from "express";
import Tour from "../../models/tour.models";
import Category from "../../models/category.models";
import slugify from "slugify";
import { generateTourCode } from "../../helpers/generate.helpers";
import TourCategory from "../../models/tour-category.models";
import { systemConfig } from "../../configs/system";
// [GET] /admin/tours/
export const index = async (req: Request, res: Response) => {
  // SELECT * FROM tours WHERE deleted = false;
  const tours = await Tour.findAll({
    where: {
      deleted: false,
    },
    raw: true
  });
  tours.forEach(item => {
    if (item["images"]) {
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }
    item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
  });

  res.render("admin/pages/tour/index", {
    pageTitle: "Danh sách tour",
    tours: tours
  });
};

//[GET]/admin/tours/create
export const create = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: 'active'
    },
    raw: true
  })
  res.render('admin/pages/tour/create.pug', {
    pageTitle: "Thêm mới tour",
    categories: categories
  })
}

//[POST]/admin/tours/creat
export const creatPost = async (req: Request, res: Response) => {
  let position = await Tour.count() + 1
  if (req.body.position)
    position = parseInt(req.body.position)

  const slug = slugify(`${req.body.title}-${Date.now()}`, {
    lower: true,
    trim: true
  })

  // tao data mau
  const dataTour = {
    title: req.body.title,
    code: "",
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: position,
    status: req.body.status,
    slug: slug
  }

  // cap nhat code
  const newTour = await Tour.create(dataTour)
  const idNewTour = newTour.dataValues.id
  const code = generateTourCode(idNewTour);
  await Tour.update({
    code: code
  }, {
    where: {
      id: idNewTour
    }
  })

  // luu vao tourCategory

  const dataTourCategory = {
    tour_id: idNewTour,
    category_id: parseInt(req.body.category_id)
  }

  await TourCategory.create(dataTourCategory)


  res.redirect(`/${systemConfig.prefixAdmin}/tours`)
}