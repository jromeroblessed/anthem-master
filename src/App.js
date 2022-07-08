import './App.css';
// components
import Profile from './components/Profile'
import HymnalList from './components/HymnalList'
// context
import HymnalState from './context/Hymnal/HymnalState'
//BOOTSTRAPP
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <HymnalState>
     <div className='container p-4 '>
       <div className="row">
         <div className="col-md-7">
          <HymnalList/>
         </div>
         <div className="col-md-5">
          <Profile/>  
         </div>
       </div>     
     </div>
    </HymnalState>
  );
}

export default App;
