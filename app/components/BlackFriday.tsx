import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

async function BlackFriday() {
  const sale = await getActiveSaleByCouponCode("RXMI");

  console.log({ sale: sale?.isActive });

  if (!sale?.isActive) {
    return null;
  }
  return (
    <div className="bg-gradient-to-l to-green-600 from-teal-950 text-white px-6 py-16 mx-4 mt-2 rounded-lg shadow-lg ">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
            {sale.title}
          </h2>

          <p className="text-left tetx-xl sm:text-3xl font-semibold mb-6">
            {sale.description}
          </p>

          <div className="flex-1">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 ">
              <span className="font-bold text-base sm:text-xl">
                Use code:
                👉 <span className="text-yellow-900 inline-block animate-pulse">{sale.couponCode}</span> 👈
                              <span className="ml-2 font-bold text-base sm:text-xl">for {sale.discountAmount }% off.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFriday;
