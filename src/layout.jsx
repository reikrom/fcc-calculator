import React, { useState } from 'react';
import './layout.scss';
import { buttons } from './buttons';

const Layout = ({ output, tempVal, handleClick, warning, history }) => {
	const [toggleOpen, setToggleOpen] = useState(false);

	let current = tempVal.length === 0 ? '0' : tempVal;
	if (warning) {
		current = 'DIGIT LIMIT REACHED';
	}

	const toggleHistory = () => {
		setToggleOpen((state) => !state);
	};

	return (
		<div className="calculator">
			<div id="display">
				<div className="calculations">{output}</div>
				<div className="current result">{current}</div>
			</div>
			<div className="tabs">
				<div onClick={toggleHistory} className="history nonselect">
					History
				</div>
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
			<ul style={{ opacity: toggleOpen ? 1 : 0 }} className="historyPage">
				{history ? history.map((eq, i) => <li key={i}>{eq}</li>) : 'n'}
			</ul>
		</div>
	);
};

export default Layout;
