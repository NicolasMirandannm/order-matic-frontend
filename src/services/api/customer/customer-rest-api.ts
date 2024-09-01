import { CustomerDto } from '@/services/api/customer/customer-types'

export interface CustomerRestApi {
  registerCustomer (customer: CustomerDto): Promise<void>
}
