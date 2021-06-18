#!/usr/bin/env node
import { cac } from "cac";
import Gyolets from "./main";

import fs from "fs";
const { version } = JSON.parse(fs.readFileSync(__dirname + "/../package.json").toString("utf8"));

const cli = cac("gyolets");

cli.option("-m, --matrix <number[][]>", "行列オブジェクトに変換したい二次元配列を指定");
cli.option("-v, --verbose", "計算過程を逐次表示します", {
	default: false
});
cli.option("-r, --rapid", "途中計算を少し省略します", {
	default: false
});
cli.option("-l, --latex <string>", "LaTeX形式で出力します", {
	default: false
});
cli.version(version, "--version");
cli.help();

const parsed = cli.parse();
if (parsed.options.matrix !== undefined) {
	const array: number[][] = JSON.parse(parsed.options.matrix);
	const mat = new Gyolets(array, {
		row: array.length,
		column: array[0].length
	});
	// --latexフラグは立っているが具体的に指定されていない場合"pmatrix"を指定する
	const latexOption = (parsed.options.latex === true) ? "pmatrix" : parsed.options.latex;
	// オプションをまとめる
	const reductionOption = {
		verbose: parsed.options.verbose,
		rapid: parsed.options.rapid,
		latex: latexOption
	}
	if (reductionOption.latex !== false) {
		// --latexフラグが立っている場合
		if (reductionOption.verbose) {
			console.log(mat.toLaTeX(latexOption));
		}
		const result = mat.reduction(reductionOption);
		if (!reductionOption.verbose) {
			console.log(result.toLaTeX(latexOption));
		}
	} else {
		// --latexフラグがない場合
		if (reductionOption.verbose) {
			console.log(mat.toString());
		}
		const result = mat.reduction(reductionOption);
		if (!reductionOption.verbose) {
			console.log(result.toString());
		}
	}
}