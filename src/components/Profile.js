import React, {useContext, useState} from 'react'
import HymnalContext from '../context/Hymnal/HymnalContext'
import ReactPlayer from 'react-player'

const Profile = () => {
  const {selectedAnthem} = useContext(HymnalContext)
  const [textSize, setTextSize] = useState(18);
  return (
    <>
      {selectedAnthem ? (<div className='text-center'>       
        <input type="range" className="form-range" min="14" max="28" onChange={e => setTextSize(+e.target.value)} id="customRange2" value={textSize} />                        
        <pre>
          <em style={{fontSize: textSize}}>
            {selectedAnthem.anthem}
          </em>
        </pre>
        <div className='row'>
        <div className='form-group col-md-6'>
        <label className='lbl'>Pista</label>      
        <div className='player-wrapper'>
          <ReactPlayer 
          className='react-player'
          url={`https://drive.google.com/uc?alt=media&id=${selectedAnthem.track}`} 
          controls
          light  
          style={{maxHeight:'60px'}}
          width='100%'
          height='100%'
          />
        </div>
        </div>
        <div className='form-group col-md-6'>
        <label className='lbl'>Cantada</label>
        <div className='player-wrapper'>
          <ReactPlayer 
          className='react-player'
          url={[{src:`https://drive.google.com/uc?alt=media&id=${selectedAnthem.demo}`,type:'audio/mp3',default: true}]} 
          controls    
          light 
                
          width='100%'
          height='100%'
          preload="none"
          style={{maxHeight:'60px'}}
          />
        </div>
        </div>
        </div>
      </div>):
      (<h2>No anthem selected</h2>)}
    </>
   
  )
}

export default Profile
