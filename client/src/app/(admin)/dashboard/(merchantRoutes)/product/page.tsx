import { apiRoute } from '@/utils/apiRoutes'
import axios from 'axios'
import { cookies } from 'next/headers'
import CategoryClient from './components/client'

type Props = {}

const Banner = async(props: Props) => {
  const cookieStore = cookies();
  
  
  const res = await axios.get(`${apiRoute.product}`, {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  // const incomingCookie  = res.headers['set-cookie']
  const data = await res.data.products
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4  pt-6">
        <CategoryClient data={data} />
      </div>
    </div>
  );
}

export default Banner