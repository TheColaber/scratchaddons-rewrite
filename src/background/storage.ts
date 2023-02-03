import { getBucket } from '@extend-chrome/storage'

export interface Storage {
  addonsEnabled: { [id: string]: boolean }
}

export default getBucket<Storage>('addonsEnabled');