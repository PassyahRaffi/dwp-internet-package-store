export const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

export const formatDate = (date: string) =>
  new Date(date).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

export const formatDateShort = (date: string) =>
  new Date(date).toLocaleDateString('id-ID', { dateStyle: 'medium' });

export const formatDateLong = (date: string) =>
  new Date(date).toLocaleDateString('id-ID', { dateStyle: 'long' });
