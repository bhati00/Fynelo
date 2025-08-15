// src/services/icpService.ts
import { apiClient } from "@/lib/apiClient";
import { ICPProfile } from "@/models/icp";

export const icpService = {
  // Create ICP
  createICP: (data: Partial<ICPProfile>) =>
    apiClient.post<ICPProfile>("/icp", data),

  // Get ICP by ID
  getICPById: (id: string) =>
    apiClient.get<ICPProfile>(`/icp/${id}`),

  // List ICPs by User ID
  listICPsByUser: (userId: string) =>
    apiClient.get<ICPProfile[]>(`/icp/user/${userId}`),

  // Update ICP
  updateICP: (id: string, data: Partial<ICPProfile>) =>
    apiClient.put<ICPProfile>(`/icp/${id}`, data),

  // Delete ICP
  deleteICP: (id: string) =>
    apiClient.delete<{ message: string }>(`/icp/${id}`),
};
