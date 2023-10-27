import express from "express";
import {
  createBannerHandler,
  createCategoryHandler,
  editBannerHandler,
  editCategoryHandler,
  getAllBannersByCategoryIdHandler,
  getAllBannersHandler,
  getBannerByIdHandler,
} from "../controllers/admin.controllers";
import requireAdmin from "../middleware/requireAdmin";
import validateResource from "../middleware/validateResrouce";
import {
  createBannerSchema,
  createCategorySchema,
  editBannerSchema,
  editCategorySchema,
  getBannerByCategorySchema,
  getDeleteBannerByIdSchema,
  getDeleteCategoryByIdSchema,
} from "../schema/admin.schema";
import { deleteBannerById, getCategoryById } from "../service/admin.service";
import { getAllCategories } from "../service/merchant.service";
import { getProductHandler } from "../controllers/merchant.controllers";

const router = express.Router();

// category routes

router.post(
  "/category",
  [requireAdmin, validateResource(createCategorySchema)],
  createCategoryHandler
);

router.put(
  "/category/:categoryId",
  [requireAdmin, validateResource(editCategorySchema)],
  editCategoryHandler
);

router.get(
  "/category/:categoryId",
  [requireAdmin, validateResource(getDeleteCategoryByIdSchema)],
  getCategoryById
);

router.delete(
  "/category/:categoryId",
  [requireAdmin, validateResource(getDeleteCategoryByIdSchema)],
  deleteBannerById
);

router.get("/category", [requireAdmin], getAllCategories);

// banner routes

router.post(
  "/banner",
  [requireAdmin, validateResource(createBannerSchema)],
  createBannerHandler
);

router.patch(
  "/banner/:bannerId",
  [requireAdmin, validateResource(editBannerSchema)],
  editBannerHandler
);

router.get(
  "/banner/:bannerId",
  [requireAdmin, validateResource(getDeleteBannerByIdSchema)],
  getBannerByIdHandler
);

router.delete(
  "/banner/:bannerId",
  [requireAdmin, validateResource(getDeleteBannerByIdSchema)],
  deleteBannerById
);

router.get(
  "/banner/category/:categoryId",
  [requireAdmin, validateResource(getBannerByCategorySchema)],
  getAllBannersByCategoryIdHandler
);



router.get("/banner", [requireAdmin], getAllBannersHandler);

//TODO: add where clause schema
router.get("products",[requireAdmin],
getProductHandler)

export default router;
