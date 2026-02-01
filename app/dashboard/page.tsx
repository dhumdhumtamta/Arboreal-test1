"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Camera, Package, Sparkles, ChevronRight, Home, ImagePlus, User, Settings, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73E8]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-slate-600">
              Ready to transform your space? Let's get started.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Projects</p>
                  <p className="text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-[#1A73E8]" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed Designs</p>
                  <p className="text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Orders in Progress</p>
                  <p className="text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Start New Project Card */}
            <Card className="p-6 border-2 border-[#1A73E8] bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-[#1A73E8] flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Start a New Project
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Capture your room and let our AI design your dream space in minutes
                  </p>
                  <Link href="/capture">
                    <Button className="w-full sm:w-auto bg-[#1A73E8] hover:bg-[#1668cc] text-white">
                      Capture Room
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Browse Inspiration Card */}
            <Card className="p-6 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Browse Inspiration
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Explore completed projects and design ideas from our community
                  </p>
                  <Link href="/#showcase">
                    <Button variant="outline" className="w-full sm:w-auto border-slate-200 hover:bg-slate-50">
                      View Gallery
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* How It Works Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              How Arboreal Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-5 bg-white border border-slate-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Camera className="h-5 w-5 text-[#1A73E8]" />
                </div>
                <div className="text-xs font-semibold text-[#1A73E8] mb-1">STEP 1</div>
                <h3 className="font-semibold text-slate-900 mb-2">Capture Your Room</h3>
                <p className="text-sm text-slate-600">
                  Take a photo of your empty room or upload an existing image
                </p>
              </Card>

              <Card className="p-5 bg-white border border-slate-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-xs font-semibold text-purple-600 mb-1">STEP 2</div>
                <h3 className="font-semibold text-slate-900 mb-2">AI Design Generation</h3>
                <p className="text-sm text-slate-600">
                  Our AI generates custom furniture layouts and designs
                </p>
              </Card>

              <Card className="p-5 bg-white border border-slate-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-xs font-semibold text-green-600 mb-1">STEP 3</div>
                <h3 className="font-semibold text-slate-900 mb-2">Order & Logistics</h3>
                <p className="text-sm text-slate-600">
                  We source every item and handle all procurement and delivery
                </p>
              </Card>

              <Card className="p-5 bg-white border border-slate-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Home className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-xs font-semibold text-orange-600 mb-1">STEP 4</div>
                <h3 className="font-semibold text-slate-900 mb-2">Professional Install</h3>
                <p className="text-sm text-slate-600">
                  Our team delivers and installs everything in 15 days
                </p>
              </Card>
            </div>
          </div>

          {/* Your Projects Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your Projects
              </h2>
              <Link href="/capture" className="text-sm text-[#1A73E8] hover:underline font-medium">
                View All
              </Link>
            </div>
            
            <Card className="p-12 border border-dashed border-slate-300 bg-white">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <ImagePlus className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Start your first project by capturing a room photo. We'll help you visualize and build your dream space.
                </p>
                <Link href="/capture">
                  <Button className="bg-[#1A73E8] hover:bg-[#1668cc] text-white">
                    <Camera className="mr-2 h-4 w-4" />
                    Start Your First Project
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Orders Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Recent Orders
              </h2>
            </div>
            
            <Card className="p-12 border border-slate-200 bg-white">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Once you finalize a design, you'll see your orders and delivery tracking here.
                </p>
              </div>
            </Card>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Account Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">Profile Information</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {session?.user?.name}<br/>
                      {session?.user?.email}
                    </p>
                    <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">Preferences</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Manage notifications, billing, and account settings
                    </p>
                    <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                      Manage Settings
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
