import * as userRoutes from './userRoutes'
import * as tokenRoutes from './tokenRoutes'

export const routes = {
  ...tokenRoutes,
  ...userRoutes,
}
