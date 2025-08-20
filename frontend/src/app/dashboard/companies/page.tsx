'use client';

import React, { useState, useMemo } from 'react';
import { Search, Upload, Building2, MapPin, Users, Calendar, ExternalLink, Filter } from 'lucide-react';

// Mock ProspectFilter component (replace with your actual import)
import ProspectFilter from '@/components/shared/filters/prospectFilter';

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
    description: "Leading AI and machine learning solutions provider"
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
    description: "Digital healthcare platform and telemedicine services"
  },
  {
    id: 3,
    name: "FinanceFlow Inc",
    industry: "Finance",
    employees: 500,
    location: "New York, NY",
    website: "financeflow.com",
    revenue: "$10M - $25M",
    founded: 2018,
    description: "Automated financial planning and investment management"
  },
  {
    id: 4,
    name: "RetailMax Systems",
    industry: "Retail",
    employees: 2500,
    location: "Chicago, IL",
    website: "retailmax.com",
    revenue: "$100M - $500M",
    founded: 2008,
    description: "E-commerce platform and retail management solutions"
  },
  {
    id: 5,
    name: "GreenEnergy Co",
    industry: "Technology",
    employees: 300,
    location: "Austin, TX",
    website: "greenenergy.com",
    revenue: "$5M - $10M",
    founded: 2020,
    description: "Renewable energy solutions and smart grid technology"
  },
  {
    id: 6,
    name: "DataVault Security",
    industry: "Technology",
    employees: 150,
    location: "Seattle, WA",
    website: "datavault.com",
    revenue: "$1M - $5M",
    founded: 2019,
    description: "Cybersecurity and data protection services"
  },
  {
    id: 7,
    name: "MedDevice Innovations",
    industry: "Healthcare",
    employees: 425,
    location: "San Diego, CA",
    website: "meddevice.com",
    revenue: "$15M - $25M",
    founded: 2016,
    description: "Medical device manufacturing and biotechnology"
  },
  {
    id: 8,
    name: "CryptoTrade Platform",
    industry: "Finance",
    employees: 200,
    location: "Miami, FL",
    website: "cryptotrade.com",
    revenue: "$5M - $10M",
    founded: 2021,
    description: "Cryptocurrency trading platform and blockchain solutions"
  }
];

const CompaniesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [companies] = useState(dummyCompanies);



  const handleFilterChange = (newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
  };

  const handleImport = () => {
    // Handle import functionality
    console.log('Import companies clicked');
  };

  const formatEmployeeCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Upper Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
               results
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
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Import Button */}
            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - ProspectFilter */}
        <ProspectFilter
          onFilterChange={handleFilterChange}
          pageType="companies"
        />

        {/* Right Side - Companies Table */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            <div className="bg-white">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Founded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {company.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {company.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {company.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          {formatEmployeeCount(company.employees)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {company.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          {company.founded}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
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
                    Try adjusting your search or filters to find what you looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;