import {
	gcd,
	lcm,
	Vec
} from "../src/utils";

describe("最大公約数", () => {
	const testCases: { args: [number, number], result: number }[] = [
		{
			args: [1, 2],
			result: 1
		},
		{
			args: [2, 6],
			result: 2
		},
		{
			args: [10, 3],
			result: 1
		},
		{
			args: [6461, 1183],
			result: 91
		},
		{
			args: [0, 4],
			result: 4
		}
	];
	testCases.forEach(testCase => {
		test(`gcd(${testCase.args.join(",")})`, () => {
			expect(gcd(...testCase.args)).toEqual(testCase.result);
		})
	});
});

describe("最小公倍数", () => {
	const testCases: { args: [number, number], result: number }[] = [
		{
			args: [2, 3],
			result: 6
		},
		{
			args: [10, 15],
			result: 30
		},
		{
			args: [144, 216],
			result: 432
		},
		{
			args: [0, 10],
			result: 0
		},
		{
			args: [0, 0],
			result: 0
		}
	];
	testCases.forEach(testCase => {
		test(`lcm(${testCase.args.join(",")})`, () => {
			expect(lcm(...testCase.args)).toEqual(testCase.result);
		})
	})
})