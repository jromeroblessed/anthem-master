import './App.css';
// components
import HymnalList from './components/HymnalList'
import Header from './components/Header'
// context
import HymnalState from './context/Hymnal/HymnalState'
//BOOTSTRAPP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './components/Menu';

function App() { 
  return (    
    <HymnalState>
     <Header/>
     <Menu/>
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
