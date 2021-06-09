import Gyolets from "../src/main";

describe("階段化", () => {
	test("[[0,2,0],[1,0,0],[0,0,3]]", () => {
		const mat = new Gyolets([[0, 2, 0], [1, 0, 0], [0, 0, 3]], {
			row: 3,
			column: 3
		}, true);
		const result = mat.toEchelonFrom();
		expect(result.toArray()).toStrictEqual([[1, 0, 0], [0, 2, 0], [0, 0, 3]]);
	});
	test("[[1,2,0],[0,0,0],[0,4,3]]", () => {
		const mat = new Gyolets([[1, 2, 0], [0, 0, 0], [0, 4, 3]], {
			row: 3,
			column: 3
		}, true);
		const result = mat.toEchelonFrom();
		expect(result.toArray()).toStrictEqual([[1, 2, 0], [0, 4, 3], [0, 0, 0]]);
	});
})

describe("行列の簡約化", () => {
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
				[1, 5],
				[3, 1]
			],
			output: [
				[1, 0],
				[0, 1]
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
		},
		{
			input: [
				[2, 2, 1, 1, 0, 0],
				[3, 1, -1, 0, 1, 0],
				[4, 3, 1, 0, 0, 1]
			],
			output: [
				[1, 0, 0, -4, -1, 3],
				[0, 1, 0, 7, 2, -5],
				[0, 0, 1, -5, -2, 4]
			]
		},
		{
			input: [
				[1, -1, 2, 1],
				[2, -1, 2, 2],
				[-2, 3, -1, 2],
				[0, 3, -1, 4]
			],
			output: [
				[1, 0, 0, 1],
				[0, 5, 0, 8],
				[0, 0, 5, 4],
				[0, 0, 0, 0]
			]
		}
	]
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
	});
});

describe("LaTeX出力", () => {
	const testCases: { input: number[][], output: string }[] = [
		{
			input: [
				[0, 1, 0],
				[1, 0, 0],
				[0, 0, 1]
			],
			output: [
				"\\begin{bmatrix}",
				"\t0 & 1 & 0 \\\\",
				"\t1 & 0 & 0 \\\\",
				"\t0 & 0 & 1 \\\\",
				"\\end{bmatrix}"
			].join("\n")
		},
		{
			input: [
				[1, 5],
				[3, 1]
			],
			output: [
				"\\begin{bmatrix}",
				"\t1 & 5 \\\\",
				"\t3 & 1 \\\\",
				"\\end{bmatrix}"
			].join("\n")
		}
	];
	testCases.forEach(testCase => {
		const testName = "[" + testCase.input.map(row => `[${row.toString()}]`) + "]";
		test(testName, () => {
			const mat = new Gyolets(testCase.input, {
				row: testCase.input.length,
				column: testCase.input[0].length
			});
			expect(mat.toLaTeX()).toEqual(testCase.output);
		})
	})
});