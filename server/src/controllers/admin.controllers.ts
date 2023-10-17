import { Response, Request } from "express";
import {
  CreateBannerInput,
  CreateCategoryInput,
  EditBannerInput,
  EditCategoryInput,
  GetBannerByCategoryId,
  GetDeleteBannerInput,
  GetDeleteCategoryInput,
} from "../schema/admin.schema";
import { User } from "@prisma/client";
import {
  createBanner,
  createCategory,
  deleteBannerById,
  deleteCategoryById,
  editBanner,
  editCategory,
  getAllBanners,
  getAllBannersByCategoryId,
  getBannerById,
  getCategoryById,
} from "../service/admin.service";

export const createCategoryHandler = async (
  req: Request<{}, {}, CreateCategoryInput>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;

    const category = await createCategory(req.body);
    return res.status(201).json({
      message: "Category Created Successfully",
      category,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const editCategoryHandler = async (
  req: Request<EditCategoryInput["params"], {}, EditCategoryInput["body"]>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;
    const category = await editCategory(req.body, req.params.categoryId);
    return res.status(200).json({
      message: "Category Edited Successfully",
      category,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getCategoryHandler = async (
  req: Request<GetDeleteCategoryInput, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;
    const category = await getCategoryById(req.params.categoryId);
    return res.status(200).json({
      message: "Category Fetched Successfully",
      category,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCategoryHandler = async (
  req: Request<GetDeleteCategoryInput, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;
    const category = await deleteCategoryById(req.params.categoryId);
    return res.status(200).json({
      message: "Category Deleted Successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createBannerHandler = async (
  req: Request<{}, {}, CreateBannerInput>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;

    const banner = await createBanner(req.body);
    return res.status(201).json({
      message: "Banner Created Successfully",
      banner,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const editBannerHandler = async (
  req: Request<EditBannerInput["params"], {}, EditBannerInput["body"]>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;

    const banner = await editBanner(req.body, req.params.bannerId);
    return res.status(200).json({
      message: "Banner Edited Successfully",
      banner,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getBannerByIdHandler = async (
  req: Request<GetDeleteBannerInput, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;
    const banner = await getBannerById(req.params.bannerId);
    return res.status(200).json({
      message: "Banner Fetched Successfully",
      banner,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteBannerHandler = async (
  req: Request<GetDeleteBannerInput, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;
    const banner = await deleteBannerById( req.params.bannerId);
    return res.status(200).json({
      message: "Banner Deleted Successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const getAllBannersHandler = async(
  req: Request<{}, {}, {}>,
  res: Response
)=>{
  try {
    const user: User = res.locals.user;
    const banners = await getAllBanners();
    return res.status(200).json({
      message: "Banners Fetched Successfully",
      banners,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}


export const getAllBannersByCategoryIdHandler = async (
  req: Request<GetBannerByCategoryId, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;
    const banners = await getAllBannersByCategoryId(req.params.categoryId);
    return res.status(200).json({
      message: "Banners Fetched Successfully",
      banners,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};