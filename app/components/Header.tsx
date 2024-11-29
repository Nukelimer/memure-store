"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import Form from "next/form";
import Image from "next/image";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PackageIcon,
  TrolleyIcon,
} from "@sanity/icons";
import { useBasketStore } from "@/store/store";

function Header() {
  const { user } = useUser();
  const [toggleMore, setToggleMore] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const time = new Date().getHours();
  const greetUser =
    time < 12
      ? "Good morning,"
      : time < 16
        ? "Good Afternoon,"
        : "Good Evening,";

  async function createClerkPaskeyHandler() {
    try {
      const response = await user?.createPasskey();
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  }

  const handleToggle = () => {
    // Start animation
    setIsAnimating(true);

    // Delay the state change to switch the icon after 300ms
    setTimeout(() => {
      setToggleMore((prev) => !prev);
      setIsAnimating(false); // End animation after the delay
    }, 300);
  };

  return (
    <header>
      <div className="flex flex-wrap justify-between items-center px-4 py-1 shadow border">
        <div className="flex justify-center mx-auto">
          <Link href={"/"}>
            <Image
              height={2000}
              width={2000}
              src={"/logo.png"}
              alt="logo"
              className="h-28 w-28 max-w-[100px] max-h-[100px]"
            />
          </Link>
        </div>

        <Form
          action={"/search"}
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0 border">
          <input
            type="text"
            name="query"
            placeholder="search item"
            className="bg-gray-50 text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-45 border w-full max-w-4xl md:max-w-full border-none"
          />
        </Form>

        <div className="w-full sm:w-auto">
          <ClerkLoaded>
            {user ? (
              <>
                <div className="flex items-center space-x-2 justify-center mt-2">
                  <UserButton />

                  <div className=" sm:block text-xs">
                    <p className="text-gray-600">{greetUser}</p>
                    <p className="font-bold">{user.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center transition-opacity duration-500 ">
                  <div
                    className={` mx-auto ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-300`}>
                    {toggleMore ? (
                      <ChevronDownIcon
                        color="green"
                        className="w-8 h-8 flex mx-auto"
                        onClick={handleToggle}
                      />
                    ) : (
                      <ChevronUpIcon
                        color="green"
                        className="w-8 h-8 flex mx-auto"
                        onClick={handleToggle}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
                <div className=" flex flex-col gap-2 ">
                  <span className=" bg-green-500 rounded py-1 px-4 text-center text-white animate-pulse ">

                <SignInButton mode="modal" />

                  </span>
                <Link
                  className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-800 text-white font-bold py-1 px-4 rounded"
                  href={"/basket"}>
                  <TrolleyIcon className="w-8 h-8" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                  <p className="">My Cart </p>
                </Link>
              </div>
            )}
            <div className="sm:absolute right-3 z-50">
              {toggleMore && (
                <div className="">
                  <Link
                    className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                    href={"/basket"}>
                    <TrolleyIcon className="w-8 h-8" />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {itemCount}
                    </span>
                    <p className="">My Cart </p>
                  </Link>
                  <SignedIn>
                    <Link
                      href={"/orders"}
                      className="flex relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded mt-2">
                      <PackageIcon className="w-6 h-6" />
                      <span>My Orders.</span>
                    </Link>
                  </SignedIn>
                </div>
              )}

              {toggleMore && (
                <div className="">
                  {user?.passkeys.length === 0 && (
                    <button
                      onClick={createClerkPaskeyHandler}
                      className="bg-white hover:bg-green-800 hover:text-white animate-pulse text-green-500 font-bold py-2 px-4 rounded border-green-300 border mt-2">
                      Create a Passkey.
                    </button>
                  )}
                </div>
              )}
            </div>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
