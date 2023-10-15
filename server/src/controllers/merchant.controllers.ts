import { User } from "@prisma/client";
import { Request, Response } from "express";
import { CreateColorInput, CreateProductInput, CreateSizeInput, EditColorInput, EditProductInput, EditSizeInput, GetAllSizesInput, GetOrDeleteColorSchema, GetOrDeleteSizeInput, GetorDeleteProductByIdInput,  } from '../schema/merchant.schema';
import {
  createColor,
  createProduct,
  createSize,
  deleteProduct,
  deleteSize,
  editColor,
  editProduct,
  editSize,
  getAllCategories,
  getAllColor,
  getAllProductsByMerchant,
  getAllSize,
  getProductById,
  getSizeId
} from "../service/merchant.service";




export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const user: User = res.locals.user;

  const product = await createProduct(req.body, user.id);

  return res.status(200).send({
    message: "Product Listed Successfully..",
    product,
  });
};




export const getProductHandler = async (
  req: Request<GetorDeleteProductByIdInput["params"], {}, {}>,
  res: Response
) => {
  const user: User = res.locals.user;

  if (!user) {
    throw new Error("Bad Request");
  }
  // TODO: in this user and merchant if this product does not belong to merchant than throw error

  const product = await getProductById(req.params.productId);

  return res.status(200).json({
    message: "Product Fetched Successfully",
    product,
  });
};

export const editProductHandler = async (
  req: Request<EditProductInput["params"], {}, EditProductInput["body"]>,
  res: Response
) => {
  try {
    const productId = req.params.productId; // Access productId from req.params
    const user: User = res.locals.user;

    if (!user) {
      throw new Error("Bad Request");
    }

    const product = await editProduct(req.body, user.id, productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllProductsHandler = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;

    // TODO: user role admin or merchant separate services

    const products = await getAllProductsByMerchant(user.id);

    return res.status(201);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProductHandler = async (
  req: Request<GetorDeleteProductByIdInput["params"], {}, {}>,
  res: Response
) => {
  try {
    const productId = req.params.productId; // Access productId from req.params
    const user = res.locals.user;

    await deleteProduct(user.id, productId);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createColorHandler = async (
  req: Request<{}, {}, CreateColorInput["body"]>,
  res: Response
) => {
  try {
    const color = await createColor(req.body);

    return res.status(201).json({
      message: "Color created successfully",
      color,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getColorHandler = async (
  req: Request<GetOrDeleteColorSchema["params"], {}, {}>,
  res: Response
) => {
  const color = await getSizeId(req.params.colorId)
  return res.status(200).json({
    message:"Color Found",
    color,
  })
};

export const editColorHandler = async (
  req: Request<EditColorInput["params"], {}, EditColorInput["body"]>,
  res: Response
) => {
  try {
    const colorId = req.params.colorId;
    const color = await editColor(req.body, colorId);

    if (!color) {
      return res.status(404).json({ message: "color not found" });
    }

    return res.status(200).json({
      message: "color updated successfully",
      color,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteColorHandler = async (
  req: Request<GetOrDeleteColorSchema["params"], {}, {}>,
  res: Response
) => {
  try {
    const colorId = req.params.colorId;
    await deleteSize(colorId);

    return res.status(200).json({
      message: "Color deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllColorsHandler = async (
  req: Request<{},{},{}>,
  res:Response
)=>{
  try {
    const colors = await getAllColor()
    return res.status(201).json({
      message: "Size created successfully",
      colors,
    });
    
  } catch (error) {
    
  }
}

export const createSizeHandler = async (
  req: Request<{}, {}, CreateSizeInput["body"]>,
  res: Response
) => {
  try {
    const color = await createSize(req.body);

    return res.status(201).json({
      message: "Size created successfully",
      color,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getSizeHandler = async (
  req: Request<GetOrDeleteSizeInput["params"], {}, {}>,
  res: Response
) => {
  const size = await getSizeId(req.params.sizeId);
  return res.status(200).json({
    message: "Color Found",
    size,
  });
};

export const editSizeHandler = async (
  req: Request<EditSizeInput["params"], {}, EditSizeInput["body"]>,
  res: Response
) => {
  try {
    const sizeId = req.params.sizeId;
    const size = await editSize(req.body, sizeId);

    if (!size) {
      return res.status(404).json({ message: "Size not found" });
    }

    return res.status(200).json({
      message: "Size updated successfully",
      size,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteSizeHandler = async (
  req: Request<GetOrDeleteSizeInput["params"], {}, {}>,
  res: Response
) => {
  try {
    const sizeId = req.params.sizeId;
    await deleteSize(sizeId);

    return res.status(200).json({
      message: "Size deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllSizesHandler = async (
  req: Request<{},{},GetAllSizesInput>,
  res:Response
)=>{
  const sizes= await getAllSize(req.body.categoryId)
  return res.status(200).json({
    message:"Size Successfully Fetched",
    sizes,
  })
}



export const getAllCategoriesHandler = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const user: User = res.locals.user;

    const categories = await getAllCategories(user.id);
  } catch (error: any) {
    console.log(error.message);
  }
};
