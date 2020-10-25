import React, { PureComponent } from 'react';

import { createBid } from 'utils/api';
import Button from 'components/Button';
import ShortPreloader from 'components/ShortPreloader/ShortPreloader';
import './Details.css';

class Details extends PureComponent {
  state = {
    loading: false,
  };

  handleSubmit = async () => {
    const {
      history,
      location: {
        state: {
          base,
          amount,
          invoicePayMethod,
          withdrawPayMethod,
        }
      }
    } = this.props;

    this.setState({ loading: true });

    const { message } = await createBid({
      base,
      amount: Number(amount),
      invoicePayMethod: Number(invoicePayMethod),
      withdrawPayMethod: Number(withdrawPayMethod),
    });

    this.setState({ loading: false });

    history.push({
      pathname: '/success',
      state: { message },
    });
  };

  render() {
    const {
      history,
      location: {
        state: {
          invoiceAmount,
          invoicePayMethodName,
          withdrawAmount,
          withdrawPayMethodName,
        }
      }
    } = this.props;
    const { loading } = this.state;

    return (
      <div className="Details">
        <div className="title">Details</div>
        <div className="Details__item">
          <div className="Details__label">Sell</div>
          <div className="Details__info">{invoiceAmount} {invoicePayMethodName}</div>
        </div>
        <div className="Details__item">
          <div className="Details__label">Buy</div>
          <div className="Details__info">{withdrawAmount} {withdrawPayMethodName}</div>
        </div>
        <div className="Details__btn-wrapper">
          <Button
            outlined
            className="Details__btn"
            onClick={() => history.push('/main')}
          >
            Cancel
          </Button>
          <Button
            className="Details__btn"
            onClick={this.handleSubmit}
          >
            {loading ? <ShortPreloader containerClassName="Details__preloader" /> : 'Confirm'}
          </Button>
        </div>
      </div>
    );
  }
}

export default Details;
