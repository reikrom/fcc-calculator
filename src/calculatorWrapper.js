import React, { useEffect, useState } from 'react';
import './layout.scss';
import Layout from './layout';

const CalculatorWrapper = () => {
	const [tempVal, setTempVal] = useState('');
	const [output, setOutput] = useState([]);
	const [lastInput, setLastInput] = useState(null);
	const [prevLastInput, setPrevLastInput] = useState(null);
	const [warning, setWarning] = useState(false);
	const [evaluate, setEvaluate] = useState(false);
	const [answer, setAnswer] = useState(false);
	const [history, setHistory] = useState([]);

	const isOperator = (input) => /[x*+-/]$/.test(input);
	const containsDot = /\./.test(tempVal);
	const isTempValEmpty = tempVal.length === 0;
	const endsWithOperator = isOperator(lastInput);
	const endsWithDoubleOperator =
		isOperator(lastInput) && isOperator(prevLastInput);

	// NUMBERS
	const handleNumbers = (key) => {
		if (key === '0' && tempVal.length === 0) return;

		if (answer) {
			setTempVal(key);
			setOutput([]);
			setAnswer(false);
			return;
		}
		// limit numbers to 22
		if (tempVal.length <= 22) {
			setTempVal(tempVal.concat(key));
		} else setWarning(true);
	};

	// OPERATORS
	const handleOperators = (key) => {
		key = key === '*' ? 'x' : key;

		if (answer) {
			setOutput([tempVal, key]);
			setTempVal('');
			setAnswer(false);
			return;
		}

		// add "-" if ends with operator
		if (key === '-' && isTempValEmpty && !endsWithOperator) {
			setOutput([...output, key]);
			return;
		}

		if (isTempValEmpty && !endsWithOperator) {
			setOutput([...output, key]);
		}

		if (!isTempValEmpty) {
			// store num + opr in output then clear mem
			setOutput([...output, tempVal, key]);
			setTempVal('');
		} else if (
			// add second opr. unless it's the first input in output
			endsWithOperator &&
			!endsWithDoubleOperator &&
			key === '-' &&
			!(output.length <= 1)
		) {
			setOutput([...output, key]);
			// replace last 2 oper. with new oper.
		} else if (endsWithDoubleOperator && key !== '-') {
			const newOutput = output.slice(0, -2);
			setOutput([...newOutput, key]);
		}
	};

	const handleEval = () => {
		if (!isTempValEmpty && output.length > 1) {
			setOutput([...output, tempVal]);
			setTempVal('');
		} else if (endsWithDoubleOperator) {
			setOutput(output.slice(0, -2));
		} else if (endsWithOperator) {
			setOutput(output.slice(0, -1));
		}
		if (output.length > 1) setEvaluate(true);
	};

	const handleDot = (key) => {
		if (!containsDot) {
			setTempVal(tempVal.concat(key));
		}
	};

	const handleClear = (key) => {
		if (key === 'c') {
			setTempVal('');
			return;
		}

		setTempVal('');
		setOutput([]);
	};

	// store last 2 inputs for easy access
	useEffect(() => {
		setLastInput(output[output.length - 1]);
		setPrevLastInput(output[output.length - 2]);
	}, [lastInput, output]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleInputs = (e) => {
		// keypress or clickevent
		let key = typeof e === 'string' ? e : e.key;
		key = key.toLowerCase();

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
				handleNumbers(key);
				break;
			case 'c':
				handleClear();
				break;
			case '-':
			case '*':
			case '/':
			case 'x':
			case '+':
				handleOperators(key);
				break;
			case '.':
				handleDot(key);
				break;
			case 'enter':
			case '=':
				!answer && handleEval();
				break;
			default:
				break;
		}
	};

	const handleClick = (e) => {
		handleInputs(e.target.innerText);
	};

	// handle evaluate
	useEffect(() => {
		if (evaluate) {
			let expression = output.join('');
			expression = expression
				.replace(/x/g, '*')
				.replace(/‑/g, '-')
				.replace('--', '+0+0+0+0+0+0+');

			let evaluation =
				// eslint-disable-next-line no-eval
				Math.round(1000000000000 * eval(expression)) / 1000000000000;
			setTempVal(String(evaluation));
			setOutput([...output, '=', evaluation]);
			setHistory([...history, [...output, '=', evaluation].join('')]);
			setEvaluate(false);
			setAnswer(true);
			console.log('history', history);
		}
	}, [evaluate, history, output]);

	// eventListeners
	useEffect(() => {
		document.addEventListener('keydown', handleInputs);
		return () => {
			document.removeEventListener('keydown', handleInputs);
		};
	}, [handleInputs, tempVal]);

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
