import React, {useContext} from 'react'
import HymnalContext from '../context/Hymnal/HymnalContext'
import ReactPlayer from 'react-player'
import music from '../resources/aud.m4a'

const Profile = () => {
  const {selectedAnthem} = useContext(HymnalContext)

  return (
    <>
      {selectedAnthem ? (<div className='card card-body text-center'>
        <h2 className='card-img-top rounded-circle m-auto img-fluid' style={{width:180}}>{selectedAnthem.title}</h2>
        <h4>{selectedAnthem.anthem}</h4>        
        <div className='player-wrapper'>
          <ReactPlayer 
          className='react-player'
          url={music} 
          controls
          width='100%'
          height='100%'
          />
        </div>
      </div>):
      (<h2>No anthem selected</h2>)}
    </>
   
  )
}

export default Profile
