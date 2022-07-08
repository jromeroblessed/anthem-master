import React, {useEffect, useContext} from 'react'
import HymnalContext from '../context/Hymnal/HymnalContext'


const HymnalList = () => {

  const {hymnal, getHymnal, getAnthem} = useContext(HymnalContext)

  useEffect(()=> {
    getHymnal();
  })

  return (
    <div className='list-group h-100'>
      {
        hymnal.map(hymnal => (
          <a 
           className='list-group-item list-group-item-action d-flex flex-row justify-content-start' 
           href="#!" 
           onClick={() => getAnthem(hymnal.id)}
           key={hymnal.id}>
             <h2 className='img-fluid mr-4 rounded-circle' width='70'>{hymnal.title}</h2>
             <p>
             {`${hymnal.anthem}`}
             </p>
          </a> 
        ))
      }
    </div>
  )
}

export default HymnalList