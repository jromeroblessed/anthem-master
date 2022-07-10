import React, {useEffect, useContext, useState} from 'react'
import HymnalContext from '../context/Hymnal/HymnalContext'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import {categ, hymnal,motto,DOCTRINA_FUNDAMENTAL,HISTORIA} from "../resources/himn";
import manual from '../resources/ManualProvicional.pdf';
//import regla from '../resources/ReglamentoOperativo.pdf';
import Profile from './Profile'

const HymnalList = () => {

  const { getHymnal, getAnthem} = useContext(HymnalContext);
  const [textSize, setTextSize] = useState(18);
  const [Himnal, setHimnal] = useState(hymnal);
  const [search, setsearch] = useState(''); 
  const [reading, setReadin] = useState(''); 
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [doc, setDocument] = useState(null);

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet){
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack(){
    changePage(-1)
  }

  function changePageNext(){
    changePage(+1)
  }

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
    setsearch('')
    setHimnal(hymnal.filter(
      (coin) =>    
      arr.some(x => x === coin.id)
    ));
  }

  return (
    <>
    <div className="btn-group" role="group" aria-label="Basic example">
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Ver Categorías
      </button>
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasReading" aria-controls="offcanvasReading">
        Ver Lemas y Otros
      </button>
    </div>
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
                      data-bs-toggle="modal" data-bs-target="#staticBackdrop"
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
            TODOS
            <span className="badge bg-primary rounded-pill">{hymnal.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.AVIVAMIENTO)}>
            AVIVAMIENTO
            <span className="badge bg-primary rounded-pill">{categ.AVIVAMIENTO.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.ALABANZAS)}>
            ALABANZAS
            <span className="badge bg-primary rounded-pill">{categ.ALABANZAS.length}</span>
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.AMONESTACION)}>
          AMONESTACION
            <span className="badge bg-primary rounded-pill">{categ.AMONESTACION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.BAUTISMO)}>
          BAUTISMO
            <span className="badge bg-primary rounded-pill">{categ.BAUTISMO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.BODAS)}>
          BODAS
            <span className="badge bg-primary rounded-pill">{categ.BODAS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.CONSAGRACION)}>
          CONSAGRACION
            <span className="badge bg-primary rounded-pill">{categ.CONSAGRACION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.CULTOS_DE_ESPERA)}>
          CULTOS DE ESPERA
            <span className="badge bg-primary rounded-pill">{categ.CULTOS_DE_ESPERA.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.CONSUELO)}>
          CONSUELO
            <span className="badge bg-primary rounded-pill">{categ.CONSUELO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.COROS)}>
          COROS
            <span className="badge bg-primary rounded-pill">{categ.COROS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.DIA_DE_LAS_MADRES)}>
          DIA_DE_LAS_MADRES
            <span className="badge bg-primary rounded-pill">{categ.DIA_DE_LAS_MADRES.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.DIA_DE_LA_BIBLIA)}>
          DIA_DE_LA_BIBLIA
            <span className="badge bg-primary rounded-pill">{categ.DIA_DE_LA_BIBLIA.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.DIA_DE_GRACIAS)}>
          DIA_DE_GRACIAS
            <span className="badge bg-primary rounded-pill">{categ.DIA_DE_GRACIAS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.DECISION)}>
          DECISION
            <span className="badge bg-primary rounded-pill">{categ.DECISION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.DIEZMOS)}>
          DIEZMOS
            <span className="badge bg-primary rounded-pill">{categ.DIEZMOS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.EVANGELISTICO)}>
          EVANGELISTICO
            <span className="badge bg-primary rounded-pill">{categ.EVANGELISTICO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.ENVIO_DE_OBREROS)}>
          ENVIO_DE_OBREROS
            <span className="badge bg-primary rounded-pill">{categ.ENVIO_DE_OBREROS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.ESFUERZO)}>
          ESFUERZO
            <span className="badge bg-primary rounded-pill">{categ.ESFUERZO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.EXTENSION_DE_LA_OBRA)}>
          EXTENSION_DE_LA_OBRA
            <span className="badge bg-primary rounded-pill">{categ.EXTENSION_DE_LA_OBRA.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.ESPECIALES)}>
          ESPECIALES
            <span className="badge bg-primary rounded-pill">{categ.ESPECIALES.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.FUNERAL)}>
          FUNERAL
            <span className="badge bg-primary rounded-pill">{categ.FUNERAL.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.GRATITUD)}>
          GRATITUD
            <span className="badge bg-primary rounded-pill">{categ.GRATITUD.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.HIMNO_POR_LA_NACION)}>
          HIMNO_POR_LA_NACION
            <span className="badge bg-primary rounded-pill">{categ.HIMNO_POR_LA_NACION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.JUVENTUD)}>
          JUVENTUD
            <span className="badge bg-primary rounded-pill">{categ.JUVENTUD.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.LLAMAMIENTO)}>
          LLAMAMIENTO
            <span className="badge bg-primary rounded-pill">{categ.LLAMAMIENTO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.MENSAJERO)}>
          MENSAJERO
            <span className="badge bg-primary rounded-pill">{categ.MENSAJERO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.MISIONERO)}>
          MISIONERO
            <span className="badge bg-primary rounded-pill">{categ.MISIONERO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.NINOS)}>
          NINOS
            <span className="badge bg-primary rounded-pill">{categ.NINOS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.NAVIDAD)}>
          NAVIDAD
            <span className="badge bg-primary rounded-pill">{categ.NAVIDAD.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.ORACION)}>
          ORACION
            <span className="badge bg-primary rounded-pill">{categ.ORACION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.PASION_Y_MUERTE)}>
          PASION_Y_MUERTE
            <span className="badge bg-primary rounded-pill">{categ.PASION_Y_MUERTE.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.PRUEBAS)}>
          PRUEBAS
            <span className="badge bg-primary rounded-pill">{categ.PRUEBAS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.RESURRECCION)}>
          RESURRECCION
            <span className="badge bg-primary rounded-pill">{categ.RESURRECCION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.RECONCILIACION)}>
          RECONCILIACION
            <span className="badge bg-primary rounded-pill">{categ.RECONCILIACION.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.SANIDAD_DIVINA)}>
          SANIDAD_DIVINA
            <span className="badge bg-primary rounded-pill">{categ.SANIDAD_DIVINA.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.SABADO)}>
          SABADO
            <span className="badge bg-primary rounded-pill">{categ.SABADO.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.SANTA_CENA)}>
          SANTA_CENA
            <span className="badge bg-primary rounded-pill">{categ.SANTA_CENA.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.SOLDADOS_Y_DISCIPULOS)}>
          SOLDADOS_Y_DISCIPULOS
            <span className="badge bg-primary rounded-pill">{categ.SOLDADOS_Y_DISCIPULOS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.SOLOS)}>
          SOLOS
            <span className="badge bg-primary rounded-pill">{categ.SOLOS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.TESTIMONIOS)}>
          TESTIMONIOS
            <span className="badge bg-primary rounded-pill">{categ.TESTIMONIOS.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.UNIDAD)}>
          UNIDAD
            <span className="badge bg-primary rounded-pill">{categ.UNIDAD.length}</span>
          </li>  
          <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => fill(categ.VOTOS)}>
          VOTOS
            <span className="badge bg-primary rounded-pill">{categ.VOTOS.length}</span>
          </li>                     
        </ul>
      </div>
    </div>
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasReading" aria-labelledby="offcanvasReadingLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasReadingLabel">Himnos por categoría</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <h4>Lemas</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.PRIMERA_PARTE)}>
          PRIMERA_PARTE           
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.SEGUNDA_PARTE)}>
          SEGUNDA_PARTE            
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.TERCERA_PARTE)}>
          TERCERA_PARTE            
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.CUARTA_PARTE)}>
          CUARTA_PARTE            
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.QUINTA_PARTE)}>
          QUINTA_PARTE            
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.SEXTA_PARTE)}>
          SEXTA_PARTE            
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.SEPTIMA_PARTE)}>
          SEPTIMA_PARTE            
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.OCTAVA_PARTE)}>
          OCTAVA_PARTE            
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(motto.NOVENA_PARTE)}>
          NOVENA_PARTE            
          </li>
        </ul>
        <h4>Doctrina e Historia</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(DOCTRINA_FUNDAMENTAL)}>
          DOCTRINA FUNDAMENTAL           
          </li> 
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticReading" onClick={() => setReadin(HISTORIA)}>
          HISTORIA           
          </li>          
        </ul>
        <h4>Manual</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticPDF" onClick={() => setDocument(manual)}>
          MANUAL PROVISIONAL
          </li>                   
        </ul>
        <h4>Libros</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#staticPDF" onClick={() => setDocument(manual)}>
          Familia
          </li>
        </ul>
      </div>
    </div>
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen-xxl-down">
        <div className="modal-content">          
          <div className="modal-body">
          <Profile/> 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>            
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="staticPDF" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticPDFLabel" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen-xxl-down">
        <div className="modal-content">          
          <div className="modal-body p-0 m-0">
          <center>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            {pageNumber> 1 &&
              <button onClick={changePageBack}>Previous Page</button>
            }
            {
              pageNumber < numPages &&
              <button onClick={changePageNext}>Next Page</button>
            } 
            <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document> 
            <p>
              Page {pageNumber} of {numPages}
            </p>
            {pageNumber> 1 &&
              <button onClick={changePageBack}>Previous Page</button>
            }
            {
              pageNumber < numPages &&
              <button onClick={changePageNext}>Next Page</button>
            }            
          </center>         
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>            
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="staticReading" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticReadingLabel" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen-xxl-down">
        <div className="modal-content">
          <div className="modal-body">
          <input type="range" className="form-range" min="14" max="28" onChange={e => setTextSize(+e.target.value)} id="customRange2" value={textSize} />
            <pre className='h5'>
              <em style={{fontSize: textSize}}>
                {reading}
              </em>
            </pre>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>            
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HymnalList