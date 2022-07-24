import React, {useEffect, useContext, useState} from 'react'
import logo from '../resources/sccc.png';
import HymnalContext from '../context/Hymnal/HymnalContext'
import moment from 'moment';

export default function Header() {
  const { sunset, getSunset} = useContext(HymnalContext);
  const [hour, setHour] = useState('Requiere Ubicacion');
  const [feelsLike, setFeelsLike] = useState('Requiere Ubicacion');
  const [temperature, setTemperature] = useState('Wait');
  useEffect(() => {
    const locat = async () => { 
       navigator.geolocation.getCurrentPosition(
        async function (position) {          
          await getSunset({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          })           
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
    locat();    
  }, []);
  useEffect(() => {
    if(!!sunset){
      //console.log(sunset)
      setHour(moment.unix(sunset.sys.sunset).format("hh:mm:ss"));
      setTemperature(sunset.main.temp)
      setFeelsLike(sunset.main.feels_like)
    }    
  }, [sunset]);
  
  return (
    <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">          
        <div className="top-area">
            <div className="container-fluid ">
              <div className="row p-2">
                <div className="col-sm-2 col-md-1 text-center">
                  <img src={logo} className="fixed-middle tinyl " alt="" />
                </div>
                <div className="col-sm-10 col-md-11">
                  <div className="row">
                    <div className="col-sm-8 col-md-8">                
                      <center>
                        <p className="bold text-left"><b>HIMNARIO SCC COSTA RICA</b></p>
                        <small><div className="bold text-left pb-2 pt-0 mt-0">Ipis, Ciudadela Rodrigo Facio 350 mts, al este de la Cruz Roja </div></small>
                        <small><div className="bold text-left pb-2 pt-0 mt-0">Cel +506 8669 6523 | Tel +506 2229 4125</div></small>
                      </center>
                    </div>                    
                    <div className="col-sm-4 col-md-4 " id="temper">
                      <center >                        
                        <div className="bold p-0">Puesta del Sol: <b className='red'>{hour}</b></div>
                        <div className="bold p-0">Temperatura: <b className='red'>{temperature}°</b><small>(Sen: {feelsLike}°)</small></div>
                      </center>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
        </div>
      </nav>
  )
}


