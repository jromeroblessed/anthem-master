import './App.css';
// components
//import Profile from './components/Profile'
import HymnalList from './components/HymnalList'
import Header from './components/Header'
// context
import HymnalState from './context/Hymnal/HymnalState'
//BOOTSTRAPP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from './resources/sccc.png';

function App() { 
  return (    
    <HymnalState> 
     <Header/>     
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
