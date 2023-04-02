import React from 'react'
import SkeletonEventCard from '../Skeletons/SkeletonEventCard'
import EventCard from '../Card/EventCard'

const ShowEvents = ({loading,events,setRemoved,images}) => {
  return (
    <>
        {
        loading?(
            <>
            <SkeletonEventCard/>
            <SkeletonEventCard/>
            <SkeletonEventCard/>
            </>
        )
        :(
            events?.map((event)=>(
            <EventCard setRemoved={setRemoved} key={event.id} id={event.id} dateEnd={event.dateEnd} dateStart={event.dateStart} description={event.description} name={event.name} destination={event.destination} photoURL={images?.get(event.name)}/>
            ))
        )
        }    
    </>
  )
}

export default ShowEvents