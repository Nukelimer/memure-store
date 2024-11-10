import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

async function BlackFriday() {
  const sale = await getActiveSaleByCouponCode("RXMI");

  console.log({ sale });

  if (!sale?.isActive) {
    return null;
  }
  return <div>Remi</div>;
}

export default BlackFriday;
