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
			args: [6461, 1183],
			result: 91
		},
		{
			args: [0, 4],
			result: 4
		},
		{
			args: [-1, 0],
			result: 1
		},
		{
			args: [-4, -2],
			result: 2
		},
		{
			args: [0, 0],
			result: 1
		},
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
		},
		{
			args: [2, -1],
			result: 2
		}
	];
	testCases.forEach(testCase => {
		test(`lcm(${testCase.args.join(",")})`, () => {
			expect(lcm(...testCase.args)).toEqual(testCase.result);
		})
	})
});

describe("ベクトル演算", () => {
	type Vector = number[];
	const vectors: Vector[] = [
		[1, 2, 3, 4, 5],
		[-1, 1, -1, 1, -1],
		[0, 0, -4, 6, 10],
		[6, 36, 12, 54, -12],
		[1, 2, 3],
		[3, 4, 5],
		[0, 0, 0, 0]
	];
	describe("足し算", () => {
		test("[1,2,3] + [3,4,5]", () => {
			expect(Vec.add(vectors[4], vectors[5])).toStrictEqual([4, 6, 8]);
		});
		test("[1,2,3,4,5] + [-1,1,-1,1,-1]", () => {
			expect(Vec.add(vectors[0], vectors[1])).toStrictEqual([0, 3, 2, 5, 4]);
		});
		test("[1,2,3] + [1,2,3,4,5] shuld throw Error", () => {
			expect(() => Vec.add(vectors[4], vectors[0])).toThrow();
		});
	});
	describe("引き算", () => {
		test("[1,2,3] - [3,4,5]", () => {
			expect(Vec.sub(vectors[4], vectors[5])).toStrictEqual([-2, -2, -2]);
		});
		test("[1,2,3,4,5] - [-1,1,-1,1,-1]", () => {
			expect(Vec.sub(vectors[0], vectors[1])).toStrictEqual([2, 1, 4, 3, 6]);
		});
		test("[1,2,3] - [1,2,3,4,5] shuld throw Error", () => {
			expect(() => Vec.sub(vectors[4], vectors[0])).toThrow();
		});
	});
	describe("約分", () => {
		test("[1,2,3,4,5]", () => {
			expect(Vec.cancel(vectors[0])).toStrictEqual(vectors[0]);
		});
		test("[-1,1,-1,1,-1]", () => {
			expect(Vec.cancel(vectors[1])).toStrictEqual([1, -1, 1, -1, 1]);
		});
		test("[0,0,-4,6,10]", () => {
			expect(Vec.cancel(vectors[2])).toStrictEqual([0, 0, 2, -3, -5]);
		});
		test("[6,36,12,54,-12]", () => {
			expect(Vec.cancel(vectors[3])).toStrictEqual([1, 6, 2, 9, -2]);
		});
		test("[0,0,0,0]", () => {
			expect(Vec.cancel(vectors[6])).toStrictEqual([0, 0, 0, 0]);
		})
	});
})