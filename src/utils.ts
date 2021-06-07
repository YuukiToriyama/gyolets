// 最大公約数の計算
const gcd = (a: number, b: number): number => {
	a = Math.abs(a);
	b = Math.abs(b);
	return (b === 0) ? (a === 0 ? 1 : a) : gcd(b, a % b);
}
// 最小公倍数の計算
const lcm = (a: number, b: number): number => {
	a = Math.abs(a);
	b = Math.abs(b);
	if (a == 0 && b == 0) {
		return 0;
	}
	const d = gcd(a, b);
	return b * (a / d);
}
const Vec = {
	// ベクトルの足し算(left + right)
	add: (left: number[], right: number[]): number[] => {
		if (left.length !== right.length) {
			throw Error("要素の数が異なります");
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
		// 配列内の0でない要素を取得
		let _vec = vec.filter(elem => elem !== 0);
		while (_vec.length >= 2) {
			// 右側から2つづつ取り出し、
			const _a = _vec.pop();
			const _b = _vec.pop();
			// 最大公約数を求めもとに戻す。これを配列の要素が一つになるまで繰り返す。
			_vec.push(gcd(_a as number, _b as number));
		}
		if (_vec.length === 0) {
			// vecが0ベクトルのとき
			return vec;
		} else {
			// 最大公約数で配列を割る
			vec = vec.map(elem => elem / _vec[0]);
			// 配列の0でない最初の要素がプラスになるようにする
			const firstElemNotZero = vec.filter(elem => elem !== 0)[0];
			return (firstElemNotZero < 0) ? vec.map(elem => 0 + elem * -1) : vec.map(elem => elem + 0);
		}
	}
}
export {
	gcd,
	lcm,
	Vec
}