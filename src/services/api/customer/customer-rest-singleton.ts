import { AbstractRestApiService } from '@/services/api/abstract-rest-api-service'
import { CustomerRestApi } from '@/services/api/customer/customer-rest-api'
import { CustomerDto } from '@/services/api/customer/customer-types'

export class CustomerRestSingleton extends AbstractRestApiService<CustomerDto> implements CustomerRestApi {
  private static readonly instance = new CustomerRestSingleton()

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super()
  }

  public static getInstance (): CustomerRestSingleton {
    return this.instance
  }

  public async registerCustomer (data: CustomerDto): Promise<void> {
    await this.asyncPost('customer/register', data)
  }

  protected parseResponseData (response: Response): Promise<CustomerDto> {
    return response.json()
  }
}
