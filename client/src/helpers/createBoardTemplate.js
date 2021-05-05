import { colorNames } from '../constants/colors'

export default function createBoardTemplate(name) {
  return {
    name,
    color: colorNames.pink
  }
}
