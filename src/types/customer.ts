export interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  joinDate: string;
}

export type CustomerInput = Omit<Customer, 'id'>;
