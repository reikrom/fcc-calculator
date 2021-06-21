import React, { useEffect, useState } from 'react';
import './layout.scss';
import { buttons } from './buttons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentValue,
  setCurrentSign,
  setPreviousSign,
  setFormula,
  // history,
  clearCurrentValue,
  clearAll,
} from './redux/reducers/calcSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);

  const calculator = useSelector((state) => state?.calc);
  console.log(calculator, 'calculator');
  const { curValue, curSign, formula } = calculator;

  // const lastInput = formula[formula.length - 1];
  console.log(calculator.curValue, 'calculator.curSign');
  console.log(calculator.curSign, 'calculator.curSign');
  console.log(calculator.prevSign, 'calculator.prevSign');
  const operator = /[*+‑/]$/;
  // console.log(lastInput, 'lastInput');

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    switch (key) {
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
        if (curValue.length <= 22) {
          dispatch(setCurrentValue(key));
        } else {
          setWarning(true);
        }
        break;
      case 'c':
        dispatch(clearCurrentValue());
        break;
      case 'a':
        dispatch(clearAll());
        break;
      case '/':
      case '*':
      case '+':
      case '-':
        // if got numbers in memory
        if (curValue.length > 0) {
          // add numbers to formula
          dispatch(setFormula(curValue));
          // clear memory of nums
          dispatch(clearCurrentValue());
          // add operator to curSign (backup)
          dispatch(setCurrentSign(key));
          // add operator to the formula
          dispatch(setFormula(key));
        }

        // if currentSign exists pass cur to prev, overwrite cursign
        if (curSign.length > 0) {
          dispatch(setPreviousSign(curSign));
          dispatch(setCurrentSign(key));
        }
        break;

      case '.':
        const containsDot = /\./.test(curValue);
        if (!containsDot) {
          dispatch(setCurrentValue(e.key.toLowerCase()));
        }
        break;
      case '%':
      case 'enter':
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    console.log(e.target.value, 'clicky');
    dispatch(setCurrentValue(e.target.value));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [curValue]);

  // clear warning after a second
  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [warning]);

  let current = curValue.length === 0 ? '0' : curValue;
  console.log(current, 'current');

  // display warning
  if (warning) {
    current = 'DIGIT LIMIT REACHED';
  }

  return (
    <div className="calculator">
      <div id="display">
        <div className="calculations">{formula.join('')}</div>
        <div className="current result">{current}</div>
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
