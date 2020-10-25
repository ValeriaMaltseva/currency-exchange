import React, { PureComponent } from 'react';

class Success extends PureComponent {
  render() {
    const {
      location: {
        state: {
          message,
        }
      }
    } = this.props;

    return (
      <div>{message}</div>
    );
  }
}

export default Success;
