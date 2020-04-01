import React from 'react';
import PropTypes from 'prop-types';
import css from './TextEditor.module.css';

const TextEditor = props => {
  const { textLimit, value, onChange, disabled = false } = props;

  const textInputHandler = React.useCallback(
    e => {
      const text = e.target.value;
      if (text.length <= textLimit) {
        if (onChange) {
          onChange(text);
        }
      }
    },
    [textLimit, onChange]
  );

  const keyDownHandler = React.useCallback(e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }, []);

  return (
    <div>
      <textarea
        placeholder="what's on your mind?"
        onChange={textInputHandler}
        className={css.editable}
        value={value}
        onKeyDown={keyDownHandler}
        disabled={disabled}
      ></textarea>

      <div className={css.count}>
        <span>{value.length}</span> / <span>{textLimit}</span>
      </div>
    </div>
  );
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  textLimit: PropTypes.number.isRequired
};

TextEditor.defaultProps = {
  textLimit: 120
};

export default TextEditor;
