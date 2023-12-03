import * as Store from './Store'
import * as Show from './Show'
import * as Delete from './Delete'

export const UserController = {
  ...Store,
  ...Show,
  ...Delete,
}
