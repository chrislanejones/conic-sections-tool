export const calculateParabolaFocus = (a: number, h: number, k: number) => {
  const p = 1 / (4 * a);
  return { x: h, y: k + p };
};

export const calculateParabolaDirectrix = (a: number, k: number) => {
  const p = 1 / (4 * a);
  return k - p;
};

export const calculateEllipseFoci = (
  a: number,
  b: number,
  h: number,
  k: number
) => {
  const c = Math.sqrt(Math.abs(a * a - b * b));
  const isHorizontal = a > b;

  if (isHorizontal) {
    return [
      { x: h - c, y: k },
      { x: h + c, y: k },
    ];
  } else {
    return [
      { x: h, y: k - c },
      { x: h, y: k + c },
    ];
  }
};

export const calculateHyperbolaFoci = (
  a: number,
  b: number,
  h: number,
  k: number
) => {
  const c = Math.sqrt(a * a + b * b);
  return [
    { x: h - c, y: k },
    { x: h + c, y: k },
  ];
};

export const generateParabolaPoints = (
  a: number,
  h: number,
  k: number,
  range: number = 10
) => {
  const points = [];
  for (let x = -range; x <= range; x += 0.1) {
    const y = a * Math.pow(x - h, 2) + k;
    if (Math.abs(y) <= 20) {
      points.push({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(2)) });
    }
  }
  return points;
};

export const generateEllipsePoints = (
  a: number,
  b: number,
  h: number,
  k: number
) => {
  const points = [];
  for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
    const x = a * Math.cos(t) + h;
    const y = b * Math.sin(t) + k;
    if (Math.abs(x) <= 15 && Math.abs(y) <= 15) {
      points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
    }
  }
  return points;
};

export const generateHyperbolaPoints = (
  a: number,
  b: number,
  h: number,
  k: number
) => {
  const points = [];

  // Right branch
  for (let t = -3; t <= 3; t += 0.1) {
    const x = a * Math.cosh(t) + h;
    const y = b * Math.sinh(t) + k;
    if (Math.abs(x) <= 15 && Math.abs(y) <= 15) {
      points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
    }
  }

  // Left branch
  for (let t = -3; t <= 3; t += 0.1) {
    const x = -a * Math.cosh(t) + h;
    const y = b * Math.sinh(t) + k;
    if (Math.abs(x) <= 15 && Math.abs(y) <= 15) {
      points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
    }
  }

  return points;
};
