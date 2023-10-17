import express from "express";
import validateResource from "../middleware/validateResrouce";

import requireMerchant from "../middleware/requireMerchant";
import { colorSchema, createColorSchema, createProductSchema, createSizeSchema, editColorSchema, editProductSchema, editSizeSchema, getAllSizesSchema, getOrDeleteColorByIdSchema, getOrDeleteSizeSchema, getorDeleteProductByIdSchema, productSchema, sizeSchema } from "../schema/merchant.schema";
import {
  createProductHandler,
  deleteProductHandler,
  editProductHandler,
  getAllProductsHandler,
  getProductHandler,
  editColorHandler,
  getAllColorsHandler,
  getColorHandler,
  deleteColorHandler,
  createSizeHandler,
  editSizeHandler,
  getAllSizesHandler,
  getAllCategoriesHandler,
} from "../controllers/merchant.controllers";

const router = express.Router();

//createProductH
router.post(
  "/product",
  [requireMerchant, validateResource(createProductSchema)],
  createProductHandler
);

//edit product
router.put(
  "/product/:productId",
  [requireMerchant, validateResource(editProductSchema)],
  editProductHandler
);

// delete Product
router.delete(
  "/product/:productId",
  [requireMerchant, validateResource(getorDeleteProductByIdSchema)],
  deleteProductHandler
);

//get product by id
router.get(
  "/product/:productId",
  [requireMerchant, validateResource(getorDeleteProductByIdSchema)],
  getProductHandler
);

// getAll product
router.get("/product", [requireMerchant], getAllProductsHandler);




// add colors
router.post(
  "/color",
  [requireMerchant, validateResource(createColorSchema)],
  createProductHandler
);
// edit colors
router.put(
  "/color/:colorId",
  [requireMerchant, validateResource(editColorSchema)],
  editColorHandler
);

// get all color
router.get(
  "/color",
  [requireMerchant],
  getAllColorsHandler
);

//get color by id
router.get(
  "/color/:colorId",
  [requireMerchant, validateResource(getOrDeleteColorByIdSchema)],
  getColorHandler
);

// delete color
router.delete(
  "/color/:colorId",
  [requireMerchant, validateResource(getOrDeleteColorByIdSchema)],
  deleteColorHandler
);



// create size
router.post(
  "/size",
  [requireMerchant, validateResource(createSizeSchema)],
  createSizeHandler
);

router.put(
  "/size/:sizeId",
  [requireMerchant, validateResource(editSizeSchema)],
  editSizeHandler
);
router.get(
  "/size",
  [requireMerchant, validateResource(getOrDeleteSizeSchema)],
  editSizeHandler
);
router.delete(
  "/size/:sizeId",
  [requireMerchant, validateResource(getOrDeleteSizeSchema)],
  editSizeHandler
);


router.get("/size", [requireMerchant, validateResource(getAllSizesSchema)],getAllSizesHandler)


router.get("/category",[requireMerchant],getAllCategoriesHandler)



export default router;
