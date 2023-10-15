import { Prisma, Product } from "@prisma/client";

import prisma from "../utils/prisma";
import { CreateColorInput, CreateProductInput, CreateSizeInput, EditColorInput, EditProductInput, EditSizeInput } from "../schema/merchant.schema";

// Product apis
export const createProduct = async (input: CreateProductInput["body"], userId: string) => {
  const product = await prisma.product.create({
    data: {
      name: input.name,
      price: input.price,
      categoryId: input.categoryId,
      sizeId: input.sizeId,
      colorId: input.colorId,
      createdById: userId,
      images: {
        createMany: {
          data: input.images.map((image) => {
            return {
              url: image.url,
            };
          }),
        },
      },
    },
    include: {
      images: true,
    },
  });

  return product;
};

export const getProductById=async(id:string)=>{
  try {
    const product = await prisma.product.findFirst({
      where:{
        id,
      }
    })
    return product
  } catch (e:any) {
    console.log(e.message)
  }
}

export const editProduct = async (
  input: EditProductInput["body"],
  userId: string,
  productId: string
) => {
  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: input.name,
      price: input.price,
      categoryId: input.categoryId,
      sizeId: input.sizeId,
      colorId: input.colorId,
      createdById: userId,
      isFeatured: input.isFeatured,
      isArchived: input.isArchived,
      images: {
        createMany: {
          data: input.images.map((image) => {
            return {
              url: image.url,
            };
          }),
        },
      },
    },
    include: {
      images: true,
    },
  });
  return product;
};
export const deleteProduct = async (
  userId: string,
  productId: string
) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  } catch (error: any) {
    throw new Error("Something went wrong" + error.message);
  }
};

export const getAllProductsByMerchant = async (merchantId: string) => {
  try {
    //check if the user exists

    const existingMerchant = await prisma.user.findFirst({
      where: {
        id: merchantId,
      },
    });

    if (!existingMerchant) {
      throw new Error("No User Found ");
    }

    const products = await prisma.product.findMany({
      where: {
        createdById: merchantId,
      },
      include: {
        images: true,
      },
    });
    return products;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {},
      include: {
        images: true,
      },
    });
    return products;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Color apis

export const createColor = async (input: CreateColorInput["body"]) => {
  try {
    const color = await prisma.color.create({
      data: {
        name: input.name,
        value: input.value,
      },
    });
    return color;
  } catch (error) {
    console.log(error);
  }
};
export const editColor = async (input: EditColorInput["body"], id: string) => {
  try {
    const color = await prisma.color.update({
      where: {
        id,
      },
      data: {
        name: input.name,
        value: input.value,
      },
    });
    return color;
  } catch (error) {
    console.log(error);
  }
};

export const deleteColor = async (id: string) => {
  try {
    const color = await prisma.color.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
};


export const getAllColor = async()=>{
  try {
    const colors = await prisma.color.findMany({})
    return colors
  } catch (error:any) {
    console.log(error.message)
  }
}



export const getColorId = async(id:string)=>{
  try {
     const color = await prisma.color.findFirst({
      where:{
        id,
      }
     });
     return color;
  } catch (error:any) {
    console.log(error.message)
  }
}

// size apis
export const createSize = async (input: CreateSizeInput["body"]) => {
  try {
    const size = await prisma.size.create({
      data: {
        name: input.name,
        value: input.value,
        categoryId: input.categoryId,
      },
    });
    return size;
  } catch (error) {
    console.log(error);
  }
};

export const getSizeId = async (id: string) => {
  try {
    const size = await prisma.size.findFirst({
      where: {
        id,
      },
    });
    return size;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const editSize = async (input: EditSizeInput["body"], id: string) => {
  try {
    const size = await prisma.size.update({
      where: {
        id,
      },
      data: {
        name: input.name,
        value: input.value,
        categoryId: input.categoryId,
      },
    });
    return size;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSize = async (id: string) => {
  try {
    const size = await prisma.size.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new error(error.messsage);
  }
};


export const getAllSize = async(categoryId:string)=>{
  try {
    const sizes = await prisma.size.findMany({
      where:{
        categoryId,
      }
    })
    return sizes
  } catch (error:any) {
    console.log(error.message)
  }
}

//get all categorie

export const getAllCategories = async(merchantId: string)=>{
  try {
    const categories = await prisma.category.findMany({
      include:{
        products: {
          where:{
            createdById: merchantId,
          },
          include:{
            images:true
          }
        }
      }
    })
    return categories
  } catch (error:any) {
    console.log(error.message)
  }
}


//TODO analytics route comes here





