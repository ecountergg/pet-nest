export class GenericResponseDto<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: T,
  ) {
    this.data = data ?? null;
  }
}
