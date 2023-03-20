import React from 'react';
import { categ, hymnal } from '../resources/himn';

function CanvasInfo({ fill, setHimnal }) {
  const titulos = [{
    title: "Mesa de Fe (8MB)"
  }
    
  ];

  for (const key in categ) {
    titulos.push(
      <li
        key={key}
        className='list-group-item d-flex justify-content-between align-items-center'
        data-bs-dismiss='offcanvas'
        onClick={() => fill(categ[key])}>
        {key}
        <span className='badge bg-primary rounded-pill'>{categ[key].length}</span>
      </li>,
    );
  }

  return (
    <>
      <div
        className='offcanvas offcanvas-start'
        tabIndex='-1'
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
            Extras Himnario
          </h5>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'></button>
        </div>
        <div className='offcanvas-body'>
          <ul className='list-group'>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-dismiss='offcanvas'
              onClick={() => setHimnal(hymnal)}>
              TODOS
              <span className='badge bg-primary rounded-pill'>{hymnal.length}</span>
            </li>
            {titulos}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CanvasInfo;
