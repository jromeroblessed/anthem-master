import React, {useEffect, useContext, useState} from 'react'
import HymnalContext from '../context/Hymnal/HymnalContext'
import {categ, hymnal} from "../resources/himn";

const HymnalList = () => {

  const { getHymnal, getAnthem} = useContext(HymnalContext);
  const [textSize, setTextSize] = useState(18);
  const [Himnal, setHimnal] = useState(hymnal);
  const [search, setsearch] = useState(''); 

  useEffect(()=> { 
    if(!!search){    
      setHimnal(hymnal.filter(
        (coin) => 
          coin.title.toLowerCase().includes(search) ||
          coin.id.toString().includes(search) ||
          coin.anthem.toLowerCase().includes(search) 
      ));
    }else{
      setHimnal(hymnal)
    }
  },[search])

  useEffect(()=> {     
    getHymnal();    
  },[])

  const fill = (arr) => {   
    setHimnal(hymnal.filter(
      (coin) =>    
      arr.some(x => x === coin.id)
    ));
  }

  return (
    <>
    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
      Ver Categorías
    </button>
    <div className="form-floating mb-3">
      <input className="form-control" id="myInput" type="text" onChange={text => setsearch(text.target.value)} placeholder="Search.."/>
      <label htmlFor="floatingInput">Buscar por número de himno o título</label>
    </div>
    <div className='list-group h-100'>
      {
        Himnal.map(hymnal => (
          <div className="accordion" id={"accordion"+hymnal.id} key={hymnal.id}>
            <div className="accordion-item">
              <h2 className="accordion-header" id={"heading"+hymnal.id}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+hymnal.id} aria-expanded="false" aria-controls={"collapse"+hymnal.id}>
                  <h3 width='70'>{hymnal.title}</h3>
                </button>
              </h2>
              <div id={"collapse"+hymnal.id} className="accordion-collapse collapse" aria-labelledby={"heading"+hymnal.id} data-bs-parent={"accordion"+hymnal.id} >
                <div className="accordion-body  p-0 m-0">
                <label className="form-label">Tamaño de Letra</label>
                <input type="range" className="form-range" min="14" max="28" onChange={e => setTextSize(+e.target.value)} id="customRange2" value={textSize} />
                  <a 
                      className='list-group-item list-group-item-action text-center' 
                      href="#!" 
                      onClick={() => getAnthem(hymnal.id)}
                      >             
                      <pre className='h5'>
                        <em style={{fontSize: textSize}}>
                          {hymnal.anthem}
                        </em>
                      </pre>
                  </a> 
                </div>
              </div>
            </div>
          </div>          
        ))
      }
    </div>
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Himnos por categoría</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">        
        <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => setHimnal(hymnal)}>
            Todos
            <span className="badge bg-primary rounded-pill">{hymnal.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.sat)}>
            Sábado
            <span className="badge bg-primary rounded-pill">{categ.sat.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.bau)}>
            Miembros
            <span className="badge bg-primary rounded-pill">{categ.bau.length}</span>
          </li>          
        </ul>
      </div>
    </div>
    </>
  )
}

export default HymnalList