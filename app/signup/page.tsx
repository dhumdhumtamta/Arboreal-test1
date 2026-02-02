"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setError("")

    try {
      // Register user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || "Something went wrong")
        setIsLoading(false)
        return
      }

      // Auto sign in after successful registration
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError("Account created but sign in failed. Please try logging in.")
        setIsLoading(false)
      } else if (signInResult?.ok) {
        // Successful sign in - manually redirect
        router.push("/dashboard")
      } else {
        setError("Account created but sign in failed. Please try logging in.")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-md bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium text-lg">
            A
          </div>
          <span className="text-2xl font-medium tracking-tight">Arboreal</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">Create your account</h1>
            <p className="text-sm text-slate-600">Start building your dream space today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-900">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="h-11 border-slate-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="h-11 border-slate-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-900">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-11 border-slate-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
              />
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-900">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="h-11 border-slate-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-[#1A73E8] hover:bg-[#1668cc] text-white font-medium"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1A73E8] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          By continuing, you agree to Arboreal's{" "}
          <Link href="#" className="underline hover:text-slate-700">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="underline hover:text-slate-700">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
