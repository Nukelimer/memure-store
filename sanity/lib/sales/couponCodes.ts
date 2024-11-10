// import { COUPON_CODES } from "./couponCodes";
export const COUPON_CODES = {
  RXMI: "RXMI",
  XMAS2021: "XMAS",
  NY2022: "NY2022",
} as const;

export type COUPON_CODES = keyof typeof COUPON_CODES;
