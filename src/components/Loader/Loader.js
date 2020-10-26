import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as LoaderImage } from './img/Loader.svg';

class Loader extends PureComponent {
  static propTypes = {
    containerClassName: PropTypes.string,
  };

  static defaultProps = {
    containerClassName: null,
  };

  render() {
    const { containerClassName } = this.props;

    return (
      <div className={classNames('Loader', containerClassName)}>
        <LoaderImage />
      </div>
    );
  }
}

export default Loader;
