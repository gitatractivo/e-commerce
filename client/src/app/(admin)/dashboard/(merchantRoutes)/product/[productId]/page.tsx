// "use server"

import { apiRoute } from '@/utils/apiRoutes'

import axios from 'axios'
// import { useSearchParams } from 'next/navigation'
import ProductForm from './components/ProductForm'
import { cookies } from "next/headers";

type Props = {}

const ProductId = async ({
  params
}: {
  params: { productId: string }
}) => {
  const cookieStore = cookies();
 
    // "use server"
    const res = await axios.get(`${apiRoute.product}/${params.productId}`, {
      withCredentials: true,
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    const response = await res.data.products
   //  console.log(response)
     
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <ProductForm initialData={response} />
      </div>
    </div>
  );
}

export default ProductId