import './locator'

export { waitForAnimationEnd } from './animation'
export { emptyEditor, expectEditorToBeFocused, focusEditor, getEditorHTML, locateEditor, waitForEditor } from './editor'
export { expectLocatorToBeHidden, expectLocatorToHaveCount, expectLocatorToNotExist } from './expect'
export { inputText } from './keyboard'
export { dragAndDrop, hover, unhover } from './mouse'
export { getBoundingBox } from './query'
export {
  collapseSelection,
  extendSelection,
  getSelectedHtml,
  getSelectedText,
  moveSelection,
  moveSelectionToEnd,
  moveSelectionToStart,
  selectText,
} from './selection'
export { testStory, testStoryConsistency } from './test-story'
