import { AddressDto, CustomerDto } from '@/services/api/customer/customer-types'

export interface CustomerRestApi {
  registerCustomer (customer: CustomerDto): Promise<void>
  createAddress (customerId: string, address: AddressDto): Promise<void>
}
