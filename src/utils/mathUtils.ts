import type { ConicType, EllipseParameters, DataPoint } from "@/types";

export function calculateParabolaFocus(a: number, h: number, k: number) {
  const p = 1 / (4 * a);
  return { x: h, y: k + p };
}

export function calculateParabolaDirectrix(a: number, h: number, k: number) {
  const p = 1 / (4 * a);
  return k - p;
}

export const calculateEllipseFoci = (
  a: number,
  b: number,
  h: number,
  k: number
) => {
  const c = Math.sqrt(Math.abs(a * a - b * b));
  return a > b
    ? [
        { x: h - c, y: k },
        { x: h + c, y: k },
      ]
    : [
        { x: h, y: k - c },
        { x: h, y: k + c },
      ];
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
      return b ? Math.sqrt(Math.abs(a * a - b * b)) / Math.max(a, b) : 0;
    case "parabola":
      return 1;
    case "hyperbola":
      return b ? Math.sqrt(a * a + b * b) / a : 0;
    default:
      return 0;
  }
};

export const generateParabolaPoints = (
  a: number,
  h: number,
  k: number,
  range = 10
): DataPoint[] => {
  const points: DataPoint[] = [];
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
): DataPoint[] => {
  const points: DataPoint[] = [];
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
): DataPoint[] => {
  const points: DataPoint[] = [];

  for (let t = -3; t <= 3; t += 0.1) {
    const xRight = a * Math.cosh(t) + h;
    const yRight = b * Math.sinh(t) + k;
    const xLeft = -a * Math.cosh(t) + h;
    const yLeft = b * Math.sinh(t) + k;

    if (Math.abs(xRight) <= 15 && Math.abs(yRight) <= 15) {
      points.push({
        x: parseFloat(xRight.toFixed(2)),
        y: parseFloat(yRight.toFixed(2)),
      });
    }

    if (Math.abs(xLeft) <= 15 && Math.abs(yLeft) <= 15) {
      points.push({
        x: parseFloat(xLeft.toFixed(2)),
        y: parseFloat(yLeft.toFixed(2)),
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

  const formatNumber = (num: number): string =>
    num === Math.floor(num) ? num.toString() : num.toFixed(1);

  const formatShift = (value: number, variable: string): string =>
    value === 0
      ? variable
      : `${variable} ${value > 0 ? "-" : "+"} ${formatNumber(Math.abs(value))}`;

  const formatConstant = (value: number): string =>
    value === 0
      ? ""
      : ` ${value > 0 ? "+" : "-"} ${formatNumber(Math.abs(value))}`;

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

export const generateConicPlotData = (
  conicType: ConicType,
  { a, b, h, k }: EllipseParameters
): DataPoint[] => {
  switch (conicType) {
    case "parabola":
      return generateParabolaPoints(a, h, k);
    case "ellipse":
    case "circle":
      return generateEllipsePoints(a, b!, h, k);
    case "hyperbola":
      return generateHyperbolaPoints(a, b!, h, k);
    default:
      return [];
  }
};
