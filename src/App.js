import './App.css';
// components
//import Profile from './components/Profile'
import HymnalList from './components/HymnalList'
// context
import HymnalState from './context/Hymnal/HymnalState'
//BOOTSTRAPP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


function App() {
  return (
    <HymnalState>
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
