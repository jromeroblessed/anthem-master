import React, {useEffect, useContext, useState} from 'react'
import logo from '../resources/sccc.png';
import HymnalContext from '../context/Hymnal/HymnalContext'
import moment from 'moment';

export default function Header() {
  //const hymnalContext = useContext(HymnalContext);
  const hSunset = (hour) => {
    let l = !!hour ? moment(hour,"HH:mm:ss").add(moment().utcOffset()/60,'hour').format("hh:mm:ss") : "Requiere Ubicación";
    return l;
  }
  const { sunset, getSunset} = useContext(HymnalContext);
  const [location, setLocation] = useState({});
  useEffect(() => {
    const locat = async () => { 
       navigator.geolocation.getCurrentPosition(
        async function (position) {
          //console.log(position);
          await getSunset({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }).then(res => {
            setLocation(res)
          });           
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
                        <p className="bold text-left">HIMNARIO SCC</p>
                        <small><p className="bold text-left">Ipis, Ciudadela Rodrigo Facio 350 mts, al este de la Cruz Roja </p></small>
                      </center>
                    </div>
                    <div className="col-sm-4 col-md-4 ">
                      <center >
                        <p className="bold">Cel +506 8669 6523 | Tel +506 2229 4125</p>
                        <p className="bold">Puesta del Sol Hoy: <b className='red'>{hSunset(sunset.sunset)}</b></p>
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


