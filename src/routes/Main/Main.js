import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';

import { getPaymentMethods, calculatePaymentMethod } from 'utils/api';
import { BUY, SELL } from 'constants/payment';
import Loader from 'components/Loader';
import Button from 'components/Button'
import './Main.css';

class Main extends PureComponent {
  state = {
    paymentMethods: {
      invoice: [],
      withdraw: [],
    },
    loading: null,
    invoiceAmount: '',
    invoicePayMethod: '',
    invoicePayMethodName: '',
    withdrawAmount: '',
    withdrawPayMethod: '',
    withdrawPayMethodName: '',
    base: '',
    amount: '',
  };

  async componentDidMount() {
    const paymentMethods = await getPaymentMethods();

    this.setState({ paymentMethods });
  }

  handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    let base = this.state.base;
    let invoicePayMethodName = this.state.invoicePayMethodName;
    let withdrawPayMethodName = this.state.withdrawPayMethodName;

    if (name === 'invoiceAmount') {
      base = SELL;
    }

    if (name === 'withdrawAmount') {
      base = BUY;
    }

    if (name === 'invoicePayMethod') {
      invoicePayMethodName = selectedOptions[0].text;
    }

    if (name === 'withdrawPayMethod') {
      withdrawPayMethodName = selectedOptions[0].text;
    }

    this.setState({
      [name]: value,
      base,
      invoicePayMethodName,
      withdrawPayMethodName,
    }, this.debounceCalculateCurrency);
  };

  calculateCurrency = async () => {
    const {
      base,
      invoiceAmount,
      invoicePayMethod,
      withdrawAmount,
      withdrawPayMethod,
    } = this.state;

    const amount = base === SELL ? invoiceAmount : withdrawAmount;
    const fieldToChange = base === SELL ? 'withdrawAmount' : 'invoiceAmount';

    if (base && invoicePayMethod && withdrawPayMethod && amount) {
      this.setState({ loading: fieldToChange, amount });

      const response = await calculatePaymentMethod({
        base,
        amount,
        invoicePayMethod,
        withdrawPayMethod,
      });

      this.setState({ [fieldToChange]: response.amount, loading: null });
    }
  };

  debounceCalculateCurrency = debounce(this.calculateCurrency, 500);

  handleSubmit = () => {
    const { history } = this.props;

    history.push({
      pathname: '/details',
      state: {
        base: this.state.base,
        amount: this.state.amount,
        invoiceAmount: this.state.invoiceAmount,
        invoicePayMethod: this.state.invoicePayMethod,
        invoicePayMethodName: this.state.invoicePayMethodName,
        withdrawAmount: this.state.withdrawAmount,
        withdrawPayMethod: this.state.withdrawPayMethod,
        withdrawPayMethodName: this.state.withdrawPayMethodName,
      }
    });
  };

  render() {
    const {
      loading,
      paymentMethods,
      invoiceAmount,
      invoicePayMethod,
      withdrawAmount,
      withdrawPayMethod,
    } = this.state;

    const validation =
      invoiceAmount === ''
      || invoicePayMethod === ''
      || withdrawAmount === ''
      || withdrawPayMethod === '';

    return (
      <form className="Main Main__form">
        <div className="Main__form-inner">
          <div className="Main__form-item">
            <div className="title">Sell</div>
            <div className="Main__form-input-wrapper">
              <select
                name="invoicePayMethod"
                defaultValue=""
                className="Main__form-input"
                onChange={this.handleChange}
              >
                <option disabled value="">Select currency</option>
                {paymentMethods.invoice.map((paymentMethod) => (
                  <option key={paymentMethod.id} value={paymentMethod.id}>
                    {paymentMethod.name}
                  </option>
                ))}
              </select>
              <div className="Main__form-select-arrow arrow-down" />
            </div>
            <div className="Main__form-input-wrapper">
              <input
                name="invoiceAmount"
                type="text"
                value={invoiceAmount}
                className="Main__form-input"
                onChange={this.handleChange}
              />
              {loading === 'invoiceAmount' && <Loader containerClassName="Main__form-preloader" />}
            </div>
          </div>
          <div className="Main__form-item">
            <div className="title">Buy</div>
            <div className="Main__form-input-wrapper">
              <select
                name="withdrawPayMethod"
                defaultValue=""
                className="Main__form-input"
                onChange={this.handleChange}
              >
                <option disabled value="">Select currency</option>
                {paymentMethods.withdraw.map((paymentMethod) => (
                  <option key={paymentMethod.id} value={paymentMethod.id}>
                    {paymentMethod.name}
                  </option>
                ))}
              </select>
              <div className="Main__form-select-arrow arrow-down" />
            </div>
            <div className="Main__form-input-wrapper">
              <input
                name="withdrawAmount"
                value={withdrawAmount}
                type="text"
                className="Main__form-input"
                onChange={this.handleChange}
              />
              {loading === 'withdrawAmount' && <Loader containerClassName="Main__form-preloader" />}
            </div>
          </div>
        </div>
        <div className="Main__btn-wrapper">
          <Button
            disabled={validation}
            onClick={this.handleSubmit}
          >
            Exchange
          </Button>
        </div>
      </form>
    );
  }
}

export default Main;
