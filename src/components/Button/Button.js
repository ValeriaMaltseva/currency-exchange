import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ShortPreloader from 'components/ShortPreloader';
import './Button.css';

class Button extends PureComponent {
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
      secondary,
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
          'Button--secondary': secondary,
          'Button--outlined': outlined,
          'Button--disabled': disabled,
        })}
        disabled={disabled}
      >
        {loading && (
          <>
            <span className="Button__loading">{children}</span>
            <ShortPreloader />
          </>
        )}
        {!loading && children}
      </button>
    );
  }
}

export default Button;
