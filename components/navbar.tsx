"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <header className="w-full border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium">A</div>
            <span className="text-lg font-medium tracking-tight">Arboreal</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-700">
          <Link href="/dashboard" className="hover:underline">Platform</Link>
          <Link href="/showcase" className="hover:underline">Showcase</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-9 w-20 bg-slate-100 animate-pulse rounded-full" />
          ) : session ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600">
                {session.user?.name}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => signOut()}
                className="h-9 px-4 rounded-full border-slate-200 hover:bg-slate-50"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-4 rounded-full border-slate-200 hover:bg-slate-50"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="h-9 px-4 rounded-full bg-[#1A73E8] hover:bg-[#1668cc] text-white text-sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
