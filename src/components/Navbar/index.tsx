"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import React from "react"

import { Button } from "../ui/button"

function Navbar() {
  const { data, status } = useSession()

  if (status === "loading") return null
  return (
    <nav className="bg-blue-800 p-4 text-white">
      <ul className="flex justify-evenly text-2xl font-bold">
        <li>
          <Button asChild variant={"link"} className="text-white">
            <Link href="/products">product</Link>
          </Button>
        </li>
        {!data?.user && (
          <li>
            <Button asChild variant={"link"} className="text-white">
              <Link href="/signin">Sign in</Link>
            </Button>
          </li>
        )}
        {data?.user && (
          <li>
            <Button
              variant={"link"}
              className="text-white"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
