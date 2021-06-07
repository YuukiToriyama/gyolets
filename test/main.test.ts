import Gyolets from "../src/main";

const testCases: { input: number[][], output: number[][] }[] = [
	{
		input: [
			[0, 1, 0],
			[1, 0, 0],
			[0, 0, 1]
		],
		output: [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		]
	},
	{
		input: [
			[2, 0, 1],
			[1, 1, 1],
			[-1, 2, 1]
		],
		output: [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		]
	}
]

describe("行列の簡約化", () => {
	testCases.forEach(testCase => {
		const testName = "[" + testCase.input.map(row => `[${row.toString()}]`) + "]";
		test(testName, () => {
			const mat = new Gyolets(testCase.input, {
				row: testCase.input.length,
				column: testCase.input[0].length
			});
			const reducedMat = mat.reduction();
			expect(reducedMat.toArray()).toEqual(testCase.output);
		})
	})

})