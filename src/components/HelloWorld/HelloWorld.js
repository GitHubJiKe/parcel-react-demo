import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './HelloWorld.css'

class HelloWorld extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1 className="hello-world">HelloWorld</h1>
    );
  }
}

HelloWorld.propTypes = {}

HelloWorld.defaultProps = {}

export default HelloWorld
