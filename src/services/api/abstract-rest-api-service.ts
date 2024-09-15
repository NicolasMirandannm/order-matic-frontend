import HttpException from '@/services/exceptions/http-exception'
import { getCookie } from '@/services/utils/cookies-utils'

export abstract class AbstractRestApiService<T> {
  protected static readonly TOKEN_KEY = 'token'
  private readonly BASE_URL: string

  protected constructor () {
    this.BASE_URL = import.meta.env.VITE_API_BASE_URL as string
  }

  protected async get (rote: string): Promise<T> {
    const response = await fetch(this.getUrl(rote), {
      method: 'GET',
      headers: {
        Authorization: this.getAuthorizationToken(),
      },
    })
    return this.parseResponseData(response)
  }

  protected async syncPost (rote: string, data: T, parseResponseFunction?: (data: Response) => any): Promise<T> {
    const response = await fetch(this.getUrl(rote), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationToken(),
      },
    })
    return parseResponseFunction ? parseResponseFunction(response) : this.parseResponseData(response)
  }

  protected async syncPut (rote: string, data: T): Promise<T> {
    const response = await fetch(this.getUrl(rote), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationToken(),
      },
    })
    return this.parseResponseData(response)
  }

  protected async syncDelete (rote: string): Promise<T> {
    const response = await fetch(this.getUrl(rote), {
      method: 'DELETE',
      headers: {
        Authorization: this.getAuthorizationToken(),
      },
    })
    return this.parseResponseData(response)
  }

  protected async asyncPost (rote: string, data: T): Promise<void> {
    const response = await fetch(this.getUrl(rote), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationToken(),
      },
    })

    await this.verifyException(response)
  }

  protected async asyncPut (rote: string, data: T): Promise<void> {
    const response = await fetch(this.getUrl(rote), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationToken(),
      },
    })

    await this.verifyException(response)
  }

  protected async asyncDelete (rote: string): Promise<void> {
    await fetch(this.getUrl(rote), {
      method: 'DELETE',
      headers: {
        Authorization: this.getAuthorizationToken(),
      },
    })
  }

  private getAuthorizationToken (): string {
    const token = getCookie(AbstractRestApiService.TOKEN_KEY)
    return token ? `Bearer ${token}` : ''
  }

  private getUrl (rote: string): string {
    return `${this.BASE_URL}/${rote}`
  }

  protected abstract parseResponseData(response: Response): Promise<T>;

  private async verifyException (response: Response): Promise<void> {
    let message
    try {
      message = (await response.json())?.message
    } catch (error) { }
    if (response.status >= 400) {
      throw new HttpException(response, message)
    }
  }
}
