import React, { useState } from 'react';

function Lists({Himnal, setSelectedHymn}) { 
  
  const [textSize, setTextSize] = useState(18); 

  return (
    <>      
      <div className='list-group h-100'>
        {Himnal.map((anthem) => (
          <div className='accordion' id={'accordion' + anthem.id} key={anthem.id}>
            <div className='accordion-item'>
              <h2 className='accordion-header' id={'heading' + anthem.id}>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={'#collapse' + anthem.id}
                  aria-expanded='false'
                  aria-controls={'collapse' + anthem.id}>
                  <h3 width='70'>{anthem.title}</h3>
                </button>
              </h2>
              <div
                id={'collapse' + anthem.id}
                className='accordion-collapse collapse'
                aria-labelledby={'heading' + anthem.id}
                data-bs-parent={'accordion' + anthem.id}>
                <div className='accordion-body  p-0 m-0'>
                  <label className='form-label'>(Pista) Dar click a la Letra</label>
                  <input
                    type='range'
                    className='form-range'
                    min='14'
                    max='28'
                    onChange={(e) => setTextSize(+e.target.value)}
                    id='customRange2'
                    value={textSize}
                  />
                  <a
                    className='list-group-item list-group-item-action text-center'
                    data-bs-toggle='modal'
                    data-bs-target='#staticBackdrop'
                    onClick={() => setSelectedHymn(anthem) }
                    href='#!'>
                    <pre className='h5'>
                      <em style={{ fontSize: textSize }}>{anthem.anthem}</em>
                    </pre>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lists;
