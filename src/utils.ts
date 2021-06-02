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

export {
	gcd,
	lcm
}