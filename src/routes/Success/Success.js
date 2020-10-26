import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import { ReactComponent as SuccessImg } from './img/success-icon.svg';
import './Success.css';

class Success extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const {
      history,
      location: {
        state: {
          message,
        }
      }
    } = this.props;

    return (
      <div className="Success">
        <SuccessImg />
        <div className="Success__title">{message}!</div>
        <div className="Success__description">
          Your exchange order has been placed successfully and will be processed soon.
        </div>
        <Button onClick={() => history.push('/main')}>Home</Button>
      </div>
    );
  }
}

export default Success;
