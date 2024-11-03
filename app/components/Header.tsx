'use client'

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
    const { user } = useUser()

  return (
    <div>
          <Link href={'/'}>
          
          </Link>
    </div>
  );
}

export default Header;
