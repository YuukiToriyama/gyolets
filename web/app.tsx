import React from 'react';
import ReactDOM from 'react-dom';

import "@blueprintjs/core/lib/css/blueprint.css";
import Header, { ButtonProps } from './modules/Header';
import Section from './modules/Section';
import InputForm from './modules/InputForm';
import ShowResult from './modules/ShowResult';


const App: React.FunctionComponent = () => {
	const headerBarButtons: ButtonProps[] = [
		{ icon: "help", text: "Docs", href: "./docs/index.html" },
		{ icon: "git-repo", text: "GitHub", href: "https://github.com/YUUKIToriyama/gyolets" },
		{ icon: "chat", text: "Twitter", href: "https://twitter.com/CoconMap" }
	]
	const defaultValue = [
		"[",
		"\t[1, 2, 3],",
		"\t[2, 3, 4],",
		"\t[3, 4, 5]",
		"]"
	].join("\n");
	const [json, setJSON] = React.useState<object>(JSON.parse(defaultValue));

	return (
		<React.Fragment>
			<Header title="Gyolets" buttons={headerBarButtons} />
			<Section description={{ label: "行列を入力", text: "二次元配列の形式で行列を入力して下さい。文字や浮動小数点数には対応していません。" }} >
				<InputForm defaultValue={defaultValue} onChange={(object) => { setJSON(object); console.log(object); }} />
			</Section>
			<Section description={{ label: "結果を表示", text: "設定を変更して実行ボタンを押して下さい。" }}>
				<ShowResult matrix={json as number[][]} />
			</Section>
		</React.Fragment>
	)
}

ReactDOM.render(<App />, document.getElementById("app"));