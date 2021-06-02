class Gyolets extends Array {
	matrix: number[][];
	rowSize: number;
	columnSize: number;

	constructor(_matrix: number[][], _matrixSize: { row: number, column: number }) {
		super();
		this.matrix = _matrix;
		this.rowSize = _matrixSize.row;
		this.columnSize = _matrixSize.column;
	}

	log = () => {
		this.matrix.forEach(row => {
			console.log(row.join("\t"));
		})
	}
}

const a = new Gyolets([[1, 20, 3], [4, 5, 6]], {
	row: 2,
	column: 3
});
console.log(a.log());