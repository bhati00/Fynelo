"use client"

import type React from "react"
import { useState } from "react"
import {
  Search,
  Upload,
  Building2,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock ProspectFilter component (replace with your actual import)
import ProspectFilter, { type ProspectFilterValues } from "@/components/shared/filters/prospectFilter"

// Dummy company data
const dummyCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    employees: 1250,
    location: "San Francisco, CA",
    website: "techcorp.com",
    revenue: "$50M - $100M",
    founded: 2015,
    description: "Leading AI and machine learning solutions provider",
  },
  {
    id: 2,
    name: "HealthPlus Medical",
    industry: "Healthcare",
    employees: 750,
    location: "Boston, MA",
    website: "healthplus.com",
    revenue: "$25M - $50M",
    founded: 2012,
    description: "Digital healthcare platform and telemedicine services",
  },
  {
    id: 3,
    name: "FinanceFlow Inc",
    industry: "Finance",
    employees: 2100,
    location: "New York, NY",
    website: "financeflow.com",
    revenue: "$100M - $500M",
    founded: 2008,
    description: "Comprehensive financial management and investment platform",
  },
  {
    id: 4,
    name: "EcoGreen Energy",
    industry: "Energy",
    employees: 450,
    location: "Austin, TX",
    website: "ecogreen.com",
    revenue: "$10M - $25M",
    founded: 2018,
    description: "Renewable energy solutions and sustainability consulting",
  },
  {
    id: 5,
    name: "DataViz Analytics",
    industry: "Technology",
    employees: 320,
    location: "Seattle, WA",
    website: "dataviz.com",
    revenue: "$5M - $10M",
    founded: 2020,
    description: "Advanced data visualization and business intelligence tools",
  },
  // ... more dummy data for better scrolling demonstration
]

const CompaniesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<ProspectFilterValues>({
    icpId: 0,
    minRevenue: 0,
    maxRevenue: 0,
    fundingStage: 0,
    technology: "",
    fundingAmount: 0,
  })

  const handleImport = () => {
    console.log("Import companies clicked")
  }

  const formatEmployeeCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Upper Bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
              {dummyCompanies.length} results
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Import Button */}
            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-sm"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Side - ProspectFilter */}
        <ProspectFilter
          onFilterChange={(updatedFilters) => setFilters(updatedFilters as unknown as ProspectFilterValues)}
          onApply={() => {
            console.log("Final filters: ", filters)
            // send filters to backend
          }}
          pageType="companies"
        />

        {/* Table Container with proper scrolling only on table content */}
        <div className="flex-1 flex flex-col min-h-0 bg-white overflow-auto">
          <div className="flex-1 overflow-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Founded
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyCompanies.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4 min-w-0">
                          <div className="text-sm font-semibold text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{company.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {company.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 font-medium">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        {formatEmployeeCount(company.employees)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        {company.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{company.revenue}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {company.founded}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition-colors">
                        <ExternalLink className="h-3 w-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {dummyCompanies.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters to find what youre looking for.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">25</span> of{" "}
                <span className="font-medium">{dummyCompanies.length}</span> results
              </span>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>25 per page</option>
                <option>50 per page</option>
                <option>100 per page</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  10
                </button>
              </div>

              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompaniesPage
