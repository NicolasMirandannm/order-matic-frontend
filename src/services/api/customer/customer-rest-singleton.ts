import { AbstractRestApiService } from '@/services/api/abstract-rest-api-service'
import { CustomerRestApi } from '@/services/api/customer/customer-rest-api'
import { CustomerDto } from '@/services/api/customer/customer-types'
import { setCookie } from '@/services/utils/cookies-utils'

export class CustomerRestSingleton extends AbstractRestApiService<CustomerDto> implements CustomerRestApi {
  private static readonly instance = new CustomerRestSingleton()
  private static readonly TTL_TOKEN_DAYS = 90

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super()
  }

  public static getInstance (): CustomerRestSingleton {
    return this.instance
  }

  public async registerCustomer (data: CustomerDto): Promise<void> {
    const { token } = await this.syncPost('security/customer-user', data, async (data: Response) => {
      return { token: (await data.json())?.token }
    })
    setCookie(CustomerRestSingleton.TOKEN_KEY, token, CustomerRestSingleton.TTL_TOKEN_DAYS)
  }

  public async createAddress (data: CustomerDto): Promise<void> {
    await this.asyncPost(`security/customer-user/address`, data)
  }

  protected async parseResponseData (response: Response): Promise<CustomerDto> {
    return response.json()
  }
}
