import React from 'react'
import ForgotForm from '@/components/auth/ForgotForm';
type Props = {}

const Page = (props: Props) => {
  return (
    <div className="container flex justify-center items-center h-full">
      <ForgotForm />
    </div>
  );
}

export default Page