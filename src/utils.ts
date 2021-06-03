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
const Vec = {
	// ベクトルの足し算(left + right)
	add: (left: number[], right: number[]): number[] => {
		if (left.length !== right.length) {
			throw Error("要素の数が異なるので足し合わせることはできません");
		}
		let result: number[] = [];
		left.forEach((elem, index) => {
			result.push(elem + right[index]);
		});
		return result;
	},
	// ベクトルの引き算(left - right)
	sub: (left: number[], right: number[]): number[] => {
		right = right.map(elem => elem * (-1));
		return Vec.add(left, right);
	},
	// ベクトルの約分
	cancel: (vec: number[]): number[] => {
		let _vec = vec.filter(elem => elem !== 0);
		while (_vec.length >= 2) {
			const _a = _vec.pop();
			const _b = _vec.pop();
			// @ts-ignore
			_vec.push(gcd(_a, _b));
		}
		return (Math.abs(_vec[0]) === 1 || _vec[0] === undefined) ? vec : vec.map(elem => elem / _vec[0]);
	}
}
export {
	gcd,
	lcm,
	Vec
}