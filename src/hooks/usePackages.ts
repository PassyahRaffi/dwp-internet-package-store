import { useEffect, useState, useCallback } from 'react';
import { getPackages } from '../api/packageApi';
import type { Package } from '../types/package';

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPackages();
      setPackages(data);
    } catch {
      setError('Gagal memuat daftar paket internet.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, loading, error, refetch: fetchPackages };
};
