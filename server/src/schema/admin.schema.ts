import * as z from "zod"


export const categorySchema = {
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  }),
};


export const categoryParams={
 params:z.object({
  categoryId:z.string({
   required_error:"CategoryId is required"
  })
 })
}

export const createCategorySchema = z.object({
 ...categorySchema
})
export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>["body"]


export const editCategorySchema = z.object({
 ...categoryParams,
 ...categorySchema
})

export type EditCategoryInput = z.TypeOf<typeof editCategorySchema>;


export const getDeleteCategoryByIdSchema = z.object({
 ...categoryParams
})

export type GetDeleteCategoryInput = z.TypeOf<typeof getDeleteCategoryByIdSchema>["params"];



export const bannerSchema = {
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string(),
    url: z.string({
      required_error: "URL is required",
    }),
    categoryId:z.string().optional()
  }),
};

export const bannerParams = {
  params: z.object({
    bannerId: z.string({
      required_error: "BannerId is required",
    }),
  }),
};

export const createBannerSchema = z.object({
  ...bannerSchema,
});

export type CreateBannerInput = z.TypeOf<typeof createBannerSchema>["body"];

export const editBannerSchema = z.object({
  ...bannerParams,
  ...bannerSchema,
});

export type EditBannerInput = z.TypeOf<typeof editBannerSchema>;

export const getDeleteBannerByIdSchema = z.object({
  ...bannerParams,
});


export type GetDeleteBannerInput = z.TypeOf<
  typeof getDeleteBannerByIdSchema
>["params"];



export const getBannerByCategorySchema = z.object({
  params:z.object({
    categoryId: z.string({
      required_error: "CatoryId is Required"
    })
  })
})

export type GetBannerByCategoryId = z.TypeOf<typeof getBannerByCategorySchema>["params"]
