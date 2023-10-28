// "use server"

import { apiRoute } from '@/utils/apiRoutes'

import axios from 'axios'
// import { useSearchParams } from 'next/navigation'
import ColorForm from './components/ColorForm'
import { cookies } from "next/headers";

type Props = {}

const ColorId = async ({
  params
}: {
  params: { colorId: string }
}) => {
  const cookieStore = cookies();
 
    // "use server"
    const res = await axios.get(`${apiRoute.color}/${params.colorId}`, {
      withCredentials: true,
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    const response = await res.data.Color
   //  console.log(response)
     
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <ColorForm initialData={response} />
      </div>
    </div>
  );
}

export default ColorId