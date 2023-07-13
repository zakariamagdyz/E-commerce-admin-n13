"use client"
import Image from "next/image"
import { useSession } from "next-auth/react"
import React from "react"

function UserInfo() {
  const { data } = useSession()
  if (!data?.user) return null
  return (
    <section className="mx-auto mt-5 grid w-80 place-items-center">
      {data.user.image && (
        <Image
          src={data.user.image}
          alt={data.user.name || "user"}
          width={80}
          height={80}
          className="rounded-full"
        />
      )}
      <p>{data?.user?.name}</p>
    </section>
  )
}

export default UserInfo
