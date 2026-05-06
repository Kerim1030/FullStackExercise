import { useState } from 'react'

const Togglable = ({ boutonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  if (!visible) {
    return <button onClick={() => setVisible(true)}>{boutonLabel}</button>
  }

  return (
    <div>
      {children}
      <button onClick={() => setVisible(false)}>annuler</button>
    </div>
  )
}

export default Togglable