import React, { forwardRef } from 'react'

const MyInput = forwardRef (function MyInput({title,textcolor,bg,type,p},ref){
  return (
    <div className='flex  flex-col sm:flex-row   sm:gap-7 gap-2 w-full'>
        <h3 className={`text-lg font-bold ${textcolor}  sm:w-[32%] flex-1 sm:flex-none`}>{title}</h3>
        <input required ref={ref} type={type} className={`flex-1 ${bg} ${p?'py-2':'py-3'} rounded-xl outline-1 outline-blue1color text-blue2color  px-2`}/>
    </div>
  )
})

export default MyInput