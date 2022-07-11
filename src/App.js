import './App.css';
// components
//import Profile from './components/Profile'
import HymnalList from './components/HymnalList'
// context
import HymnalState from './context/Hymnal/HymnalState'
//BOOTSTRAPP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from './resources/sccc.png';

function App() {
  return (
    <HymnalState>
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
                        <p className="bold text-left">HIMNARIO SCC </p>
                        <small><p className="bold text-left">Ipis, Ciudadela Rodrigo Facio 350 mts, al este de la Cruz Roja </p></small>
                      </center>
                    </div>
                    <div className="col-sm-4 col-md-4 ">
                      <center >
                        <p className="bold">Cel +506 8669 6523 | Tel +506 2229 4125</p>
                      </center>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
        </div>
      </nav>
     <div className='container p-4 '>
       <div className="row">
         <div className="col-md-12">
          <HymnalList/>
         </div>         
       </div>     
     </div>
    </HymnalState>
  );
}

export default App;
