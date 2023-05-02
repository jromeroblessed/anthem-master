import React from 'react';

function Search({ setSearch, viewCateg, search }) {
  return (
    <>
    <div className="input-group mb-3">
      <div className='form-floating mb-3' aria-describedby="button-addon2" style={{ zIndex: 1000, position: 'sticky', top: 0 }}>
        <input
          className='form-control'
          id='myInput'
          type='text'
          value={search}
          onChange={(text) => setSearch(text.target.value)}
          placeholder='Search..'
        />
        <label htmlFor='floatingInput'>
          <i className='bi bi-search'></i> Buscar por número de himno o título
        </label>
      </div>
      {viewCateg && (
      <button 
        style={{
          height:'58px'
        }}
        className="btn btn-scc" 
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasExample'
        type="button" 
        id="button-addon2" ><i className="bi bi-bookmarks-fill"></i></button>
        )}
      </div>
      
    </>
  );
}

export default Search;
