import { useState } from 'react';
import '../styles/App.css';
import data from '../data/data.json';




function App() {
  // variables de estado
  const [quotes, setQuotes] = useState(data);
  const [search, setSearch] = useState('');
  const [character, setCharacter] = useState('todos');

  //handlers

  const handleForm = (ev) => {
    ev.preventDefault();
  }

  const handleSearch = (ev) => {
    setSearch(ev.currentTarget.value);
  }

  const handleCharacter = (ev) => {
    setCharacter(ev.target.value);
  }


  // renders
  const renderQuotes = () => {
    return quotes
      .filter((eachQuote) => {
        return (
          eachQuote.quote.toLowerCase().includes(search.toLowerCase())
        );
      })
      .filter((eachQuote) => {
        return character === 'todos' || eachQuote.character.toLowerCase() === character.toLowerCase();
      })
      .map((eachQuote, i) => (
        <li key={i}>
          <p>{`${eachQuote.quote}-${eachQuote.character}`}</p>
        </li>
      ));
  };


  return (

    <div>
      <header>
        <h1>Frases de Friends</h1>
        <form onSubmit={handleForm}>
          <label htmlFor='search'>Filtrar por frase: </label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            id='search'
            placeholder="buscar frase"
            onInput={handleSearch}
          />
          <label className="fheader_select" htmlFor="select">
            filtrar por personaje
            <select onChange={handleCharacter} value={character} name="select" id="select">
              <option value="todos">
                todos
              </option>
              <option value="Joey">Joey</option>
              <option value="Chandler">Chandler</option>
              <option value="monica">monica</option>
              <option value="Rachel">Rachel</option>
              <option value="Ross">Ross</option>
            </select>
          </label>
        </form>
      </header>
      <main>
        <section>
          <ul>
            {renderQuotes()}
          </ul>
        </section>
      </main>

    </div>
  );
}

export default App;
