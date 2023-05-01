import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { hymnal, motto, DOCTRINA_FUNDAMENTAL, HISTORIA, pages, newT } from '../resources/himn';
import manual from '../resources/ManualProvicional.pdf';
import familia from '../resources/familia.pdf';
import biografia from '../resources/biografia.pdf';
import fe from '../resources/fe.pdf';
import liderazgo from '../resources/liderazgo.pdf';
import lohizo from '../resources/LoHizo.pdf';
import sermon from '../resources/sermon.pdf';
import vence from '../resources/vence.pdf';
import mesa from '../resources/Mesa_de_Fe.pdf';
//import regla from '../resources/ReglamentoOperativo.pdf';
import SelectedHymn from './SelectedHymn';
import Canvas from './Canvas';
import Lists from './Lists';
import { adoracion } from '../resources/ADORACION';
import { coritos } from '../resources/CORITOS';
import { especiales } from '../resources/ESPECIALES';
import Submenu from './Submenu';
import Search from './Search';

const HymnalList = () => {
  const [normalHymnal] = useLocalStorage('normal', hymnal);
  const [chorusHymnal] = useLocalStorage('coritos', coritos);
  const [worshipHymnal] = useLocalStorage('adoracion', adoracion);
  const [specialHymnal] = useLocalStorage('especial', especiales);
  const [Himnal, setHimnal] = useState([]);
  const [viewCateg, setViewCateg] = useState(true);
  
  const [textSize, setTextSize] = useState(18);
  const [selectedHimnal, setSelectedHimnal] = useState({});  
  const [search, setSearch] = useState('');
  const [reading, setReadin] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [doc, setDocument] = useState(null);

  const dayOfYear = () => {
    let date = new Date();
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  };
  
  const setTypeHimnal = (e) => {
    const { id } = e.target;
    setSearch(''); 
    setHimnal(id === 'special' ? specialHymnal : 
              id === 'worship' ? worshipHymnal : 
              id === 'chorus' ? chorusHymnal : 
              normalHymnal);
    setViewCateg(id === 'normal')
  }  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

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

  const fill = (arr) => {
    setSearch('');
    setHimnal(hymnal.filter((coin) => arr.some((x) => x === coin.id)));
  };

  return (
    <>     
      <Submenu setTypeHimnal={setTypeHimnal}/>      
      <Search setSearch={setSearch} viewCateg={viewCateg} />
      <Lists Himnal={Himnal} setSelectedHimnal={setSelectedHimnal}/>
      <Canvas fill={fill} setHimnal={setHimnal}/>
      <div
        className='offcanvas offcanvas-start'
        tabIndex='-1'
        id='offcanvasReading'
        aria-labelledby='offcanvasReadingLabel'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasReadingLabel'>
            Extras Himnario
          </h5>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'></button>
        </div>
        <div className='offcanvas-body'>
          <h4>Mesa de Fe (8MB)</h4>
          <ul className='list-group'>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => {
                setPageNumber(pages[dayOfYear().toString()]);
                setDocument(mesa);
              }}>
              DEVOCIONAL 2022
            </li>            
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(newT)}>
              ESQUEMA BÍBLICO
            </li>
          </ul>
          <h4>Lemas</h4>
          <ul className='list-group'>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.PRIMERA_PARTE)}>
              PRIMERA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.SEGUNDA_PARTE)}>
              SEGUNDA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.TERCERA_PARTE)}>
              TERCERA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.CUARTA_PARTE)}>
              CUARTA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.QUINTA_PARTE)}>
              QUINTA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.SEXTA_PARTE)}>
              SEXTA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.SEPTIMA_PARTE)}>
              SEPTIMA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.OCTAVA_PARTE)}>
              OCTAVA_PARTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(motto.NOVENA_PARTE)}>
              NOVENA_PARTE
            </li>
          </ul>
          <h4>Doctrina e Historia</h4>
          <ul className='list-group'>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(DOCTRINA_FUNDAMENTAL)}>
              DOCTRINA FUNDAMENTAL
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticReading'
              onClick={() => setReadin(HISTORIA)}>
              HISTORIA
            </li>
          </ul>
          <h4>Manual</h4>
          <ul className='list-group'>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(manual)}>
              MANUAL PROVISIONAL
            </li>
          </ul>
          <h4>Libros</h4>
          <ul className='list-group'>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(familia)}>
              LA FAMILIA CRISTIANA
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(biografia)}>
              BIOGRAFÍA DE CRISTIANOS
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(fe)}>
              FORTALECE TU FE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(liderazgo)}>
              LIDERAZGO CON PROPÓSITO
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(lohizo)}>
              LO HIZO POR TÍ
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(sermon)}>
              EL SERMÓN DEL MONTE
            </li>
            <li
              className='list-group-item d-flex justify-content-between align-items-center'
              data-bs-toggle='modal'
              data-bs-target='#staticPDF'
              onClick={() => setDocument(vence)}>
              ACTITUD DE VENCEDOR
            </li>
          </ul>
        </div>
      </div>
      <SelectedHymn selectedHimnal={selectedHimnal}/>            
      <div
        className='modal fade '
        id='staticPDF'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticPDFLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-fullscreen'>
          <div className='modal-content'>
            <div className='modal-body p-0 m-0'>
              <center>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
                {pageNumber > 1 && (
                  <button className='btn btn-secondary ' onClick={changePageBack}>
                    Previous Page
                  </button>
                )}
                {pageNumber < numPages && (
                  <button className='btn btn-secondary' onClick={changePageNext}>
                    Next Page
                  </button>
                )}
                <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
                {pageNumber > 1 && (
                  <button className='btn btn-secondary' onClick={changePageBack}>
                    Previous Page
                  </button>
                )}
                {pageNumber < numPages && (
                  <button className='btn btn-secondary' onClick={changePageNext}>
                    Next Page
                  </button>
                )}
              </center>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary btn-lg' data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='staticReading'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticReadingLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-fullscreen'>
          <div className='modal-content'>
            <div className='modal-body'>
              <input
                type='range'
                className='form-range'
                min='14'
                max='28'
                onChange={(e) => setTextSize(+e.target.value)}
                id='customRange2'
                value={textSize}
              />
              <pre className='h5'>
                <em style={{ fontSize: textSize }}>{reading}</em>
              </pre>
            </div>
            <div className='w-100 position-fixed bottom-0'>          
            <button type='button' className='btn float-end btn-secondary m-2 mx-4' data-bs-dismiss='modal'>            
            <i className="bi bi-x-lg"></i>
            </button>
          </div>
          </div>
        </div>
      </div>     
      { /* <div className="modal fade" style={{overflowY: 'hidden'}} id="biblia" role="dialog" aria-labelledby="bibliaLabel" aria-hidden="true">
        <div className="modal-header bg-dark" style={{color: 'white'}}>
          <h3 className="modal-title">Biblia y Devocionales</h3>
          <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content" style={{height:'100%',overflowY: 'hidden'}}>      
            <div className="modal-body">
              <div className="ratio ratio-16x9" style={{height:'100%', position: 'relative',overflow: 'hidden', width: '100%'}}>
                <iframe className="embed-responsive-item" title="Leamos la biblia" src="https://my.bible.com/es/reading-plans" id="video"  ></iframe>
              </div> 
            </div>
          </div>
        </div>
                </div> */ }
    </>
  );
};

export default HymnalList;
