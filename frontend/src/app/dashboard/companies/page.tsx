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
  Link,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  },  {
    id: 6,
    name: "DataViz Analytics",
    industry: "Technology",
    employees: 320,
    location: "Seattle, WA",
    website: "dataviz.com",
    revenue: "$5M - $10M",
    founded: 2020,
    description: "Advanced data visualization and business intelligence tools",
  },  {
    id: 7,
    name: "DataViz Analytics",
    industry: "Technology",
    employees: 320,
    location: "Seattle, WA",
    website: "dataviz.com",
    revenue: "$5M - $10M",
    founded: 2020,
    description: "Advanced data visualization and business intelligence tools",
  },  {
    id: 8,
    name: "DataViz Analytics",
    industry: "Technology",
    employees: 320,
    location: "Seattle, WA",
    website: "dataviz.com",
    revenue: "$5M - $10M",
    founded: 2020,
    description: "Advanced data visualization and business intelligence tools",
  }
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
    <div className="flex flex-col">
      {/* Upper Bar */}
      <div className="border-b py-4 px-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="heading-2">Companies</h1>
            <span className="text-small px-3 py-1 font-medium">
              {dummyCompanies.length} results
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--color-text-secondary)" }}
              />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 pr-4 py-2.5 w-80"
              />
            </div>

            {/* Import Button */}
            <button onClick={handleImport} className="btn-primary flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 md:flex-row flex-col">
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
        <div className="flex-1 flex flex-col min-h-0 card overflow-auto max-h-[73vh]">
          <div className="flex-1 overflow-auto">
            <Table className="w-full min-w-[1200px]">
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Founded</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyCompanies.map((company, index) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div
                            className="h-10 w-10 rounded-lg flex items-center justify-center"
                           
                          >
                            <Building2 className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="ml-4 min-w-0">
                          <div className="text-body font-semibold">{company.name}</div>
                          <div className="text-body-secondary truncate max-w-xs">{company.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-small font-medium"
                       
                      >
                        {company.industry}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-body font-medium">
                        <Users className="h-4 w-4 mr-2" style={{ color: "var(--color-text-secondary)" }} />
                        {formatEmployeeCount(company.employees)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-body-secondary">
                        <MapPin className="h-4 w-4 mr-2" style={{ color: "var(--color-text-secondary)" }} />
                        {company.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-body font-medium">{company.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-body-secondary">
                        <Calendar className="h-4 w-4 mr-2" style={{ color: "var(--color-text-secondary)" }} />
                        {company.founded}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        className="flex items-center gap-1 font-medium btn-primary"
                      >
                        <Link className="h-3 w-3" />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {dummyCompanies.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12" style={{ color: "var(--color-text-secondary)" }} />
                <h3 className="mt-2 text-body font-medium">No companies found</h3>
                <p className="mt-1 text-body-secondary">
                  Try adjusting your search or filters to find what youre looking for.
                </p>
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          <div
            className="px-6 py-4 flex items-center justify-between flex-shrink-0"
          >
            <div className="flex items-center gap-4">
              <span className="text-body-secondary">
                Showing <span className="font-medium">1</span> to <span className="font-medium">25</span> of{" "}
                <span className="font-medium">{dummyCompanies.length}</span> results
              </span>
              <select className="input px-3 py-1 text-small">
                <option>25 per page</option>
                <option>50 per page</option>
                <option>100 per page</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn-primary flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                <button className="btn-primary px-3 py-2">1</button>
                <button className="btn-primary px-3 py-2">2</button>
                <button className="btn-primary px-3 py-2">3</button>
                <span className="px-2" style={{ color: "var(--color-text-secondary)" }}>
                  ...
                </span>
                <button className="btn-primary px-3 py-2">10</button>
              </div>

              <button className="btn-primary flex items-center gap-1">
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
