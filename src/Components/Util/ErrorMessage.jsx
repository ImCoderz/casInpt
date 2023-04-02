import React from 'react'

const ErrorMessage = ({error}) => {
  return (
    <>
        {error&&(
            <h2 className='text-sm font-bold text-red-500'>{error}</h2>
        )}
    </>
  )
}

export default ErrorMessage