import React from 'react'
import BillboardClient from './components/client'
import axios from 'axios'
import { apiRoute } from '@/utils/apiRoutes'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

type Props = {}

const Banner = async(props: Props) => {
  const cookieStore = cookies();
  
  
  const res = await axios.get(`${apiRoute.banner}`, {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  // const incomingCookie  = res.headers['set-cookie']
  const data = await res.data
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4  pt-6">
        <BillboardClient data={data.banners}/>
      </div>
    </div>
  )
}

export default Banner