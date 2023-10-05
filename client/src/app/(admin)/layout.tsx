import React from 'react'

interface Props  {
    children: React.ReactNode;
}

const layout = ({children}: Props) => {
  return (
    <div className="p-24">
        <h1>hello this is layout</h1>
        {children}</div>
  )
}

export default layout