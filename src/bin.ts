#!/usr/bin/env node
import { cac } from "cac";
import Gyolets from "./main";

import fs from "fs";
const { version } = JSON.parse(fs.readFileSync(__dirname + "/../package.json").toString("utf8"));

const cli = cac("gyolets");
cli.version(version, "--version");
cli.help();

cli.option("-m, --matrix <number[][]>", "行列オブジェクトに変換したい二次元配列を指定");
cli.option("-v, --verbose", "計算過程を逐次表示します", {
	default: false
});
cli.option("-r, --rapid", "途中計算を少し省略します", {
	default: false
});

const parsed = cli.parse();
if (parsed.options.matrix !== undefined) {
	const array: number[][] = JSON.parse(parsed.options.matrix);
	const mat = new Gyolets(array, {
		row: array.length,
		column: array[0].length
	}, {
		verbose: parsed.options.verbose,
		rapid: parsed.options.rapid
	});
	console.log(mat.toString());
	const result = mat.reduction();
	console.log(result.toString());
}