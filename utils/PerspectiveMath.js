export function createPerspectiveMatrix(W, H, tl, tr, bl, br) {
  const src = [
    { x: -W/2, y: -H/2 },
    { x: W/2, y: -H/2 },
    { x: -W/2, y: H/2 },
    { x: W/2, y: H/2 }
  ];
  const dst = [
    { x: tl.x - W/2, y: tl.y - H/2 },
    { x: tr.x - W/2, y: tr.y - H/2 },
    { x: bl.x - W/2, y: bl.y - H/2 },
    { x: br.x - W/2, y: br.y - H/2 }
  ];

  const a = [];
  for (let i = 0; i < 4; i++) {
    a.push([src[i].x, src[i].y, 1, 0, 0, 0, -src[i].x * dst[i].x, -src[i].y * dst[i].x]);
    a.push([0, 0, 0, src[i].x, src[i].y, 1, -src[i].x * dst[i].y, -src[i].y * dst[i].y]);
  }

  const b = [];
  for (let i = 0; i < 8; i++) {
    b.push(i % 2 === 0 ? dst[i/2].x : dst[Math.floor(i/2)].y);
  }

  const h = solve(a, b);
  h.push(1); // h33 = 1

  return [
    h[0], h[3], 0, h[6],
    h[1], h[4], 0, h[7],
    0,    0,    1, 0,
    h[2], h[5], 0, h[8]
  ];
}

function solve(a, b) {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let maxEl = Math.abs(a[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(a[k][i]) > maxEl) {
        maxEl = Math.abs(a[k][i]);
        maxRow = k;
      }
    }
    for (let k = i; k < n; k++) {
      let tmp = a[maxRow][k];
      a[maxRow][k] = a[i][k];
      a[i][k] = tmp;
    }
    let tmp = b[maxRow];
    b[maxRow] = b[i];
    b[i] = tmp;

    if (Math.abs(a[i][i]) < 1e-10) {
      return [1, 0, 0, 0, 1, 0, 0, 0];
    }

    for (let k = i + 1; k < n; k++) {
      let c = -a[k][i] / a[i][i];
      for (let j = i; j < n; j++) {
        if (i === j) {
          a[k][j] = 0;
        } else {
          a[k][j] += c * a[i][j];
        }
      }
      b[k] += c * b[i];
    }
  }

  let x = new Array(n).fill(0);
  for (let i = n - 1; i > -1; i--) {
    x[i] = b[i] / a[i][i];
    for (let k = i - 1; k > -1; k--) {
      b[k] -= a[k][i] * x[i];
    }
  }
  return x;
}
