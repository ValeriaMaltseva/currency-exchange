import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as ShortPreloaderImage } from './img/Loader.svg';

class ShortPreloader extends PureComponent {
  static propTypes = {
    containerClassName: PropTypes.string,
  };

  static defaultProps = {
    containerClassName: null,
  };

  render() {
    const { containerClassName } = this.props;

    return (
      <div className={classNames('ShortPreloader', containerClassName)}>
        <ShortPreloaderImage />
      </div>
    );
  }
}

export default ShortPreloader;
