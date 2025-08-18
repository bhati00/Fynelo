"use client";

import { useEffect, useState } from "react";
import { ICPProfile } from "@/models/icp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import ICPCreateModal from "./ICPCreateModal";
import ICPEditModal from "./ICPEditModal";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";

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
import { icpService } from "@/services/icpService";
import { getBusinessTypeLabel } from "@/constants/icpConstants";
import { toast } from 'sonner';

export default function ICPPage() {
  const [icps, setIcps] = useState<Partial<ICPProfile>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingICP, setEditingICP] = useState<Partial<ICPProfile> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [icpToDelete, setIcpToDelete] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!icpToDelete) return;
    
    setIsDeleting(true);
    try {
        const response = await icpService.deleteICP(icpToDelete);
      
        if (response) {
          
          const errorMessage = response.message || "Failed to delete ICP";
          toast.error(errorMessage);
        } else {
          toast.success("ICP deleted successfully!");
          await fetchICPs();
        }
      } catch (error) {
        console.error("Failed to delete ICP:", error);
        toast.error("Failed to delete ICP. Please try again.");
      } finally {
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setIcpToDelete(null);
      }
        };

  const fetchICPs = async () => {
    setIsLoading(true);
    try {
      const data = await icpService.listICPsByUser();
      setIcps(data);
    } catch (error) {
      console.error("Failed to fetch ICPs:", error);
      setIcps([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Updated handleDelete to use modal instead of confirm dialog
  const handleDelete = (id: string) => {
    setIcpToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (icp: Partial<ICPProfile>) => {
    setEditingICP(icp);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingICP(null);
  };

  const handleEditSuccess = () => {
    fetchICPs();
    handleEditModalClose();
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
          <div className="rounded-full bg-primary/10 p-6">
            <Target className="h-12 w-12 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">No ICPs Yet</h2>
            <p className="max-w-lg text-muted-foreground leading-relaxed">
              An Ideal Customer Profile (ICP) helps you target the right audience for your business.
              Create your first ICP to start finding and connecting with your best-fit customers.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First ICP
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Ideal Customer Profiles</h1>
              <p className="text-muted-foreground">
                Manage your target customer profiles ({icps.length} total)
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create ICP
            </Button>
          </div>

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
                        {typeof icp.business_type === "number" ? getBusinessTypeLabel(icp.business_type) : "-"}
                      </TableCell>
                      <TableCell>
                        {icp.industry || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {typeof icp.company_size === "number" ? getBusinessTypeLabel(icp.company_size) : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {typeof icp.buyer_roles === "number" ? getBusinessTypeLabel(icp.buyer_roles) : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            title="Search Companies"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(icp)}
                            title="Edit ICP"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          {/* Updated Delete Button - now opens modal instead of confirm dialog */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDelete(icp.id!)}
                            disabled={isDeleting && icpToDelete === icp.id}
                            title="Delete ICP"
                          >
                            {isDeleting && icpToDelete === icp.id ? (
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

      <ICPCreateModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreated={fetchICPs}
      />
      
      {editingICP && (
        <ICPEditModal
          open={isEditModalOpen}
          onOpenChange={handleEditModalClose}
          icpData={editingICP}
          onUpdated={handleEditSuccess}
        />
      )}

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete ICP Profile"
        description="This will permanently delete this Ideal Customer Profile. Any associated data will also be removed."
      />
    </div>
  );
}