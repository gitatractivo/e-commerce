// "use server"

import { apiRoute } from '@/utils/apiRoutes'

import axios from 'axios'
// import { useSearchParams } from 'next/navigation'
import SizeForm from './components/SizeForm'
import { cookies } from "next/headers";

type Props = {}

const SizeId = async ({
  params
}: {
  params: { sizeId: string }
}) => {
  const cookieStore = cookies();
 
    // "use server"
    const res = await axios.get(`${apiRoute.size}/${params.sizeId}`, {
      withCredentials: true,
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    const response = await res.data.Size
   //  console.log(response)
     
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <SizeForm initialData={response} />
      </div>
    </div>
  );
}

export default SizeId