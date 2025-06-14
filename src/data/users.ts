import { User } from '../types';

export const users: User[] = [
  {
    id: 'user-001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@cityhospital.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Medical Center Drive',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    registrationDate: '2023-01-15',
    totalOrders: 15
  },
  {
    id: 'user-002',
    name: 'Michael Chen',
    email: 'mchen@bloodbank.org',
    phone: '+1 (555) 987-6543',
    address: {
      street: '456 Healthcare Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    registrationDate: '2023-02-20',
    totalOrders: 8
  },
  {
    id: 'user-003',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@metrohealth.com',
    phone: '+1 (555) 456-7890',
    address: {
      street: '789 Medical Plaza',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    registrationDate: '2023-03-10',
    totalOrders: 22
  }
];