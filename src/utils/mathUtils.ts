import type { DataPoint } from "@/types";

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

export const calculateEccentricity = (
  type: string,
  a: number,
  b?: number
): number => {
  switch (type) {
    case "circle":
      return 0;
    case "ellipse":
      if (!b) return 0;
      const c = Math.sqrt(Math.abs(a * a - b * b));
      return c / Math.max(a, b);
    case "parabola":
      return 1;
    case "hyperbola":
      if (!b) return 0;
      const cHyp = Math.sqrt(a * a + b * b);
      return cHyp / a;
    default:
      return 0;
  }
};

export const generateParabolaPoints = (
  a: number,
  h: number,
  k: number,
  range: number = 10
): DataPoint[] => {
  const points: DataPoint[] = [];
  for (let x = -range; x <= range; x += 0.1) {
    const y = a * Math.pow(x - h, 2) + k;
    if (Math.abs(y) <= 20) {
      points.push({
        x: parseFloat(x.toFixed(1)),
        y: parseFloat(y.toFixed(2)),
      });
    }
  }
  return points;
};

export const generateEllipsePoints = (
  a: number,
  b: number,
  h: number,
  k: number
): DataPoint[] => {
  const points: DataPoint[] = [];
  for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
    const x = a * Math.cos(t) + h;
    const y = b * Math.sin(t) + k;
    if (Math.abs(x) <= 15 && Math.abs(y) <= 15) {
      points.push({
        x: parseFloat(x.toFixed(2)),
        y: parseFloat(y.toFixed(2)),
      });
    }
  }
  return points;
};

export const generateHyperbolaPoints = (
  a: number,
  b: number,
  h: number,
  k: number
): DataPoint[] => {
  const points: DataPoint[] = [];

  // Right branch
  for (let t = -3; t <= 3; t += 0.1) {
    const x = a * Math.cosh(t) + h;
    const y = b * Math.sinh(t) + k;
    if (Math.abs(x) <= 15 && Math.abs(y) <= 15) {
      points.push({
        x: parseFloat(x.toFixed(2)),
        y: parseFloat(y.toFixed(2)),
      });
    }
  }

  // Left branch
  for (let t = -3; t <= 3; t += 0.1) {
    const x = -a * Math.cosh(t) + h;
    const y = b * Math.sinh(t) + k;
    if (Math.abs(x) <= 15 && Math.abs(y) <= 15) {
      points.push({
        x: parseFloat(x.toFixed(2)),
        y: parseFloat(y.toFixed(2)),
      });
    }
  }

  return points;
};

export const formatEquation = (
  type: string,
  params: { a: number; b?: number; h: number; k: number }
): string => {
  const { a, b, h, k } = params;

  const formatNumber = (num: number): string => {
    return num === Math.floor(num) ? num.toString() : num.toFixed(1);
  };

  const formatShift = (value: number, variable: string): string => {
    if (value === 0) return variable;
    return value > 0
      ? `${variable} - ${formatNumber(value)}`
      : `${variable} + ${formatNumber(Math.abs(value))}`;
  };

  const formatConstant = (value: number): string => {
    if (value === 0) return "";
    return value > 0
      ? ` + ${formatNumber(value)}`
      : ` - ${formatNumber(Math.abs(value))}`;
  };

  switch (type) {
    case "parabola":
      const aStr = a === 1 ? "" : a === -1 ? "-" : formatNumber(a);
      return `y = ${aStr}(${formatShift(h, "x")})²${formatConstant(k)}`;

    case "circle":
      return `(${formatShift(h, "x")})² + (${formatShift(k, "y")})² = ${formatNumber(a)}²`;

    case "ellipse":
      return `(${formatShift(h, "x")})²/${formatNumber(a)}² + (${formatShift(k, "y")})²/${formatNumber(b!)}² = 1`;

    case "hyperbola":
      return `(${formatShift(h, "x")})²/${formatNumber(a)}² - (${formatShift(k, "y")})²/${formatNumber(b!)}² = 1`;

    default:
      return "";
  }
};
