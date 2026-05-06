const App = ({ store }) => {
  const { good, ok, bad } = store.getState()

  return (
    <div>
      <h2>donnez votre avis</h2>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>bien</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>mauvais</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>réinitialiser</button>
      <h2>statistiques</h2>
      <p>bien : {good}</p>
      <p>ok : {ok}</p>
      <p>mauvais : {bad}</p>
    </div>
  )
}

export default App