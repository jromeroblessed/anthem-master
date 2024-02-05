import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const SelectedHymn = ({ selectedHymn }) => {
  const isVideo = [6,196,256].includes(selectedHymn.id);
  const fileExtension = isVideo ? '.mp4' : '.mp3';

  const [textSize, setTextSize] = useState(18);
  // Asegurar que selectedHymn.track sea un string
  const trackNumber = String(selectedHymn.id);

  // Añadir ceros al principio según la longitud actual
  const paddedTrack = trackNumber.padStart(3, '0');
  console.log(paddedTrack + ' --- '+ fileExtension)
  return (
    <div
      className='modal fade'
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-fullscreen'>
        <div className='modal-content'>
          <div className='modal-body'>
            {selectedHymn ? (
              <div className='text-center'>
                <input
                  type='range'
                  className='form-range'
                  min='14'
                  max='28'
                  onChange={(e) => setTextSize(+e.target.value)}
                  id='customRange2'
                  value={textSize}
                />
                <pre>
                  <em style={{ fontSize: textSize }}>{selectedHymn.anthem}</em>
                </pre>
                { selectedHymn.track && (
                <div className='row'>
                  <div className='form-group col-md-6'>
                    <label className='lbl'>Pista</label>
                    <div className='player-wrapper'>
                      <ReactPlayer
                        className='react-player'
                        url={`https://github.com/jromeroblessed/anthem-master/raw/master/src/resources/himnos/${paddedTrack}P${fileExtension}`}
                        controls
                        light
                        style={{ maxHeight: '60px' }}
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
                        url={[
                          {
                            src: `https://github.com/jromeroblessed/anthem-master/raw/master/src/resources/himnos/${paddedTrack}C${fileExtension}`,
                            type: 'audio/mp3',
                            default: true,
                          },
                        ]}
                        controls
                        light
                        width='100%'
                        height='100%'
                        preload='none'
                        style={{ maxHeight: '60px' }}
                      />
                    </div>
                  </div>
                </div>
                )}
              </div>
            ) : (
              <h2>No anthem selected</h2>
            )}
          </div>
          <div className='w-100 position-fixed bottom-0'>          
            <button type='button' className='btn float-end btn-dark m-2 mx-4' data-bs-dismiss='modal'>            
            <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedHymn;
