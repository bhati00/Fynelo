"use client";

import { useEffect, useState } from "react";
import { ICPProfile } from "@/models/icp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ICPCreateModal from "./ICPCreateModal"; // Adjust import path as needed
import { 
  Trash2, 
  Edit, 
  Search, 
  Plus,
  Building2,
  Users,
  Briefcase,
  Target
} from "lucide-react";
import { icpService } from "@/services/icpService"; // Adjust import path as needed

export default function ICPPage() {
  const [icps, setIcps] = useState<Partial<ICPProfile>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModelOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchICPs = async () => {
    setIsLoading(true);
    try {
      const data = await icpService.listICPsByUser();
      setIcps(data);
    } catch (error) {
      console.error("Failed to fetch ICPs:", error);
      // Fallback to empty array on error
      setIcps([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ICP? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(id);
    try {
      await icpService.deleteICP(id); // Assuming you have this method
      await fetchICPs(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete ICP:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (id: string) => {
   
  };

  const formatArrayField = (field: string[] | string | undefined) => {
    if (!field) return "-";
    if (Array.isArray(field)) {
      return field.map((item, index) => (
        <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs">
          {item}
        </Badge>
      ));
    }
    return field;
  };

  useEffect(() => {
    fetchICPs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your ICPs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {icps.length === 0 ? (
        <div className="flex flex-col items-center text-center space-y-6 py-12">
          {/* Icon */}
          <div className="rounded-full bg-primary/10 p-6">
            <Target className="h-12 w-12 text-primary" />
          </div>
          
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">No ICPs Yet</h2>
            <p className="max-w-lg text-muted-foreground leading-relaxed">
              An Ideal Customer Profile (ICP) helps you target the right audience for your business.
              Create your first ICP to start finding and connecting with your best-fit customers.
            </p>
          </div>

          {/* Create Button */}
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First ICP
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Ideal Customer Profiles</h1>
              <p className="text-muted-foreground">
                Manage your target customer profiles ({icps.length} total)
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create ICP
            </Button>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Business Type
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4" />
                        Industry
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Company Size
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Buyer Roles</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {icps.map((icp) => (
                    <TableRow key={icp.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {icp.business_type || "-"}
                      </TableCell>
                      <TableCell>
                        {icp.industry || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {formatArrayField(icp.company_size)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {formatArrayField(icp.buyer_roles)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-1">
                          {/* Search Companies */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            title="Search Companies"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                          
                          {/* Edit */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(icp.id!)}
                            title="Edit ICP"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          {/* Delete */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDelete(icp.id!)}
                            disabled={isDeleting === icp.id}
                            title="Delete ICP"
                          >
                            {isDeleting === icp.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
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