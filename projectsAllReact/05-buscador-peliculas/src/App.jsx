import './App.css'
import { useMovies } from './hooks/useMovie'
import { Movies } from './components/Movies'
import { useEffect, useState } from 'react'

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSunmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if(query === ''){
      setError('No se puede buscar una película vacía')
      return
    }

    if(query.match(/^\d+$/)){
      setError('No se puede buscar una película con un número')
      return
    }

    if(query.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    
    setError(null)
  }, [query])

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSunmit}>
          <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>

    </div>
  )
}

export default App
