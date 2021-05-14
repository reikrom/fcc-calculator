import React, { useEffect, useState } from 'react';
import './layout.scss';
import { buttons } from './buttons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentValue,
  history,
  setPrevVal,
  setCurrentSign,
  clearCurrentValue,
} from './redux/reducers/calcSlice';

const Layout = () => {
  const dispatch = useDispatch();

  const currentValue = useSelector((state) => state?.calc.currentValue);
  // const currentSign = useSelector((state) => state?.calc.currentSign);
  // const prevVal = useSelector((state) => state?.calc.prevVal);
  const handleKeyDown = (e) => {
    switch (e.key.toLowerCase()) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '(':
      case ')':
        // rei TODO: if length 1 and 1-9 is pressed, replace 0 with 1-9
        dispatch(setCurrentValue(e.key.toLowerCase()));
        break;
      case 'c':
        dispatch(clearCurrentValue());
        break;

      case '/':
      case 'x':
      // if prevVal length
      case '+':
      case '-':
      case '.':
        const containsDot = /\./.test(currentValue);
        if (!containsDot) {
          dispatch(setCurrentValue(e.key.toLowerCase()));
        }
        break;
      case '%':
      case 'enter':

      default:
        break;
    }
  };

  // done // rei TODO: capture current number click
  // done // rei TODO: capture current number press
  /*
  
  const isOperator  =  /[x/+-]/
  
  0. Poisition current val and eval string in Ui
  1. add 22 digit limit and display a message for 1 second
  2. if isOperator store currentValue into evaluation string
  3. endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  
  
  */

  const handleClick = (e) => {
    console.log(e.target.value, 'clicky');
    dispatch(setCurrentValue(e.target.value));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentValue]);

  return (
    <div className="calculator">
      <div id="display">
        {currentValue && (
          <div className="calculations">
            {currentValue === '' ? '0' : currentValue}
          </div>
        )}
        <div className="result">638</div>
      </div>
      <div className="tabs bred">
        <div className="history nonselect">History</div>
        <div className="sin nonselect">Sin</div>
      </div>
      <div className="buttonWrapper nonselect">
        {buttons.map((b) => (
          <button
            onClick={(e) => handleClick(e)}
            className="button"
            id={b.id}
            key={b.id}
            value={b.value}
          >
            {b.value}
          </button>
        ))}
      </div>
      <button>add</button>
    </div>
  );
};

export default Layout;
