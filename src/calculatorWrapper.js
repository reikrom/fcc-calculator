import React, { useCallback, useEffect, useState } from 'react';
import './layout.scss';
import Layout from './layout';

const CalculatorWrapper = () => {
  const [tempVal, setTempVal] = useState('');
  const [output, setOutput] = useState([]);
  const [lastInput, setLastInput] = useState(null);
  const [prevLastInput, setPrevLastInput] = useState(null);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    setLastInput(output[output.length - 1]);
    setPrevLastInput(output[output.length - 2]);
    console.log(lastInput, 'lastInput');
    console.log(output, 'output');
  }, [lastInput, output]);

  const isOperator = (input) => /[*+-/]$/.test(input);

  const handleKeyDown = useCallback(
    (e) => {
      const doubleOperator = isOperator(lastInput) && isOperator(prevLastInput);
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
          if (tempVal.length <= 22) {
            setTempVal([...tempVal, key].join(''));
          } else {
            setWarning(true);
          }
          break;
        case 'c':
          setTempVal('');
          break;
        case 'a':
          setTempVal('');
          setOutput([]);

          break;
        case '/':
        case '*':
        case '+':
        case '-':
          if (tempVal.length === 0 && key === '-' && !isOperator(lastInput)) {
            console.log('first');
            console.log(output, 'output');
            console.log(lastInput, 'lastInput');
            setOutput([...output, key]);
          }
          // if got numbers in memory
          if (tempVal.length > 0) {
            console.log('second');
            // store num in output + op key
            setOutput([...output, tempVal, key]);
            // clear mem
            setTempVal('');
          } else if (isOperator(lastInput) && key === '-' && !doubleOperator) {
            console.log('third');
            setOutput([...output, key]);
          } else if (doubleOperator && key !== '-') {
            console.log('fourth');
            // replace last 2 with new operator
            const newOutput = output.slice(1, -2);
            setOutput(...newOutput, key);
            console.log(output, 'output');
          }
          break;

        case '.':
          const containsDot = /\./.test(tempVal);
          if (!containsDot) {
            setTempVal([...tempVal, key].join(''));

            // dispatch(setCurrentValue(e.key.toLowerCase()));
          }
          break;
        case '%':
        case 'enter':
          break;
        default:
          break;
      }
    },
    [lastInput, output, prevLastInput, tempVal]
  );

  const handleClick = (e) => {
    console.log(e.target.value, 'clicky');
    setTempVal(e.target.value);
    // dispatch(setCurrentValue(e.target.value));
  };

  // console.log(output, 'outPut');
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, tempVal]);

  // clear warning after a second
  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [warning]);

  return (
    <Layout
      warning={warning}
      output={output}
      tempVal={tempVal}
      handleClick={handleClick}
    />
  );
};

export default CalculatorWrapper;
