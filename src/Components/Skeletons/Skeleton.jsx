import './skeleton.css'
import React from 'react'

const Skeleton = ({classes}) => {
    const classNames=`skeleton ${classes} animate-pulse`
  return (
    <div className={classNames}> 

    </div>
  )
}

export default Skeleton