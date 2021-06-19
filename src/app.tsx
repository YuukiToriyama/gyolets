import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FunctionComponent = () => {
	return (
		<div>
			<h1>Hello, world</h1>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("app"));