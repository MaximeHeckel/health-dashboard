import React, { Component, PropTypes } from 'react';

class Main extends Component {

  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    // eslint-disable-next-line no-use-before-define
    const { children, ...attributes } = this.props;
    return (
      <div id="module-main" {...attributes}>
        HELLO
      </div>
    );
  }
}

export default Main;
