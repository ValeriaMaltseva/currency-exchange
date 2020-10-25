import { stringify } from 'query-string';

export const getPaymentMethods = () => {
  return fetch('https://involve-it.com/test_front/api/payMethods', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

export const calculatePaymentMethod = (args) => {
  return fetch(`https://involve-it.com/test_front/api/payMethods/calculate?${stringify(args)}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

export const createBid = (args) => {
  return fetch('https://involve-it.com/test_front/api/bids', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};
