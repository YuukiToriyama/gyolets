import { Vec, lcm } from "./utils";

interface elementaryRowOperationOption {
	rapid: boolean // trueを指定すると同時に複数の行に足し引きするようになる
}
/**
 * function elementaryRowOperation
 * 行基本変形を進めるための関数です。
 * @param matrix 変形を行ないたい行列オブジェクトを指定します
 * @param option 行基本変形に際してオプションを指定します
 * @returns 行基本変形を施した行列オブジェクトとピボット(変形時にどの行に注目したかのヒント)を返します
 */
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
							// 絶対値で_in,_jnが等しいときは最小公倍数をとる必要がなく単純に足し引きすれば良い
							// 異なる場合だけ最小公倍数を計算する
							if (Math.abs(_in) !== Math.abs(_jn)) {
								const lcm_injn = lcm(_in, _jn);
								// i行目、j行目を適当に整数倍する
								row_i = row_i.map(elem => elem * lcm_injn / _in);
								row_j = row_j.map(elem => elem * lcm_injn / _jn);
							}
							// j行目をi行目を使って整理する
							if (_in * _jn > 0) {
								row_j = Vec.sub(row_i, row_j);
							} else {
								row_j = Vec.add(row_i, row_j);
							}
							// もとの行列に整理されたj行目を書き込む
							// 書き込む前に約分する
							matrix.matrix[j] = Vec.cancel(row_j);
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

export interface GyoletsConstructorOptions extends elementaryRowOperationOption {
	verbose?: boolean // trueにすると計算過程を表示するようになる
}
/**
 * Gyoletsクラス
 * 行列オブジェクトを作成します。
 */
export default class Gyolets {
	matrix: number[][];
	rowSize: number;
	columnSize: number;
	options: GyoletsConstructorOptions;
	isReduced: boolean;
	/**
	 * コンストラクタ
	 * @param matrix 配列オブジェクトに変換したい二次元配列を指定します
	 * @param matrixSize 二次元配列の大きさを指定します
	 * @param options オプションを指定します
	 * @param isReduced (ユーザーが指定する必要はありません)
	 */
	constructor(matrix: number[][], matrixSize: { row: number, column: number }, options?: GyoletsConstructorOptions, isReduced?: boolean) {
		this.matrix = matrix;
		this.rowSize = matrixSize.row;
		this.columnSize = matrixSize.column;
		this.options = {
			rapid: options!!.rapid ? true : false, // defaultはfalse
			verbose: options!!.verbose ? true : false // defaultはtrue
		};
		this.isReduced = isReduced || false;
	}

	/**
	 * Gyolets.toArray()
	 * Gyoletsオブジェクトを二次元配列に変換します
	 */
	toArray = (): number[][] => {
		return this.matrix;
	}

	/**
	 * Gyolets.toString()
	 * 行列をコンソールに出力します。
	 */
	toString = (): string => {
		return this.matrix.map(row => row.join("\t")).join("\n");
	}

	/**
	 * Gyolets.reduction()
	 * 行基本変形を繰り返し行列の簡約化を行ないます。
	 * @returns 簡約化済みの行列オブジェクトを返します
	 */
	reduction = (): Gyolets => {
		const _processed = elementaryRowOperation(this, this.options);
		// verboseオプションがonになっている場合
		if (this.options.verbose === true) {
			// ピボットを表示
			console.log(_processed.pivots);
			// 行基本変形を行なった行列を表示
			console.log(_processed.matrix.toString());
		}
		// 変形が手詰まりになったらisReducedのフラグを建てる
		if (_processed.pivots[0] === undefined) {
			this.isReduced = true;
			console.log("簡約化は終了しました");
		}
		return this.isReduced ? this : this.reduction();
	}
}