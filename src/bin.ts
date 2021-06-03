import Gyolets from "./main";

const a = new Gyolets([[2, -1, 5], [0, 2, 2], [1, 0, 3]], {
	row: 3,
	column: 3
}, { rapid: true, verbose: false });
const result = a.reduction();
result.log();