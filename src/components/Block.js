import React from 'react';

const { Component } = React;

class Block extends Component {
   render() {
    const { index, title} = this.props;
    
    const blockclass  = "block block"+title;
    return (
        <div className={blockclass}>
           {title}
        </div>
      );
    }
}


module.exports = Block;