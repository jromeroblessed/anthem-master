import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const SelectedHymn = ({ selectedHimnal }) => {
  const [textSize, setTextSize] = useState(18);
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
            {selectedHimnal ? (
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
                  <em style={{ fontSize: textSize }}>{selectedHimnal.anthem}</em>
                </pre>
                { selectedHimnal.track && (
                <div className='row'>
                  <div className='form-group col-md-6'>
                    <label className='lbl'>Pista</label>
                    <div className='player-wrapper'>
                      <ReactPlayer
                        className='react-player'
                        url={`https://drive.google.com/uc?alt=media&id=${selectedHimnal.track}`}
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
                            src: `https://drive.google.com/uc?alt=media&id=${selectedHimnal.demo}`,
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
