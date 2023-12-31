// "use server"

import { apiRoute } from '@/utils/apiRoutes'

import axios from 'axios'
// import { useSearchParams } from 'next/navigation'
import BannerForm from './components/BannerForm'
import { cookies } from "next/headers";

type Props = {}

const BannerId = async ({
  params
}: {
  params: { bannerId: string }
}) => {
  const cookieStore = cookies();
 
    // "use server"
    const res = await axios.get(`${apiRoute.banner}/${params.bannerId}`, {
      withCredentials: true,
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    const response = await res.data.banner

    const categoryRes = await axios.get(`${apiRoute.category}`, {
      withCredentials: true,
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    // const incomingCookie  = res.headers['set-cookie']
    const data = await categoryRes.data.categories;
   //  console.log(response)
     
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <BannerForm initialData={response} categories={data} />
      </div>
    </div>
  );
}

export default BannerId