export default class HttpException extends Error {
  public readonly code: number
  public readonly data: string

  constructor (response: Response, message?: string) {
    const defaultMessage = `HTTP Exception: ${response.status} - ${response.statusText}`
    super(defaultMessage)
    this.code = response.status
    this.data = message || defaultMessage
  }
}
