interface elementaryRowOperationOption {
	rapid: boolean // trueを指定すると同時に複数の行に足し引きするようになる
}
const elementaryRowOperation = (matrix: Gyolets, option: elementaryRowOperationOption): { matrix: Gyolets, pivot: [number, number] } => {
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
					// pivot = [m,i]
					// 他の行にm行を何倍かしたものを足し引きする
					if (option.rapid) {

					} else {

					}
					// 計算が終わったのでwhileループを抜け出す
					break;
				}
			}
		}
	}
}

class Gyolets /*extends Array*/ {
	matrix: number[][];
	rowSize: number;
	columnSize: number;

	constructor(_matrix: number[][], _matrixSize: { row: number, column: number }) {
		//super();
		this.matrix = _matrix;
		this.rowSize = _matrixSize.row;
		this.columnSize = _matrixSize.column;
	}

	log = () => {
		this.matrix.forEach(row => {
			console.log(row.join("\t"));
		})
	}

	rowReduction = (): Gyolets => {

	}
}

const a = new Gyolets([[1, 20, 3], [4, 5, 6]], {
	row: 2,
	column: 3
});
console.log(a.log());