import "../../src/tailwind.css";

import { DefaultMap, isHTMLElement } from "@ocavue/utils";
import type { NodeJSON } from "prosekit/core";
import { beforeEach, describe, expect, it } from "vitest";

import registry from "prosekit-registry/registry.gen.json";

import { locateEditor } from "./editor";
import { formatHTML } from "./format-html";
import { waitForStableElement } from "./query";

function getExamples(story: string) {
  const examples = registry.items.filter((item) => item.meta.story === story);

  if (examples.length === 0) {
    throw new Error(`No examples found for story "${story}"`);
  }

  return examples.map((item) => {
    const { framework, story } = item.meta;
    return {
      framework,
      story,
      example: framework + "-" + story,
    };
  });
}

function testSingleStory(
  story: string,
  emptyContent: boolean,
  frameworks: string[] | undefined,
  callback: (options: { framework: string; story: string; example: string }) => void,
) {
  for (const example of getExamples(story)) {
    const shouldSkip = frameworks ? !frameworks.includes(example.framework) : false;
    describe.skipIf(shouldSkip)(example.framework + "/" + example.story, () => {
      beforeEach(async () => {
        await renderExample(example.framework, example.story, emptyContent);
      });
      callback(example);
    });
  }
}

async function renderExample(framework: string, story: string, empty: boolean) {
  const emptyContent: NodeJSON = {
    type: "doc",
    content: [{ type: "paragraph", content: [] }],
  };
  const initialContent = empty ? emptyContent : undefined;

  if (framework === "react") {
    const { renderReactExample } = await import("./render-react");
    return await renderReactExample(story, initialContent);
  }

  if (framework === "vue") {
    const { renderVueExample } = await import("./render-vue");
    return await renderVueExample(story, initialContent);
  }

  if (framework === "svelte") {
    const { renderSvelteExample } = await import("./render-svelte");
    return await renderSvelteExample(story, initialContent);
  }

  if (framework === "solid") {
    const { renderSolidExample } = await import("./render-solid");
    return await renderSolidExample(story, initialContent);
  }

  if (framework === "preact") {
    const { renderPreactExample } = await import("./render-preact");
    return await renderPreactExample(story, initialContent);
  }

  if (framework === "lit") {
    const { renderLitExample } = await import("./render-lit");
    return await renderLitExample(story);
  }

  throw new Error(`The ${framework} framework is not supported`);
}

interface TestStoryOptions {
  /**
   * The story or stories to test.
   */
  story: string | string[];
  /**
   * Whether to render the story with empty content by passing an empty content
   * to the example.
   *
   * @default false
   */
  emptyContent?: boolean;
  /**
   * If provided, only test the story for the given frameworks.
   */
  frameworks?: string[];
}

export function testStory(
  options: string | string[] | TestStoryOptions,
  callback: (options: { framework: string; story: string; example: string }) => void,
) {
  const {
    story,
    emptyContent = false,
    frameworks,
  } = typeof options === "string" || Array.isArray(options) ? { story: options } : options;
  const stories = Array.isArray(story) ? story : [story];

  for (const story of stories) {
    testSingleStory(story, emptyContent, frameworks, callback);
  }
}

export function testStoryConsistency(
  story: string,
  {
    shouldWaitForEditor = true,
    shouldWaitForShiki = false,
    shouldWaitForImageToLoad = false,
    setup,
  }: {
    shouldWaitForEditor?: boolean;
    shouldWaitForShiki?: boolean;
    shouldWaitForImageToLoad?: boolean;
    setup?: () => Promise<void>;
  } = {},
) {
  const examples = getExamples(story);

  const htmlToExamples = new DefaultMap<string, string[]>(() => []);

  for (const example of examples) {
    it(`should render stable HTML for "${example.framework}/${example.story}"`, async () => {
      const html = await getStableHTML({
        framework: example.framework,
        story: example.story,
        shouldWaitForShiki,
        shouldWaitForEditor,
        shouldWaitForImageToLoad,
        setup,
      });
      htmlToExamples.get(html).push(example.example);
    });
  }

  if (examples.length <= 1) {
    return;
  }

  it(`should render the same "${story}" story across ${examples.length} frameworks`, () => {
    if (htmlToExamples.size <= 1) {
      return;
    }

    const iterator = htmlToExamples.entries();
    const [html1, examples1] = iterator.next().value!;
    const [html2, examples2] = iterator.next().value!;
    const label1 = examples1.join(", ");
    const label2 = examples2.join(", ");

    let message = `Expected "${label1}" and "${label2}" to render the same HTML.\n`;

    const lines1 = html1.split("\n");
    const lines2 = html2.split("\n");
    const size = Math.min(lines1.length, lines2.length);

    for (let i = 0; i < size; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];
      if (line1 !== line2) {
        message += `The first difference is at line ${i + 1}:\n`;
        message += `"${label1}" has:\n`;
        message += `${line1.slice(0, 100)}${line1.length > 100 ? "..." : ""}\n`;
        message += `"${label2}" has:\n`;
        message += `${line2.slice(0, 100)}${line2.length > 100 ? "..." : ""}\n`;
        message += `\n`;
        break;
      }
    }

    expect(html1, message).toEqual(html2);
  });
}

async function getStableHTML({
  framework,
  story,
  shouldWaitForEditor,
  shouldWaitForShiki,
  shouldWaitForImageToLoad,
  setup,
}: {
  framework: string;
  story: string;
  shouldWaitForEditor: boolean;
  shouldWaitForShiki: boolean;
  shouldWaitForImageToLoad: boolean;
  setup?: () => Promise<void>;
}): Promise<string> {
  const screen = await renderExample(framework, story, false);

  if (setup) {
    await setup();
  }

  if (shouldWaitForEditor) {
    await expect.element(locateEditor().first()).toBeVisible();
  }
  if (shouldWaitForShiki) {
    await waitForShiki(screen.container);
  }
  if (shouldWaitForImageToLoad) {
    await waitForImageToLoad(screen.container);
  }

  await waitForStableElement(() => screen.container);

  // Clone the container so we don't modify the actual DOM
  const clone = screen.container.cloneNode(true) as Element;

  normalizeCloneElementTree(clone);

  let html = formatHTML(clone.innerHTML);
  // Replace "id" attributes
  html = html.replaceAll(/ id="[\w-]+"/g, ' id="SOME_ID"');
  // Replace "for" attributes in <label> elements
  html = html.replaceAll(/ for="[\w-]+"/g, ' for="SOME_ID"');
  // Replace "value" attributes
  html = html.replaceAll(/ value="[\w-]{21}"/g, ' value="SOME_NANOID_21"');
  // Remove React suppressHydrationWarning attribute
  html = html.replaceAll(/ suppresshydrationwarning="true"/gi, "");

  return formatHTML(html);
}

type ElementTransform = {
  matches: (element: Element) => boolean;
  apply: (element: Element, root: Element) => void;
};

const cloneElementTransforms: ElementTransform[] = [
  {
    matches: (element) => hasInlineDisplay(element, "contents") || hasClass(element, "contents"),
    apply: (element, root) => unwrapDisplayContentsElement(element, root),
  },
  {
    matches: (element) => hasInlineDisplay(element, "none") || hasClass(element, "hidden"),
    apply: (element) => normalizeDisplayNoneElement(element),
  },
  {
    matches: (element) => element.matches("select, input"),
    apply: (element) => removeSelectValueAttribute(element),
  },
];

function normalizeCloneElementTree(root: Element) {
  visitElementTree(root, (element) => {
    for (const transform of cloneElementTransforms) {
      if (transform.matches(element)) {
        transform.apply(element, root);
      }
    }
  });
}

function visitElementTree(root: Element, visitor: (element: Element) => void) {
  const elements = [root, ...Array.from(root.querySelectorAll("*"))];
  for (const element of elements) {
    visitor(element);
  }
}

function hasClass(element: Element, className: string) {
  return element.classList.contains(className);
}

function hasInlineDisplay(element: Element, displayValue: string) {
  if (element instanceof HTMLElement && element.style.display === displayValue) {
    return true;
  }

  const style = element.getAttribute("style");
  if (!style) {
    return false;
  }

  const normalizedStyle = style.replaceAll(/\s+/g, "");
  return normalizedStyle.includes(`display:${displayValue}`);
}

// Remove display: contents divs in the clone, since solid.js v1 needs to
// insert a div for portals. See
// https://github.com/prosekit/prosemirror-adapter/blob/2065ef0986b17971b66f901b86aaeb6ad100df63/packages/solid/src/markView/SolidMarkView.tsx#L47
function unwrapDisplayContentsElement(element: Element, root: Element) {
  if (element === root) {
    return;
  }

  const parent = element.parentNode;
  if (!parent) {
    return;
  }

  const children = Array.from(element.children);
  for (const child of children) {
    parent.insertBefore(child, element);
  }
  element.remove();
}

function normalizeDisplayNoneElement(element: Element) {
  if (!isHTMLElement(element)) {
    return;
  }

  // Remove all other styles and keep only display: none
  element.style.cssText = "display: none";

  // Remove all dataset attributes
  const dataKeys = Object.keys(element.dataset);
  for (const dataKey of dataKeys) {
    delete element.dataset[dataKey];
  }
}

/**
 * Vue set <select :value="..."> as a attribute thus it will be rendered in the
 * HTML string. We want to remove the value attribute.
 */
function removeSelectValueAttribute(element: Element) {
  element.removeAttribute("value");
}

/**
 * Wait for the shiki highlight to be visible
 */
async function waitForShiki(element: Element) {
  const isShikiReady = (): boolean => {
    return !!element.querySelector("span.shiki");
  };
  await expect.poll(isShikiReady, { timeout: 8000 }).toBe(true);
}

/**
 * Find all images in the element and wait for them to load
 */
async function waitForImageToLoad(element: Element) {
  const areImagesLoaded = (): boolean => {
    const images = Array.from(element.querySelectorAll("img"));
    return images.every((img) => img.complete && img.naturalWidth > 0);
  };

  await expect.poll(areImagesLoaded, { timeout: 8000 }).toBe(true);
}
