import apiClient from './axios';
import type { Package } from '../types/package';

export const getPackages = async (): Promise<Package[]> => {
  const { data } = await apiClient.get<Package[]>('/packages');
  return data;
};

export const getPackageById = async (id: string): Promise<Package> => {
  const { data } = await apiClient.get<Package>(`/packages/${id}`);
  return data;
};
