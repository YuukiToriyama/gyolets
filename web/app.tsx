import React from 'react';
import ReactDOM from 'react-dom';

import Header from './modules/Header';

const App: React.FunctionComponent = () => {
	return (
		<div>
			<Header title="Gyolets" buttons={{ icon: "home", label: "HOME" }} />
			<h1>Hello, world</h1>
			<p>hogehoge</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("app"));