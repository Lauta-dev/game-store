export interface RequestWithJWTInfo {
  user: {
    exp: number,
    iat: number,
    uuid: string
  },
  expressRequest: Request
}
