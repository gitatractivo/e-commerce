import exp from "constants";
import {
  CreateBannerInput,
  CreateCategoryInput,
  EditBannerInput,
  EditCategoryInput,
} from "../schema/admin.schema";
import prisma from "../utils/prisma";
import log from "../utils/logger";

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
      select: {
        products: {
          select: {
            images: true,
          },
          take: 5,
        },
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



// crud on products by both categoryId and normal all

// crud on all the orders
