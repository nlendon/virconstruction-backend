export interface TransportOptions {
  host: string,
  port: string,
  secure: boolean,
  auth: {
    user: string,
    pass: string,
  },
}
