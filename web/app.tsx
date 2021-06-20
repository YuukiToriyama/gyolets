import React from 'react';
import ReactDOM from 'react-dom';

import "@blueprintjs/core/lib/css/blueprint.css";
import Header, { ButtonProps } from './modules/Header';

const App: React.FunctionComponent = () => {
	const headerBarButtons: ButtonProps[] = [
		{ icon: "help", text: "Docs", href: "./docs/index.html" },
		{ icon: "git-repo", text: "GitHub", href: "https://github.com/YUUKIToriyama/gyolets" },
		{ icon: "chat", text: "Twitter", href: "https://twitter.com/CoconMap" }
	]
	return (
		<div>
			<Header title="Gyolets" buttons={headerBarButtons} />
			<h1>Hello, world</h1>
			<p>hogehoge</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("app"));