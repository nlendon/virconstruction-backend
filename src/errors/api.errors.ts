class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: any) {
    return new ApiError(405, message);
  }

  static notFound(message: any) {
    return new ApiError(404, message);
  }

  static forbidden(message: any) {
    return new ApiError(403, message);
  }

  static noPermission(message: any) {
    return new ApiError(501, message);
  }
}

export default ApiError;