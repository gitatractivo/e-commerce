import exp from "constants";
import {
  CreateBannerInput,
  CreateCategoryInput,
  EditBannerInput,
  EditCategoryInput,
} from "../schema/admin.schema";
import prisma from "../utils/prisma";
import log from "../utils/logger";
import { Prisma,Banner } from "@prisma/client";

// crud on category
export const createCategory = async (data: CreateCategoryInput) => {
  try {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      throw new Error(
        "Category already exists by name: " + existingCategory.name
      );
    }

    const category = await prisma.category.create({
      data,
    });
    return category;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};

export const editCategory = async (
  data: EditCategoryInput["body"],
  categoryId: EditCategoryInput["params"]["categoryId"]
) => {
  console.log("service", data, categoryId)
  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
    return category;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
      include: {
        products: {
          select: {
            images: true,
          },
          take: 5,
        },
        _count:{
          select:{
            products:true
          }
        }
      },
    });
    return category;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};
export const deleteCategoryById = async (id: string) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    return category;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};

export const getAllCategories = async () => { 
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select:{
            products:true
          }
        },
      },
    });
    return categories;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}




// crud on banner

export const createBanner = async (data: CreateBannerInput) => {
  
  try {
    const banner = await prisma.banner.create({
      data,
    });
    return banner;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};

export const editBanner = async (
  data: EditBannerInput["body"],
  bannerId: string
) => {
  try {
    console.log("edit banner data",data)
    const banner = await prisma.banner.update({
      where: {
        id: bannerId,
      },
      data,
    });
    return banner;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};

export const getBannerById = async (bannerId: string) => {
  try {
    const banner = await prisma.banner.findFirst({
      where: {
        id: bannerId,
      },
    });
    return banner;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};

export const deleteBannerById = async (bannerId: string) => {
  console.log("service",bannerId)
  try {
    const banner = await prisma.banner.delete({
      where: {
        id: bannerId,
      },
    });
    return banner;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
};


export const getAllBanners = async()=>{
  // TODO: check this
  try {


   const banner = await prisma.banner.findMany({
    where:{
      categoryId:(undefined||null)
    }
   })
   return banner;

  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}


export const getAllBannersByCategoryId = async(categoryId:string)=>{
  // TODO: check this
  try {


   const banner = await prisma.banner.findMany({
    where:{
      categoryId
    }
   })
   return banner
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}


export const getProducts = async(where:Prisma.ProductWhereInput)=>{
  try {
    const products = await prisma.product.findMany({
      where
    })
    return products
  } catch (error:any) {
    log.error(error);
    throw new Error(error.message as string);
  }
}



// crud on products by both categoryId and normal all

// crud on all the orders
