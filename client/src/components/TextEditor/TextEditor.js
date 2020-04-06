import React from 'react';
import PropTypes from 'prop-types';
import css from './TextEditor.module.css';

const TextEditor = (props) => {
  const {
    textLimit,
    value,
    onChange,
    disabled,
    required,
    errorMsg,
    error,
    ...rest
  } = props;

  const isError = !disabled && required && error;

  const textInputHandler = React.useCallback(
    (e) => {
      const text = e.target.value;
      if (text.length <= textLimit) {
        if (onChange) {
          onChange(text);
        }
      }
    },
    [textLimit, onChange]
  );

  const keyDownHandler = React.useCallback((e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }, []);

  return (
    <div>
      <textarea
        {...rest}
        placeholder="what's on your mind?"
        onChange={textInputHandler}
        className={`${css.editable} ${isError ? css.errorBorder : ''}`}
        value={value}
        onKeyDown={keyDownHandler}
        disabled={disabled}
      ></textarea>

      {isError && (
        <div className={css.errorMsg}>
          <div className="flexVerticalCenter">
            <span>*</span> <span> {errorMsg}</span>
          </div>
        </div>
      )}
      {!isError && (
        <div className={css.count}>
          <span>{value.length}</span> / <span>{textLimit}</span>
        </div>
      )}
    </div>
  );
};

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  textLimit: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
};

TextEditor.defaultProps = {
  textLimit: 120,
  errorMsg: 'required',
  disabled: false,
  required: false,
  error: false,
};

export default TextEditor;
