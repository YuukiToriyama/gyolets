// 最大公約数の計算
const gcd = (a: number, b: number): number => {
	if (b === 0) {
		return a;
	} else {
		return gcd(b, a % b);
	}
}
// 最小公倍数の計算
const lcm = (a: number, b: number): number => {
	const d = gcd(a, b);
	return b * (a / d);
}
// ベクトルの足し算
const addTwoVectors = (left: number[], right: number[]): number[] => {
	if (left.length !== right.length) {
		throw Error("要素の数が異なるので足し合わせることはできません");
	}
	let result: number[] = [];
	left.forEach((elem, index) => {
		result.push(elem + right[index]);
	});
	return result;
}
export {
	gcd,
	lcm,
	addTwoVectors
}