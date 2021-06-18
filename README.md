![Gyolets logo](./logo.svg)
# gyolets
## Abstract
行列の簡約化を行なうライブラリです。  
CLIツールとして使えるほか、ライブラリとして他のプログラムやWebアプリに組み込んで使うこともできます。  

## Usage
### CLI
#### Installation
```bash
$ npm install -g @toriyama/gyolets
```
#### `-m, --matrix <number[][]>`
```bash
$ gyolets -m "[[1,2,3], [4,5,6], [7,8,9]]"
```
```terminal
1	0	-1
0	1	2
0	0	0
```
#### `-v, --verbose`
```bash
$ gyolets -v -m "[[1,2,3], [4,5,6], [7,8,9]]" 
```
```terminal
1       2       3
4       5       6
7       8       9
[ [ 1, 2 ] ]
1       2       3
0       1       2
7       8       9
[ [ 1, 3 ] ]
1       2       3
0       1       2
0       1       2
[ [ 2, 1 ] ]
1       0       -1
0       1       2
0       1       2
[ [ 2, 3 ] ]
1       0       -1
0       1       2
0       0       0
[]
1       0       -1
0       1       2
0       0       0
```
#### `-l, --latex <string>`
```bash
$ node dist/bin.js -l -v -m "[[2,2,1,1,0,0], [3,1,-1,0,1,0], [4,3,1,0,0,1]]"
```
```latex
\begin{bmatrix}
        2 & 2 & 1 & 1 & 0 & 0 \\
        3 & 1 & -1 & 0 & 1 & 0 \\
        4 & 3 & 1 & 0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
        2 & 2 & 1 & 1 & 0 & 0 \\
        0 & 4 & 5 & 3 & -2 & 0 \\
        4 & 3 & 1 & 0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
        2 & 2 & 1 & 1 & 0 & 0 \\
        0 & 4 & 5 & 3 & -2 & 0 \\
        0 & 1 & 1 & 2 & 0 & -1 \\
\end{bmatrix}
\begin{bmatrix}
        4 & 0 & -3 & -1 & 2 & 0 \\
        0 & 4 & 5 & 3 & -2 & 0 \\
        0 & 1 & 1 & 2 & 0 & -1 \\
\end{bmatrix}
\begin{bmatrix}
        4 & 0 & -3 & -1 & 2 & 0 \\
        0 & 4 & 5 & 3 & -2 & 0 \\
        0 & 0 & 1 & -5 & -2 & 4 \\
\end{bmatrix}
\begin{bmatrix}
        1 & 0 & 0 & -4 & -1 & 3 \\
        0 & 4 & 5 & 3 & -2 & 0 \\
        0 & 0 & 1 & -5 & -2 & 4 \\
\end{bmatrix}
\begin{bmatrix}
        1 & 0 & 0 & -4 & -1 & 3 \\
        0 & 1 & 0 & 7 & 2 & -5 \\
        0 & 0 & 1 & -5 & -2 & 4 \\
\end{bmatrix}
\begin{bmatrix}
        1 & 0 & 0 & -4 & -1 & 3 \\
        0 & 1 & 0 & 7 & 2 & -5 \\
        0 & 0 & 1 & -5 & -2 & 4 \\
\end{bmatrix}
```

### JavaScript
```bash
npm install @toriyama/gyolets
```
```javascript
import Gyolets from "@toriyama/gyolets";
const mat = new Gyolets([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
], {row: 3, column: 3});
const reducedMat = mat.reduction({
	rapid: true,
	verbose: false
});
console.log(reducedMat.toString());
```
```console
1	0	-1
0	1	2
0	0	0
```

## Docs
For more details, see [https://yuukitoriyama.github.io/gyolets/](https://yuukitoriyama.github.io/gyolets/)

## License
MIT License

## Contribution
不具合などあればご気軽にIssueから！  
こんな機能がほしい！などのコメントもお待ちしています。

## Author
YUUKIToriyama