import React from 'react';
import './layout.scss';
import { buttons } from './buttons';

const Layout = ({ output, tempVal, handleClick, warning, history }) => {
	let current = tempVal.length === 0 ? '0' : tempVal;
	if (warning) {
		current = 'DIGIT LIMIT REACHED';
	}

	return (
		<div className="calculator">
			<div id="display">
				<div className="calculations">{output}</div>
				<div className="current result">{current}</div>
			</div>
			<div className="tabs">
				<div className="history nonselect">History</div>
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
		</div>
	);
};

export default Layout;
