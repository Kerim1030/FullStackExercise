import { useState } from 'react'
import PropTypes from 'prop-types'

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

Togglable.propTypes = {
  boutonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Togglable