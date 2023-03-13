import { useState, useEffect } from 'react';
import '../styles/App.css';
import ls from '../services/localStorage';

function App() {
  // variables de estado
  const [quotes, setQuotes] = useState(ls.get('local', []));
  const [search, setSearch] = useState('');
  const [character, setCharacter] = useState('todos');
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  })

  // Fetch
  useEffect(() => {
    if (ls.notIncludes('cache')) {
      fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
        .then(response => response.json())
        .then(data => {
          setQuotes(data);
          ls.set('local', data);
        });
    }
  }, []);


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

  const handleNewQuote = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.id]: ev.target.value })
  }
  const handleClick = () => {
    setQuotes([...quotes, newQuote]);
    setNewQuote({ quote: '', character: '' });
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
            value={search}
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
        <section>
          <h2>Anadir una nueva frase</h2>
          <form onSubmit={handleForm}>
            <input
              className=""
              type="ntext"
              name="quote"
              id="quote"
              placeholder="quote"
              onInput={handleNewQuote}
              value={newQuote.quote}
            />
            <input
              className=""
              type="text"
              name="character"
              id="character"
              placeholder="character"
              onInput={handleNewQuote}
              value={newQuote.character}
            />
            <input
              className=""
              type="submit"
              value="Add"
              onClick={handleClick}
            />
          </form>
        </section>
      </main>

    </div>
  );
}

export default App;
