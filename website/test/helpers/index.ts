import '../../src/styles/global.css'
import './locator'

export { waitForAnimationEnd } from './animation'
export {
  emptyEditor,
  expectEditorToBeFocused,
  focusEditor,
  getEditorHTML,
  locateEditor,
  MOD_KEY,
  pasteHtmlToEditor,
  waitForEditor,
} from './editor'
export {
  expectLocatorToBeHidden,
  expectLocatorToHaveCount,
  expectLocatorToNotExist,
} from './expect'
export {
  dragAndDrop,
  hover,
  unhover,
} from './mouse'
export { getBoundingBox } from './query'
export {
  collapseSelection,
  extendSelection,
  getSelectedHtml,
  getSelectedText,
  moveSelection,
  moveSelectionToStart,
  selectText,
} from './selection'
export {
  testStory,
  testStoryConsistency,
} from './test-story'
