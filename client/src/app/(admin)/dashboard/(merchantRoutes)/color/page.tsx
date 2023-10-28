import { apiRoute } from '@/utils/apiRoutes'
import axios from 'axios'
import { cookies } from 'next/headers'
import ColorClient from './components/client'

type Props = {}

const Banner = async(props: Props) => {
  const cookieStore = cookies();
  
  
  const res = await axios.get(`${apiRoute.color}`, {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  // const incomingCookie  = res.headers['set-cookie']
  const data = await res.data.colors
  const colors = data.map((color:any)=>{
    return {
      id: color.id,
      name: color.name,
      products: color._count.products,
      createdAt: color.createdAt,
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4  pt-6">
        <ColorClient data={colors} />
      </div>
    </div>
  );
}

export default Banner