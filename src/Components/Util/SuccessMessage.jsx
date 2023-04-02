import React from 'react'

const SuccessMessage = ({success}) => {
  return (
    <>
        {success&&(
            <h2 className='text-sm font-bold text-green-900'>{success}</h2>
        )}
    </>
  )
}

export default SuccessMessage