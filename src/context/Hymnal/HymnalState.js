
import React, {useReducer} from 'react'
import HymnalReducer from './HymnalReducer'
import HymnalContext from './HymnalContext'
//import axios from "axios";
import {hymnal} from "../../resources/himn";


//█ejemplo de useState sin agregar ni remover ni actualizar
const HymnalState = (props) => {
  const initialState = {
    hymnal:[],
    selectedAnthem: null
  }

  const [state, dispatch] = useReducer(HymnalReducer, initialState)
  
  const getHymnal = async () => {
    //const res = await axios.get('https://reqres.in/api/users');   
    dispatch({
      type: 'GET_HYMNAL',
      payload: hymnal
    })    
  }
  
  const getAnthem = async (id) => {
    //const res = await axios.get('https://reqres.in/api/users/'+id);
    dispatch({
      type: 'GET_ANTHEM',
      payload: hymnal[id]
    })
  }

  return (
    <HymnalContext.Provider value={{
      hymnal: state.hymnal,
      selectedAnthem: state.selectedAnthem,
      getHymnal,
      getAnthem 
    }}>
      {props.children}
    </HymnalContext.Provider>
  )
}

export default HymnalState;