import React, { useEffect, useState } from 'react';
import { hymnal } from '../resources/himn';

function Lists({}) {
  const [search, setsearch] = useState('');
  const [Himnal, setHimnal] = useState(hymnal);
  const [textSize, setTextSize] = useState(18);

  useEffect(() => {
    if (!!search) {
      setHimnal(
        hymnal.filter(
          (coin) =>
            coin.title.includes(search.toUpperCase()) ||
            coin.id.toString().includes(search) ||
            coin.anthem.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setHimnal(hymnal);
    }
  }, [search]);

  return (
    <>
      <div className='form-floating mb-3' style={{ zIndex: 1000, position: 'sticky', top: 0 }}>
        <input
          className='form-control'
          id='myInput'
          type='text'
          onChange={(text) => setsearch(text.target.value)}
          placeholder='Search..'
        />
        <label htmlFor='floatingInput'>
          <i className='bi bi-search'></i> Buscar por número de himno o título
        </label>
      </div>
      <div className='list-group h-100'>
        {Himnal.map((hymnal) => (
          <div className='accordion' id={'accordion' + hymnal.id} key={hymnal.id}>
            <div className='accordion-item'>
              <h2 className='accordion-header' id={'heading' + hymnal.id}>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={'#collapse' + hymnal.id}
                  aria-expanded='false'
                  aria-controls={'collapse' + hymnal.id}>
                  <h3 width='70'>{hymnal.title}</h3>
                </button>
              </h2>
              <div
                id={'collapse' + hymnal.id}
                className='accordion-collapse collapse'
                aria-labelledby={'heading' + hymnal.id}
                data-bs-parent={'accordion' + hymnal.id}>
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
                    href='#!'>
                    <pre className='h5'>
                      <em style={{ fontSize: textSize }}>{hymnal.anthem}</em>
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
