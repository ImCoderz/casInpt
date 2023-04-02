import Skeleton from './Skeleton'

const SkeletonEventCard = () => {
  return (
    <div className='lg:w-[870px] md1:w-[700px] w-[370px] rounded-3xl bg-blue3color relative flex flex-col justify-center items-center gap-1 px-1 py-1'>
        <Skeleton classes="title width-50"/>
        <div className='flex md1:flex-row flex-col  gap-3 w-full justify-center '>
            <div className=' rounded-xl md1:w-[50%] w-full h-[200px]'>
                <Skeleton classes="w-full h-full"/>
            </div>
            <div className=' rounded-xl md1:w-[50%] w-full h-[200px]'>
                <Skeleton classes="w-full h-full"/>
            </div>
        </div>
        <div className='w-full self-start mt-2 px-2  '>
            <Skeleton classes="title width-100"/>
        </div>
    </div>
  )
}

export default SkeletonEventCard