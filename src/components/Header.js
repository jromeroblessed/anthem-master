import React, { useEffect, useContext, useState } from 'react';
import logo from '../resources/sccc.png';
import HymnalContext from '../context/Hymnal/HymnalContext';
import moment from 'moment';

export default function Header() {
  const { sunset, getSunset } = useContext(HymnalContext);
  const [hour, setHour] = useState('Requiere Ubicacion'); 
  const [info, setInfo] = useState('toast fade hide');

  const handleInfo = () => {
    if (info.indexOf('show') >= 0) {
      setInfo('toast fade hide');
    } else {
      setInfo('toast fade show');
    }
  };

  useEffect(() => {
    const locat = async () => {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          await getSunset({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        function (error) {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        },
        {
          enableHighAccuracy: true,
        },
      );
    };
    locat();
  }, []);
  useEffect(() => {
    if (!!sunset) {
      //console.log(sunset)
      setHour(moment.unix(sunset.sys.sunset).format('hh:mm:ss'));
      //setTemperature(sunset.main.temp);
      //setFeelsLike(sunset.main.feels_like);
    }
  }, [sunset]);

  return (
    <nav className='navbar navbar-dark bg-dark' role='navigation'>
      <div className='top-area'>
        <button
          type='button'
          className='btn btn-light'
          onClick={handleInfo}
          id='liveToastBtn'
          style={{top : 20,
            right : 20,
            position: 'fixed'}}
          >
          <i className='bi bi-info-circle'></i>
        </button>
        <div className='container-fluid '>
          <div className='row'>
            <div className='col-sm-2 col-md-1 text-center'>
              <img src={logo} className='fixed-middle tinyl ' alt='' />
            </div>
            <div className='col-sm-10 col-md-11' style={{top: 0,bottom: 0, margin: 'auto'}}>
              <div className='row'>
                <div className='col-sm-8 col-md-8'>
                  <center>
                    <p className='bold text-left'>
                      <b>HIMNARIO SCC COSTA RICA</b>
                    </p>
                  </center>
                </div>
                <div className='col-sm-4 col-md-4 ' id='temper'>
                  <center>
                    <div className='bold p-0'>
                      Puesta del Sol: <b className='red'>{hour}</b>
                    </div>                    
                    <div className='position-fixed top-0 end-0 p-3' style={{ zIndex: 11 }}>
                      <div id='liveToast' className={info} role='alert' aria-live='assertive' aria-atomic='true'>
                        <div className='toast-header bg-primary'>
                          <strong className='me-auto' style={{color:'#fff'}}>IGLESIA SCC IPIS</strong>
                          <button type='button' className='btn-close bg-light' onClick={handleInfo} />
                        </div>
                        <div className='toast-body' style={{color:'#141414'}}>
                          <small>
                            <div className='bold text-left pb-2 pt-0 mt-0'>
                              Ipis, Ciudadela Rodrigo Facio 350 mts, al este de la Cruz Roja
                            </div>
                          </small>
                          <small>
                            <div className='bold text-left pb-2 pt-0 mt-0'>Cel +506 8669 6523 | Tel +506 2229 4125</div>
                          </small>
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
