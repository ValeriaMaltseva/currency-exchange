import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loader from 'components/Loader';
import './Button.css';

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]).isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    outlined: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    disabled: false,
    outlined: false,
    loading: false,
    onClick: () => {},
  };

  /**
   * Should be here to prevent synthetic event errors
   */
  onClick = (e) => {
    this.props.onClick(e);
  };

  render() {
    const {
      children,
      className,
      disabled,
      outlined,
      loading,
      ...props
    } = this.props;

    return (
      <button
        type="button"
        {...props}
        onClick={this.onClick}
        className={classNames('Button', className, {
          'Button--outlined': outlined,
          'Button--disabled': disabled,
        })}
        disabled={disabled}
      >
        {loading && (
          <>
            <span className="Button__loading">{children}</span>
            <Loader />
          </>
        )}
        {!loading && children}
      </button>
    );
  }
}

export default Button;
