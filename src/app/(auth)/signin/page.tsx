"use client"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import React from "react"

import { Button } from "@/components/ui/button"

function SignIn() {
  return (
    <section className="grid min-h-screen place-content-center">
      <h1 className="mb-8 text-4xl font-bold">Sign in</h1>
      <Button size={"lg"} onClick={() => signIn("github", { callbackUrl: "/" })}>
        <Github className="mr-2" size={30} />
        Sign in with Github
      </Button>
    </section>
  )
}

export default SignIn
