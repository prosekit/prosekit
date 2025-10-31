import './locator'
import '../../src/styles/global.css'

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
} from './selection'
export {
  testStory,
  testStorySnapshot,
} from './test-story'
