import * as React from "react"
import PropTypes from "prop-types"

const Header = ({ title, actions }) => (
  <header style={{ marginBottom: `1.45rem` }}>
    <div>
      <h1 style={{ margin: 0 }}>{title}</h1>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
