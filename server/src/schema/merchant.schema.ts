import * as z from "zod";


export const productSchema = {
  body: z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
  }),
};

const productParamsSchema = {
  params: z.object({
    productId: z.string({
      required_error: "product id is required",
    }),
  }),
};
const colorParamsSchema = {
  params: z.object({
    colorId: z.string({
      required_error: "color id is required",
    }),
  }),
};
const sizeParamsSchema = {
  params: z.object({
    sizeId: z.string({
      required_error: "size id is required",
    }),
  }),
};

export const colorSchema = {
  body: z.object({
    name: z.string(),
    value: z.string(),
  }),
};

export const sizeSchema = {
  body: z.object({
    name: z.string(),
    value: z.string(),
    categoryId: z.string(),
  }),
};

// Product schemas
//create Product
export const createProductSchema = z.object({
  ...productSchema,
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;

//editProduct
export const editProductSchema = z.object({
  ...productSchema,
  ...productParamsSchema,
});
export type EditProductInput = z.TypeOf<typeof editProductSchema>;

//getProduct by id
export const getorDeleteProductByIdSchema = z.object({
  ...productParamsSchema,
});
export type GetorDeleteProductByIdInput = z.TypeOf<
  typeof getorDeleteProductByIdSchema
>;

//get all products
// TODO: add this in thie url when we add merchant and user in products and category
export const getAllProductsSchema = z.object({});
export type GetAllProductInput = z.TypeOf<typeof createProductSchema>;

//create color

export const createColorSchema = z.object({
  ...colorSchema,
});

export type CreateColorInput = z.TypeOf<typeof createColorSchema>;

//editcolor
export const editColorSchema = z.object({
  ...colorSchema,
  ...colorParamsSchema,
});

export type EditColorInput = z.TypeOf<typeof editColorSchema>;

//getcolor by id
export const getOrDeleteColorByIdSchema = z.object({
  ...colorParamsSchema,
});

export type GetOrDeleteColorSchema = z.TypeOf<
  typeof getOrDeleteColorByIdSchema
>;

//get all colors TODO:

//create size

export const createSizeSchema = z.object({
  ...sizeSchema,
});

export type CreateSizeInput = z.TypeOf<typeof createSizeSchema>;

//editsize
export const editSizeSchema = z.object({
  ...sizeSchema,
  ...sizeParamsSchema,
});

export type EditSizeInput = z.TypeOf<typeof editSizeSchema>;
//getsize by id
export const getOrDeleteSizeSchema = z.object({
  ...sizeParamsSchema,
});
export type GetOrDeleteSizeInput = z.TypeOf<typeof getOrDeleteSizeSchema>;
//get all sizes

export const getAllSizesSchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: "Category Id is Required",
    }),
  }),
});
export type GetAllSizesInput = z.TypeOf<typeof getAllSizesSchema>["body"];
//delete size

export const getAllSizeByCategorySchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: "Category is required",
    }),
  }),
  ...sizeParamsSchema,
});



export const getAllCategoriesSchema = z.object({
  
})
