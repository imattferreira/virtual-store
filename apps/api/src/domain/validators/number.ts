interface RangeParams {
  min: number;
  max: number;
}

export function hasValidRange(num: number, { min, max }: Partial<RangeParams>) {
  if (min && num < min) {
    return false;
  }

  if (max && num > max) {
    return false;
  }

  return true;
}
