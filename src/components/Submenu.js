import React from 'react';

function Submenu({setTypeHimnal}) {
  return (
    <div className='btn-group w-100 mb-1' role='group' aria-label='Basic radio toggle button group'>     
      <input type='radio' className='btn-check' onChange={setTypeHimnal} name='btnhimnal' id='normal' />
      <label className='btn btn-outline-dark border-0 fw-bold' htmlFor='normal'>
        Normal
      </label>

      <input type='radio' className='btn-check' onChange={setTypeHimnal} name='btnhimnal' id='special' />
      <label className='btn btn-outline-dark border-0 fw-bold' htmlFor='special'>
        Especial
      </label>

      <input type='radio' className='btn-check' onChange={setTypeHimnal} name='btnhimnal' id='worship' />
      <label className='btn btn-outline-dark border-0 fw-bold' htmlFor='worship'>
        Adoración
      </label>

      <input type='radio' className='btn-check' onChange={setTypeHimnal} name='btnhimnal' id='chorus' />
      <label className='btn btn-outline-dark border-0 fw-bold' htmlFor='chorus'>
        Coritos
      </label>
    </div>
  );
}

export default Submenu;
