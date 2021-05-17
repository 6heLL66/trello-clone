import { colorNames } from '../constants/colors'

export default class Board {
  constructor(name) {
    this.name = name
    this.color = colorNames.pink
    this.id = null
  }
}
