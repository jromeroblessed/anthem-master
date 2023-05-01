function Menu() {
  return (
    <div className='btn-group btn-group-lg w-100' role='group' aria-label='Basic example'>
        
        <a href="https://my.bible.com/es/bible/150/GEN.1.RVR95"  className="btn btn-scc2 rounded-0" target="_blank" rel="noreferrer">
        <i class="bi bi-book-half"></i> BÍBLIA
        </a>
        <button
          className='btn btn-scc rounded-0'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasReading'
          aria-controls='offcanvasReading'>
          <i class="bi bi-pen-fill"></i> LEMAS
        </button>       
      </div>
  )
}

export default Menu