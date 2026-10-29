export class ApiError extends Error {
  constructor(public status: number) {
    super()
  }
}
