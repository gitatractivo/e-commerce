import ForgotChangeForm from '@/components/auth/ForgotChangeForm'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="container flex justify-center items-center h-full">
      <ForgotChangeForm />
    </div>
  )
}

export default Page