import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './HelloWorld.css'

class HelloWorld extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="hello-world">HelloWorld</div>
    );
  }
}

HelloWorld.propTypes = {}

HelloWorld.defaultProps = {}

export default HelloWorld
