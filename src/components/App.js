import '../styles/App.css';




function App() {




  return (

    <div>
      <header>
        <h1>Frases de Friends</h1>
        <form>
          <label htmlFor='search'>Filtrar por frase: </label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            id='search'
            placeholder="buscar frase"
          />
          <label htmlFor='select'>filtrar por personage: </label>
          <input
            className="header__select"
            autoComplete="off"
            type="select"
            name="select"
            id='select'
            placeholder="elegir"
          />
        </form>
      </header>
      <main>
        <section>
          <ul>

          </ul>
        </section>
      </main>

    </div>
  );
}

export default App;
