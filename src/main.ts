import { Vec, lcm } from "./utils";

interface elementaryRowOperationOption {
	rapid: boolean // trueを指定すると同時に複数の行に足し引きするようになる
}
const elementaryRowOperation = (matrix: Gyolets, option: elementaryRowOperationOption): { matrix: Gyolets, pivots: [number, number][] } => {
	// どの行のどの要素に注目して行基本変形を行なったのかを記録しておく
	let pivots: [number, number][] = [];
	// m行n列をイメージ
	let m: number = matrix.rowSize;
	let n: number = 0;
	while (n < matrix.columnSize) {
		// n列めを切り出し
		const column_n = matrix.matrix.map(row => row[n]);
		// n列の要素0の個数
		const zeros = column_n.filter(elem => elem === 0).length;
		if (zeros >= m - 1) {
			// n列の0の個数がm-1個以上であれば次の列を探索
			n++;
		} else {
			// n列に0でない要素が2個以上あれば計算を行なう
			for (let i = 0; i < m; i++) {
				// m行に注目し、要素m0からm(n-1)までがすべて0である場合のみその行を選ぶ
				if (matrix.matrix[i].slice(0, n).every(elem => elem === 0) && matrix.matrix[i][n] !== 0) {
					// 他の行にm行を何倍かしたものを足し引きする
					// 他の行で(i行目以外で)n個めの要素が0でないところを探す
					for (let j = 0; j < m; j++) {
						if (j !== i && matrix.matrix[j][n] !== 0) {
							// i行目j行目を切り出す(とりあえず約分しておく)
							let row_i = Vec.cancel(matrix.matrix[i]);
							let row_j = Vec.cancel(matrix.matrix[j]);
							// in成分とjn成分の最小公倍数をとる
							const _in = row_i[n];
							const _jn = row_j[n];
							const lcm_injn = lcm(_in, _jn);
							// i行目、j行目を適当に整数倍する
							row_i = row_i.map(elem => elem * lcm_injn / _in);
							row_j = row_j.map(elem => elem * lcm_injn / _jn);
							// j行目をi行目を使って整理する
							if (_in > 0 && _jn > 0) {
								row_j = Vec.sub(row_i, row_j);
							} else {
								row_j = Vec.add(row_i, row_j);
							}
							// もとの行列に整理されたj行目を書き込む
							// 書き込む前に約分する
							matrix.matrix[j] = Vec.cancel(row_j);
							matrix.matrix[i] = row_i;
							// ピボットを記録
							pivots.push([i + 1, j + 1]);
							if (option.rapid) {
								// option.rapidフラグが立っている場合、他の行に対しても計算を続ける
								continue;
							} else {
								// option.rapid == falseのとき、forループを抜けて計算を終了する
								break;
							}
						}
					}
					// 計算が終わったのでwhileループを抜け出す
					break;
				}
			}
			break;
		}
	}
	return {
		matrix: matrix,
		pivots: pivots
	}
}

class Gyolets {
	matrix: number[][];
	rowSize: number;
	columnSize: number;
	options: elementaryRowOperationOption;

	constructor(_matrix: number[][], _matrixSize: { row: number, column: number }, _options?: elementaryRowOperationOption) {
		this.matrix = _matrix;
		this.rowSize = _matrixSize.row;
		this.columnSize = _matrixSize.column;
		this.options = _options || {
			rapid: false // defaultはfalse
		};
	}

	log = () => {
		this.matrix.forEach(row => {
			console.log(row.join("\t"));
		})
	}

	rowReduction = () => {
		const _processed = elementaryRowOperation(this, this.options);
		// 終了条件
		// 入力と出力がイコールになったら(あるいはpivots = []となったら)
		if (_processed.pivots[0] === undefined) {
			console.log("簡約化は終了しました");
		} else {
			// 行基本変形を行なった行列を表示
			_processed.matrix.log();
			// ピボットを表示
			console.log(_processed.pivots);
			// 再び計算を行なう
			this.matrix = _processed.matrix.matrix;
			this.rowReduction();
		}
	}
}

const a = new Gyolets([[2, -1, 5], [0, 2, 2], [1, 0, 3]], {
	row: 3,
	column: 3
}, { rapid: false });
a.rowReduction();