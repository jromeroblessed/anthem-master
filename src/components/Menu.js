function Menu() {
  return (
    <div className='btn-group btn-group-lg w-100' role='group' aria-label='Basic example'>
        
        <a 
          href="https://my.bible.com/es/bible/150/GEN.1.RVR95" 
          className="btn btn-scc2 rounded-0 fw-bold" 
          target="_blank" 
          rel="noreferrer">
          <i className="bi bi-book-half"></i> BÍBLIA
        </a>
        <button
          className='btn btn-scc2 rounded-0 fw-bold'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasReading'
          aria-controls='offcanvasReading'>
          <i className="bi bi-pen-fill"></i> LEMAS
        </button>       
      </div>
  )
}

export default Menu