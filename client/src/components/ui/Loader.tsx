'use client'
import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import omit from 'lodash/omit'

interface Props extends React.HTMLAttributes<SVGSVGElement > {}

const Loader = (props: Props) => {
  const classes = cn('animate-spin  duration-500',props.className)
  props = omit(props, ['className'])
    return (
    <Loader2 className={classes} {...props}/>
  )
}

export default Loader