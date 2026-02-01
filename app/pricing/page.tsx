import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for a single room refresh with essential guidance.",
    features: [
      "1 room capture",
      "1 AI layout concept",
      "Design summary PDF",
      "Email support",
    ],
    cta: "Get Starter",
    highlighted: false,
  },
  {
    name: "Studio",
    price: "$79",
    description: "Our most popular tier for complete room planning.",
    features: [
      "Up to 3 room captures",
      "3 AI layout concepts",
      "Shopping list + sourcing links",
      "Priority support",
    ],
    cta: "Choose Studio",
    highlighted: true,
  },
  {
    name: "Signature",
    price: "$149",
    description: "Best for full-room transformation and concierge support.",
    features: [
      "Unlimited room captures",
      "5 AI layout concepts",
      "Procurement & logistics guidance",
      "1:1 design consult",
    ],
    cta: "Go Signature",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[#1A73E8]">Pricing</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mt-2">
              Choose the plan that fits your project
            </h1>
            <p className="text-slate-600 mt-3">
              Flexible pricing for quick refreshes or full transformations. Upgrade anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`p-6 border ${
                  tier.highlighted
                    ? "border-[#1A73E8] shadow-lg bg-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                {tier.highlighted && (
                  <div className="text-xs font-semibold text-[#1A73E8] uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h2 className="text-xl font-semibold text-slate-900 mt-2">{tier.name}</h2>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-semibold text-slate-900">{tier.price}</span>
                  <span className="text-sm text-slate-500">/ room</span>
                </div>
                <p className="text-sm text-slate-600 mt-3">{tier.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block mt-6">
                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? "bg-[#1A73E8] hover:bg-[#1668cc] text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-white border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Need a custom plan?</h2>
                <p className="text-slate-600 mt-2">
                  Talk with our team about multi-room transformations and concierge services.
                </p>
              </div>
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
