"use client";

import { useEffect, useState } from "react";
import { ICPProfile } from "@/models/icp";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import ICPCreateModal from "./ICPCreateModal";

export default function ICPPage() {
  const [icps, setIcps] = useState<Partial<ICPProfile>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchICPs = async () => {
    setIsLoading(true);

    // Dummy ICP data
    const data: Partial<ICPProfile>[] = [
  {
    id: "1",
    business_type: "SaaS Company",
    industry: "Technology",
  },
  {
    id: "2",
    business_type: "E-commerce",
    industry: "Retail",
  },
];


    // Simulate API delay
    setTimeout(() => {
      setIcps(data);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchICPs();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {icps.length === 0 ? (
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold">No ICPs Yet</h2>
          <p className="max-w-lg text-gray-600">
            An Ideal Customer Profile (ICP) helps you target the right audience for your business.
            Let’s create your first ICP so you can start finding and connecting with your best-fit customers.
          </p>

          {/* Create Button */}
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          >
            Create ICP
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsModalOpen(true)}>Create ICP</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>ICP List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Company Size</TableHead>
                    <TableHead>Buyer Roles</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {icps.map((icp) => (
                    <TableRow key={icp.id}>
                      <TableCell>{icp.business_type}</TableCell>
                      <TableCell>{icp.industry}</TableCell>
                      <TableCell>{icp.company_size}</TableCell>
                      <TableCell>{icp.buyer_roles}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="secondary">
                          Search Companies
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {/* Modal */}
      <ICPCreateModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreated={fetchICPs}
      />
    </div>
  );
}
