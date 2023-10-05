import SignUpForm from '@/components/auth/SignUpForm'
import React from 'react'

type Props = {}

const SignUp = (props: Props) => {
  return (
    <div className="container flex justify-center items-center h-full">
      <SignUpForm />
    </div>
  );
}

export default SignUp