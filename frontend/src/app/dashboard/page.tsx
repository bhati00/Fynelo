import Link from "next/link"
import { Target, Search, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="card card-surface flex flex-col gap-8">
        <div className="pb-8">
          <h1 className="heading-1 mb-4">How to Generate Leads Using Fynelo</h1>
        </div>

        <div className="p-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card flex flex-col justify-between h-full transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group">
              {/* Brand accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-200 group-hover:h-1.5 bg-gradient-to-r from-orange-500 to-yellow-500" />

              <div className="pt-6 px-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6 text-brand-orange" />
                  <h3 className="heading-3">1. Create the ICPs</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between flex-grow pt-0 px-6 pb-6">
                <p className="text-body-secondary mb-6">
                  Define your Ideal Customer Profiles (ICPs) by specifying industry, company size, location, and other
                  relevant filters so Fynelo can target the right prospects.
                </p>
                <div className="flex justify-end">
                  <Link href="/dashboard/icp" className="btn-brand">
                    Start ICP
                  </Link>
                </div>
              </div>
            </div>

            <div className="card flex flex-col justify-between h-full transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group">
              {/* Brand accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-200 group-hover:h-1.5 bg-gradient-to-r from-orange-500 to-yellow-500" />

              <div className="pt-6 px-6">
                <div className="flex items-center gap-3 mb-2">
                  <Search className="w-6 h-6 text-brand-orange" />
                  <h3 className="heading-3">2. Search Companies</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between flex-grow pt-0 px-6 pb-6">
                <p className="text-body-secondary mb-6">
                  Use Fynelo advanced search to find companies matching your ICPs. Apply filters and access enriched
                  company profiles instantly.
                </p>
                <div className="flex justify-end">
                  <Link href="/companies" className="btn-brand">
                    Find Companies
                  </Link>
                </div>
              </div>
            </div>

            <div className="card flex flex-col justify-between h-full transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group">
              {/* Brand accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-200 group-hover:h-1.5 bg-gradient-to-r from-orange-500 to-yellow-500" />

              <div className="pt-6 px-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-brand-orange" />
                  <h3 className="heading-3">3. Generate Leads</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between flex-grow pt-0 px-6 pb-6">
                <p className="text-body-secondary mb-6">
                  From your selected companies, Fynelo automatically generates qualified leads with verified contact
                  information — ready for outreach.
                </p>
                <div className="flex justify-end">
                  <Link href="/people" className="btn-brand">
                    Get Leads
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
