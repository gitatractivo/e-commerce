import { apiRoute } from '@/utils/apiRoutes'
import axios from 'axios'
import { cookies } from 'next/headers'
import SizeClient from './components/client'

type Props = {}

const Banner = async(props: Props) => {
  const cookieStore = cookies();
  
  console.log(apiRoute.size,"fff")
  
  const res = await axios.get(`${apiRoute.size}`, {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  // const incomingCookie  = res.headers['set-cookie']
  const data = await res.data.sizes
  // console.log(res.data)


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4  pt-6">
        <SizeClient data={data} />
      </div>
    </div>
  );
}

export default Banner