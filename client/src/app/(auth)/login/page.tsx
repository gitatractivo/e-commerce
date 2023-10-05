import LoginForm from '@/components/auth/LoginForm';
import React from 'react'



type Props = {}

const Login = (props: Props) => {
  return (
    <div className="container flex justify-center items-center h-full">
      <LoginForm />
      
    </div>
  );
}

export default Login