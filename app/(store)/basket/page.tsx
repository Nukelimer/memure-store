"use client";

import AddToBasketButton from "@/app/components/AddToBasketButton";
import imageUrl from "@/sanity/lib/imageUrl";
import { useBasketStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../loading";
import { SpinnerIcon } from "@sanity/icons";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};
export default function page() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader />;
  }

  const formattedTotalPrice = Number(
    useBasketStore.getState().getTotalPrice().toFixed(2)
  ).toLocaleString("en-US");

  if (groupedItems.length > 0) {
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh] bg-red-600">
      <p className="text-2xl font-bold mb-6 text-gray-800">
        <h1 className="font-bold">{user?.fullName || "Your"} Basket 🗑️</h1>
        <p className="text-gray-700 text-lg ">Your basket is empty.</p>
      </p>
    </div>;
  }
  function handleCheckout() {
    if (!isSignedIn) {
      return setIsLoading(true);
    }
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIsLoading(false);
      console.log("....");
    }, 5000);

    const metadata: Metadata = {
      orderNumber: crypto.randomUUID(),
      customerName: user?.fullName ?? "User",
      customerEmail: user?.emailAddresses[0] ?? "Null",
      clerkUserId: user!.id,
    };
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl ">
      <h1 className="text-2xl font-bold mb-4">
        {user?.fullName || "Your"} Basket 🗑️
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item, idx) => {
            const formattedPrice = Number(
              ((item.product.price ?? 0) * item.quantity).toFixed(2)
            ).toLocaleString();

            return (
              <div
                key={item.product._id}
                className="mb-4 p-4 border rounded flex items-center justify-between">
                <div
                  className="flex items-center cursor-pointer flex-1 min-w-0"
                  onClick={() =>
                    router.push(`/product/${item.product.slug?.current}`)
                  }>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                    {item.product.image && (
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name || "Image"}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                      {item.product.name}
                    </h2>

                    <p className="text-sm sm:text-base">
                      Price: ₦{formattedPrice}
                    </p>
                  </div>
                </div>
                <div className="flex items-center ml-4 flex-shrink-0">
                  <AddToBasketButton product={item.product} disabled={false} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold ">Order Summary</h3>

          <div className="space-y-4 mt-4">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>

            <p className="flex justify-between text-2xl font-bold border-t pt-2 ">
              <span>Total</span>
              <span className="">₦{formattedTotalPrice}</span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className={`mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-500 ${isLoading && "opacity-70"}`}>
              {isLoading ? (
                <span className="flex flex-row items-center gap-2 justify-center">
                  Processing...{" "}
                  <SpinnerIcon color="white" className="animate-spin h-4 w-4" />
                </span>
              ) : (
                "Checkout"
              )}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-yellow-200 text-white px-4 py-2 rounded hover:bg-yellow-400">
                Sign In to Checkout
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
