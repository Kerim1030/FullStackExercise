const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    border: '2px solid',
    padding: '10px',
    marginBottom: '10px',
    color: type === 'erreur' ? 'red' : 'green',
    borderColor: type === 'erreur' ? 'red' : 'green',
    background: '#f9f9f9'
  }

  return <div style={style}>{message}</div>
}

export default Notification