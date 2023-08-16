"use client";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/helpers/block-helpers.ts
import cn from "classnames";
function generateTextAnnotationClasses(annotations, ignore) {
  return cn({
    "font-semibold": annotations.bold && !ignore?.includes("bold"),
    italic: annotations.italic && !ignore?.includes("italic"),
    "underline underline-offset-4": annotations.underline && !ignore?.includes("underline"),
    "line-through": annotations.strikethrough && !ignore?.includes("strikethrough"),
    "font-mono text-[85%] bg-slate-200 text-rose-500 px-1 py-0 rounded": annotations.code && !ignore?.includes("code"),
    [mapColorClass(annotations.color)]: !ignore?.includes("color")
  });
}
function getJoinedRichText(richTextArr) {
  if (!richTextArr || !richTextArr.length)
    return "";
  const textArr = richTextArr.map((richText) => richText.plain_text);
  return textArr.join("");
}
function mapColorClass(color) {
  switch (color) {
    case "gray":
      return "text-gray-500";
    case "brown":
      return "text-brown-500";
    case "orange":
      return "text-orange-500";
    case "yellow":
      return "text-yellow-500";
    case "green":
      return "text-emerald-600";
    case "blue":
      return "text-blue-500";
    case "purple":
      return "text-purple-500";
    case "pink":
      return "text-pink-500";
    case "red":
      return "text-red-500";
    case "gray_background":
      return "bg-gray-100";
    case "brown_background":
      return "bg-brown-100";
    case "orange_background":
      return "bg-orange-100";
    case "yellow_background":
      return "bg-amber-100";
    case "green_background":
      return "bg-[#deffdb]";
    case "blue_background":
      return "bg-blue-100";
    case "purple_background":
      return "bg-purple-100";
    case "pink_background":
      return "bg-pink-100";
    case "red_background":
      return "bg-red-100";
    default:
      return "";
  }
}
function getIndentLevelClass(level, isList, isInsideList) {
  switch (level) {
    case 0:
      return cn("pl-0", {
        "my-4": !isList,
        "my-1.5": isList
      });
    case 1:
      return isInsideList ? "pl-4 my-1.5" : "pl-4 my-3";
    case 2:
      return isInsideList ? "pl-8 my-1.5" : "pl-8 my-3";
    default:
      return cn("pl-0", {
        "my-4": !isList,
        "my-1.5": isList
      });
  }
}
function convertHeadingIdToSlug(headingId, richTextArr) {
  const plainText = getJoinedRichText(richTextArr);
  return plainText.split(" ").join("-").toLowerCase() + `-${headingId.slice(0, 3)}`;
}
function getYoutubeVideoId(url) {
  if (!url)
    return null;
  let videoId = null;
  const patterns = [
    /(?:https?:\/\/(?:www\.)?)?youtube\.com\/watch\?(?:.*&)?v=([^&#]+)/i,
    /(?:https?:\/\/(?:www\.)?)?youtube\.com\/embed\/([^/?]+)/i,
    /(?:https?:\/\/(?:www\.)?)?youtube\.com\/v\/([^/?]+)/i,
    /(?:https?:\/\/(?:www\.)?)?youtube\.com\/user\/[^/?]+\/?\?v=([^&]+)/i,
    /(?:https?:\/\/(?:www\.)?)?youtu\.be\/([^/?]+)/i
  ];
  for (let i = 0; i < patterns.length; i++) {
    const match = url.match(patterns[i]);
    if (match && match[1]) {
      videoId = match[1];
      break;
    }
  }
  return videoId;
}
var init_block_helpers = __esm({
  "src/helpers/block-helpers.ts"() {
  }
});

// src/notion-blocks/BlockBookmark.tsx
import cn2 from "classnames";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function BlockBookmark(props) {
  const data = props.block.bookmark;
  return /* @__PURE__ */ jsx(Fragment, { children: data && /* @__PURE__ */ jsxs(
    "a",
    {
      className: cn2(
        "flex w-full overflow-hidden rounded-md border border-slate-200 p-3",
        "hover:cursor-pointer hover:border-sky-300 hover:shadow-sm"
      ),
      href: data.url,
      target: "_blank",
      rel: "noreferrer",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-[4_1_180px] flex-col justify-between gap-4 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate font-normal", children: data.title }),
            /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-normal text-slate-600", children: data.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4", children: /* @__PURE__ */ jsx("img", { className: "h-full w-full", src: data.favicon, alt: data.title }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-normal text-slate-500", children: data.url })
          ] })
        ] }),
        data.imageSrc && /* @__PURE__ */ jsx("div", { className: "relative hidden flex-[1_1_100px] sm:block", children: /* @__PURE__ */ jsx("img", { className: "h-full w-full", src: data.imageSrc, alt: data.title }) })
      ]
    }
  ) });
}
var init_BlockBookmark = __esm({
  "src/notion-blocks/BlockBookmark.tsx"() {
    "use client";
  }
});

// src/notion-blocks/BlockText.tsx
import cn3 from "classnames";
import { get } from "lodash";
import Link from "next/link";
import { useContext } from "react";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function BlockText(props) {
  const ctx = useContext(BlockOptionContext);
  if (props.richText.plain_text.includes("\n")) {
    const lines = props.richText.plain_text.split("\n");
    return /* @__PURE__ */ jsx2(Fragment2, { children: lines.map((line, index) => /* @__PURE__ */ jsxs2("span", { children: [
      line,
      index !== lines.length - 1 && /* @__PURE__ */ jsx2("br", {})
    ] }, index)) });
  }
  if (props.richText.type === "text" && !props.ignore?.includes("hyperlink") && props.richText.href) {
    if (props.richText.href.includes(ctx?.siteDomain) && !props.richText.href.includes("@")) {
      const uri = getUriFromUrl(props.richText.href);
      return /* @__PURE__ */ jsx2(
        Link,
        {
          className: generateTextAnnotationClasses(
            props.richText.annotations,
            props.ignore
          ),
          href: uri,
          children: props.richText.plain_text
        }
      );
    } else {
      return /* @__PURE__ */ jsx2(
        "a",
        {
          className: cn3(
            "m2it-link",
            generateTextAnnotationClasses(
              props.richText.annotations,
              props.ignore
            )
          ),
          href: props.richText.href,
          target: "_blank",
          rel: "noreferrer",
          children: props.richText.plain_text
        }
      );
    }
  }
  if (!props.ignore?.includes("hyperlink") && props.richText.type === "mention" && props.richText.mention?.type === "page" && get(props.richText, "mention.page.uri")) {
    return /* @__PURE__ */ jsx2(
      Link,
      {
        className: generateTextAnnotationClasses(
          props.richText.annotations,
          props.ignore
        ),
        href: get(props.richText, "mention.page.uri", "/"),
        children: props.richText.plain_text
      }
    );
  }
  if (props.richText.type === "mention" && props.richText.mention?.type === "date") {
    return /* @__PURE__ */ jsx2(
      "span",
      {
        className: generateTextAnnotationClasses(
          props.richText.annotations,
          props.ignore
        ),
        children: formatDate(props.richText.plain_text)
      }
    );
  }
  const noDecoration = !props.richText.annotations.bold && !props.richText.annotations.italic && !props.richText.annotations.underline && !props.richText.annotations.strikethrough && !props.richText.annotations.code && props.richText.annotations.color === "default" && !props.richText.href;
  if (noDecoration)
    return props.richText.plain_text;
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: generateTextAnnotationClasses(
        props.richText.annotations,
        props.ignore
      ),
      children: props.richText.plain_text
    }
  );
}
function getUriFromUrl(url) {
  const withoutProtocol = url.replace(/^(https?:\/\/)/, "");
  const withoutWWW = withoutProtocol.replace(/^www\./, "");
  const withoutTrailingSlashes = withoutWWW.replace(/\/+$/, "");
  const withoutDomain = withoutTrailingSlashes.replace(/math2it.com/, "");
  const slug = `${withoutDomain}/`;
  return slug;
}
function formatDate(inputString) {
  const [year, month, day] = inputString.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
var init_BlockText = __esm({
  "src/notion-blocks/BlockText.tsx"() {
    init_BlockRender();
    init_block_helpers();
  }
});

// src/notion-blocks/BlockEquation.tsx
var BlockEquation_exports = {};
__export(BlockEquation_exports, {
  default: () => BlockEquation,
  mathFontSize: () => mathFontSize
});
import Katex from "@matejmazur/react-katex";
import cn4 from "classnames";
import { jsx as jsx3 } from "react/jsx-runtime";
function BlockEquation(props) {
  const { block, className } = props;
  return /* @__PURE__ */ jsx3("div", { className: cn4(className, "text-center overflow-auto md:overflow-visible"), children: /* @__PURE__ */ jsx3(
    Katex,
    {
      className: mathFontSize,
      math: block?.equation?.expression,
      settings: {
        throwOnError: false,
        strict: false
      },
      block: true
    }
  ) });
}
var mathFontSize;
var init_BlockEquation = __esm({
  "src/notion-blocks/BlockEquation.tsx"() {
    "use client";
    mathFontSize = "text-base";
  }
});

// src/notion-blocks/BlockInlineEquation.tsx
var BlockInlineEquation_exports = {};
__export(BlockInlineEquation_exports, {
  default: () => BlockInlineEquation
});
import Katex2 from "@matejmazur/react-katex";
import { jsx as jsx4 } from "react/jsx-runtime";
function BlockInlineEquation(props) {
  return /* @__PURE__ */ jsx4("span", { className: generateTextAnnotationClasses(props.equation.annotations), children: /* @__PURE__ */ jsx4(
    Katex2,
    {
      className: props.fontSize ?? mathFontSize,
      math: props.equation.plain_text,
      settings: {
        throwOnError: false,
        strict: false
      }
    }
  ) });
}
var init_BlockInlineEquation = __esm({
  "src/notion-blocks/BlockInlineEquation.tsx"() {
    "use client";
    init_block_helpers();
    init_BlockEquation();
  }
});

// src/notion-blocks/BlockRichText.tsx
import dynamic from "next/dynamic";
import { jsx as jsx5 } from "react/jsx-runtime";
function BlockRichText(props) {
  switch (props.richText.type) {
    case "text":
    case "mention":
      return /* @__PURE__ */ jsx5(BlockText, { richText: props.richText, ignore: props.ignore });
    case "equation":
      return /* @__PURE__ */ jsx5(
        DynamicInlineEquation,
        {
          equation: props.richText,
          fontSize: props.mathFontSize
        }
      );
    default:
      return /* @__PURE__ */ jsx5(BlockText, { richText: props.richText });
  }
}
var DynamicInlineEquation;
var init_BlockRichText = __esm({
  "src/notion-blocks/BlockRichText.tsx"() {
    init_BlockText();
    DynamicInlineEquation = dynamic(() => Promise.resolve().then(() => (init_BlockInlineEquation(), BlockInlineEquation_exports)));
  }
});

// src/notion-blocks/BlockBulletedListItem.tsx
import cn5 from "classnames";
import { GoSquareFill } from "react-icons/go";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function BlockBulletedListItem(props) {
  const { block, className, children } = props;
  return /* @__PURE__ */ jsxs3("div", { className: cn5(className), children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-start gap-1", children: [
      /* @__PURE__ */ jsx6("div", { className: "flex items-center justify-center", children: bulletType(block["list_item"]) }),
      /* @__PURE__ */ jsx6("div", { className: "block", children: block?.bulleted_list_item?.rich_text.map((richText, index) => /* @__PURE__ */ jsx6(BlockRichText, { richText }, index)) })
    ] }),
    children
  ] });
}
function bulletType(level) {
  switch (level) {
    case "1":
      return /* @__PURE__ */ jsx6(RxDotFilled, { className: "mt-0.5 text-xl text-slate-600" });
    case "2":
      return /* @__PURE__ */ jsx6(RxDot, { className: "mt-1 text-lg" });
    case "3":
      return /* @__PURE__ */ jsx6(GoSquareFill, { className: "mr-1 mt-1.5 text-xs" });
  }
}
var init_BlockBulletedListItem = __esm({
  "src/notion-blocks/BlockBulletedListItem.tsx"() {
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockCallout.tsx
import cn6 from "classnames";
import { get as get2 } from "lodash";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function BlockCallout(props) {
  const { block, children, className } = props;
  return /* @__PURE__ */ jsx7("div", { className: cn6(className), children: /* @__PURE__ */ jsxs4("div", { className: cn6("flex rounded-md", mapColorClass(block?.callout?.color)), children: [
    get2(block, "callout.icon.emoji") && /* @__PURE__ */ jsx7("div", { className: "text-2xl pl-4 pr-2 py-3", children: get2(block, "callout.icon.emoji") }),
    /* @__PURE__ */ jsxs4("div", { className: "py-4 pl-2 pr-4 w-full", children: [
      block?.callout?.rich_text.map((richText, index) => /* @__PURE__ */ jsx7(BlockRichText, { richText }, index)),
      !!children && /* @__PURE__ */ jsx7("div", { className: "-ml-4 pt-3 m2it-inside-box", children })
    ] })
  ] }) });
}
var init_BlockCallout = __esm({
  "src/notion-blocks/BlockCallout.tsx"() {
    init_block_helpers();
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockColumnList.tsx
import cn7 from "classnames";
import { jsx as jsx8 } from "react/jsx-runtime";
function BlockColumnList(props) {
  const { block, className } = props;
  const children = block["children"];
  if (children?.length === 0)
    return null;
  return /* @__PURE__ */ jsx8("div", { className: cn7("w-full grid gap-3", parseColumnClasses(children.length), className), children: children.map((col, index1) => {
    return /* @__PURE__ */ jsx8("div", { className: cn7("w-full flex flex-col"), children: col["children"].map((child, index2) => /* @__PURE__ */ jsx8(BlockRender, { block: child, level: 0 }, index2)) }, index1);
  }) });
}
function parseColumnClasses(numCols) {
  switch (numCols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 md:grid-cols-2";
    case 3:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    default:
      return "grid-cols-1";
  }
}
var init_BlockColumnList = __esm({
  "src/notion-blocks/BlockColumnList.tsx"() {
    init_BlockRender();
  }
});

// src/notion-blocks/BlockHeadingToggle.tsx
import { Disclosure } from "@headlessui/react";
import cn8 from "classnames";
import { BsFillCaretRightFill } from "react-icons/bs";
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
function BlockHeadingToggle(props) {
  return /* @__PURE__ */ jsx9(Disclosure, { defaultOpen: false, children: ({ open }) => /* @__PURE__ */ jsxs5(Fragment3, { children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex w-full items-center py-1 ml-[-10px]", children: [
      /* @__PURE__ */ jsx9(Disclosure.Button, { className: "rounded-md p-1 hover:bg-[#99989824]", children: /* @__PURE__ */ jsx9(
        BsFillCaretRightFill,
        {
          className: cn8("transform ease-in-out transition-all duration-[400ms] text-lg", {
            "rotate-90": open,
            "rotate-0": !open
          })
        }
      ) }),
      props.headingElement
    ] }),
    /* @__PURE__ */ jsx9(Disclosure.Panel, { children: /* @__PURE__ */ jsx9("div", { children: props.children }) })
  ] }) });
}
var init_BlockHeadingToggle = __esm({
  "src/notion-blocks/BlockHeadingToggle.tsx"() {
    "use client";
  }
});

// src/notion-blocks/BlockHeading.tsx
import cn9 from "classnames";
import { get as get3 } from "lodash";
import { useContext as useContext2 } from "react";
import { Fragment as Fragment4, jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
function BlockHeading(props) {
  const ctx = useContext2(BlockOptionContext);
  const { type, block, className, children } = props;
  let heading;
  let headingElement;
  let anchorElement;
  const h1Size = "text-3xl";
  const h2Size = "text-2xl";
  const h3Size = "text-xl";
  const headingClass = "scroll-mt-[70px] mt-0";
  const id = convertHeadingIdToSlug(block.id, block[`${block.type}`]?.rich_text);
  switch (type) {
    case "h1":
      heading = block?.heading_1;
      headingElement = /* @__PURE__ */ jsx10("h1", { id, className: cn9(h1Size, headingClass), children: insideHeading(heading) });
      anchorElement = /* @__PURE__ */ jsx10("a", { href: `#${id}`, className: cn9("text-sky-600 lg:-ml-6", h1Size), children: "#" });
      break;
    case "h2":
      heading = block?.heading_2;
      headingElement = /* @__PURE__ */ jsx10("h2", { id, className: cn9(h2Size, headingClass), children: insideHeading(heading) });
      anchorElement = /* @__PURE__ */ jsx10("a", { href: `#${id}`, className: cn9("text-sky-600 lg:-ml-6", h2Size), children: "#" });
      break;
    case "h3":
      heading = block?.heading_3;
      headingElement = /* @__PURE__ */ jsx10("h3", { id, className: cn9(h3Size, headingClass), children: insideHeading(heading) });
      anchorElement = /* @__PURE__ */ jsx10("a", { href: `#${id}`, className: cn9("text-orange-700 lg:-ml-8", h3Size), children: "##" });
      break;
  }
  return /* @__PURE__ */ jsx10("div", { className: props.outerClassName, children: /* @__PURE__ */ jsxs6(
    "div",
    {
      className: cn9(mapColorClass(heading?.color), className, {
        "flex items-start gap-2": !get3(heading, "is_toggleable") && !ctx?.disableAnchorHeading
      }),
      children: [
        get3(heading, "is_toggleable") && children && /* @__PURE__ */ jsx10(BlockHeadingToggle, { headingElement, children }),
        !get3(heading, "is_toggleable") && /* @__PURE__ */ jsxs6(Fragment4, { children: [
          !ctx?.disableAnchorHeading && anchorElement,
          headingElement
        ] })
      ]
    }
  ) });
}
function insideHeading(heading) {
  return /* @__PURE__ */ jsx10(Fragment4, { children: heading?.rich_text.map((richText, index) => /* @__PURE__ */ jsx10(BlockRichText, { richText }, index)) });
}
var init_BlockHeading = __esm({
  "src/notion-blocks/BlockHeading.tsx"() {
    "use client";
    init_BlockRender();
    init_block_helpers();
    init_BlockHeadingToggle();
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockNumberedListItem.tsx
import cn10 from "classnames";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
function BlockNumberedListItem(props) {
  const { block, className, children } = props;
  return /* @__PURE__ */ jsxs7("div", { className: cn10(className), children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsx11("div", { className: "flex items-center justify-center", children: block["list_item"] }),
      /* @__PURE__ */ jsx11("div", { className: "block", children: block?.numbered_list_item?.rich_text.map((richText, index) => /* @__PURE__ */ jsx11(BlockRichText, { richText }, index)) })
    ] }),
    children
  ] });
}
var init_BlockNumberedListItem = __esm({
  "src/notion-blocks/BlockNumberedListItem.tsx"() {
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockParagraph.tsx
import cn11 from "classnames";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function BlockParagraph(props) {
  const { block, children, className } = props;
  return (
    // We don't use <p> here because there may be other not-supported tags in the <p> tag.
    /* @__PURE__ */ jsxs8("div", { className: cn11(mapColorClass(block?.paragraph?.color), className), children: [
      block?.paragraph?.rich_text.map((richText, index) => /* @__PURE__ */ jsx12(BlockRichText, { richText }, index)),
      children
    ] })
  );
}
var init_BlockParagraph = __esm({
  "src/notion-blocks/BlockParagraph.tsx"() {
    init_block_helpers();
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockQuote.tsx
import cn12 from "classnames";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function BlockQuote(props) {
  const { block, children, className } = props;
  return /* @__PURE__ */ jsx13("div", { className: cn12(className), children: /* @__PURE__ */ jsxs9(
    "div",
    {
      className: cn12(
        mapColorClass(block?.quote?.color),
        "border border-y-0 border-r-0 border-l-4 border-slate-500"
      ),
      children: [
        /* @__PURE__ */ jsx13("div", { className: cn12("py-1 pl-4"), children: block?.quote?.rich_text.map((richText, index) => /* @__PURE__ */ jsx13(BlockRichText, { richText }, index)) }),
        children
      ]
    }
  ) });
}
var init_BlockQuote = __esm({
  "src/notion-blocks/BlockQuote.tsx"() {
    init_block_helpers();
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockToDo.tsx
import cn13 from "classnames";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
function BlockToDo(props) {
  const { block, className, children } = props;
  return /* @__PURE__ */ jsxs10("div", { className: cn13(className), children: [
    /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
      block?.to_do?.checked && /* @__PURE__ */ jsx14(BsCheckSquare, {}),
      !block?.to_do?.checked && /* @__PURE__ */ jsx14(BsSquare, {}),
      block?.to_do?.rich_text.map((richText, index) => /* @__PURE__ */ jsx14(BlockRichText, { richText }, index))
    ] }),
    children
  ] });
}
var init_BlockToDo = __esm({
  "src/notion-blocks/BlockToDo.tsx"() {
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockToggle.tsx
import { Disclosure as Disclosure2 } from "@headlessui/react";
import cn14 from "classnames";
import { BsFillCaretRightFill as BsFillCaretRightFill2 } from "react-icons/bs";
import { Fragment as Fragment5, jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
function BlockToggle(props) {
  const { block, children, className } = props;
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: cn14(
        mapColorClass(block?.toggle?.color),
        "rounded-md border-[0.5px] border-slate-200",
        className
      ),
      children: /* @__PURE__ */ jsx15(Disclosure2, { defaultOpen: false, children: ({ open }) => /* @__PURE__ */ jsxs11(Fragment5, { children: [
        /* @__PURE__ */ jsxs11(
          Disclosure2.Button,
          {
            className: cn14("flex gap-2 w-full items-start p-2 rounded-md", {
              "bg-gray-100 hover:bg-gray-200": open,
              "bg-gray-50 hover:bg-gray-100": !open
            }),
            children: [
              /* @__PURE__ */ jsx15(
                BsFillCaretRightFill2,
                {
                  className: cn14(
                    "text-base transform ease-in-out transition-all duration-[400ms] mt-[4px]",
                    {
                      "rotate-90": open,
                      "rotate-0": !open
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx15("div", { className: "text-start", children: block?.toggle?.rich_text.map((richText, index) => /* @__PURE__ */ jsx15(BlockRichText, { richText }, index)) })
            ]
          }
        ),
        !!children && /* @__PURE__ */ jsx15(Disclosure2.Panel, { className: "rounded-b-md py-4 pr-4 m2it-inside-box", children })
      ] }) })
    }
  );
}
var init_BlockToggle = __esm({
  "src/notion-blocks/BlockToggle.tsx"() {
    "use client";
    init_block_helpers();
    init_BlockRichText();
  }
});

// src/lib/config.ts
var defaultBlurDataURL, defaultCodeLanguage;
var init_config = __esm({
  "src/lib/config.ts"() {
    defaultBlurDataURL = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8XA8AAksBZG7LpHYAAAAASUVORK5CYII=";
    defaultCodeLanguage = "typescript";
  }
});

// src/notion-blocks/BlockImage.tsx
var BlockImage_exports = {};
__export(BlockImage_exports, {
  default: () => BlockImage
});
import cn15 from "classnames";
import { get as get4 } from "lodash";
import mediumZoom from "medium-zoom";
import Image from "next/image";
import { useRef, useState } from "react";
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
function BlockImage(props) {
  const [isImageReady, setIsImageReady] = useState(false);
  const { block, className } = props;
  const width = Math.min(get4(block, "imageInfo.width", 1e3), 1e3);
  const height = Math.min(get4(block, "imageInfo.height", 700), 700);
  const blurDataURL = get4(block, "imageInfo.base64", defaultBlurDataURL);
  const caption = block?.image?.caption;
  const zoomRef = useRef(null);
  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: "#00000080"
      });
    }
    return zoomRef.current;
  }
  function attachZoom(image) {
    const zoom = getZoom();
    if (image) {
      zoom.attach(image);
    } else {
      zoom.detach();
    }
  }
  return /* @__PURE__ */ jsxs12("div", { className: cn15(className, "flex flex-col justify-center items-center gap-2"), children: [
    block.imgUrl && /* @__PURE__ */ jsx16("div", { className: "relative flex w-full items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx16(
      Image,
      {
        className: cn15({
          "blur-lg": !isImageReady,
          "blur-0": isImageReady
        }),
        src: block.imgUrl,
        alt: getJoinedRichText(block?.image?.caption),
        width,
        height,
        blurDataURL,
        placeholder: "blur",
        onLoadingComplete: () => setIsImageReady(true),
        "data-zoomable": true,
        ref: attachZoom
      }
    ) }),
    caption && caption.length > 0 && /* @__PURE__ */ jsx16("div", { className: "text-sm italic opacity-90", children: caption.map((richText, index) => /* @__PURE__ */ jsx16(BlockRichText, { richText }, index)) })
  ] });
}
var init_BlockImage = __esm({
  "src/notion-blocks/BlockImage.tsx"() {
    "use client";
    init_block_helpers();
    init_config();
    init_BlockRichText();
  }
});

// src/components/Mermaid.tsx
import mermaid from "mermaid";
import React from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var Mermaid;
var init_Mermaid = __esm({
  "src/components/Mermaid.tsx"() {
    "use client";
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose"
    });
    Mermaid = class extends React.Component {
      componentDidMount() {
        mermaid.contentLoaded();
      }
      render() {
        return /* @__PURE__ */ jsx17("div", { className: "mermaid flex justify-center", children: this.props.chart });
      }
    };
  }
});

// src/notion-blocks/BlockCode.tsx
var BlockCode_exports = {};
__export(BlockCode_exports, {
  default: () => BlockCode
});
import cn16 from "classnames";
import { useContext as useContext3, useState as useState2 } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCheck } from "react-icons/fi";
import { RxCopy } from "react-icons/rx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tooltip } from "react-tooltip";
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
function BlockCode(props) {
  const ctx = useContext3(BlockOptionContext);
  const { block, className } = props;
  const language = block?.code?.language?.toLowerCase() || defaultCodeLanguage;
  const [copied, setCopied] = useState2(false);
  const onSuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1e3);
  };
  return /* @__PURE__ */ jsxs13("div", { className: cn16(className, "group"), children: [
    /* @__PURE__ */ jsxs13("div", { className: `language-${formatCodeLang(language)} syntax-highlighter relative`, children: [
      /* @__PURE__ */ jsx18(
        SyntaxHighlighter,
        {
          language: formatCodeLang(language),
          style: dracula,
          className: "syntax-highlighter-pre text-sm",
          showLineNumbers: true,
          children: getJoinedRichText(block?.code?.rich_text)
        }
      ),
      /* @__PURE__ */ jsx18(
        "div",
        {
          className: cn16(
            "absolute right-2 top-2 duration-100 hover:cursor-pointer",
            {
              "opacity-0": !copied
            },
            "group-hover:opacity-100"
          ),
          "data-tooltip-id": "block-code-tooltip",
          "data-tooltip-content": copied ? ctx?.blockCodeCopiedText || "Copied" : ctx?.blockCodeCopyText || "Copy",
          "data-tooltip-place": "top",
          children: /* @__PURE__ */ jsx18(CopyToClipboard, { text: getJoinedRichText(block?.code?.rich_text), onCopy: onSuccess, children: /* @__PURE__ */ jsxs13("button", { children: [
            !copied && /* @__PURE__ */ jsx18(RxCopy, { className: "text-lg text-slate-200 hover:text-pink-300" }),
            copied && /* @__PURE__ */ jsx18(FiCheck, { className: "text-lg text-green-300" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx18(Tooltip, { id: "block-code-tooltip", noArrow: true, className: "text-sm" })
    ] }),
    block?.code?.caption && /* @__PURE__ */ jsx18("div", { className: "italic opacity-60", children: block?.code?.caption?.map((richText, index) => /* @__PURE__ */ jsx18(BlockRichText, { richText }, index)) }),
    block?.code?.language === "mermaid" && /* @__PURE__ */ jsx18(Mermaid, { chart: getJoinedRichText(block?.code?.rich_text) })
  ] });
}
var formatCodeLang;
var init_BlockCode = __esm({
  "src/notion-blocks/BlockCode.tsx"() {
    "use client";
    init_BlockRender();
    init_Mermaid();
    init_block_helpers();
    init_config();
    init_BlockRichText();
    formatCodeLang = (lang) => {
      switch (lang) {
        case "plain text":
          return "plaintext";
        case "objective-c":
          return "objectivec";
        default:
          return lang;
      }
    };
  }
});

// src/notion-blocks/BlockTable.tsx
var BlockTable_exports = {};
__export(BlockTable_exports, {
  default: () => BlockTable
});
import cn17 from "classnames";
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
function BlockTable(props) {
  const { block, className } = props;
  const bodyRows = block?.table.has_row_header ? block?.["children"]?.slice(1) : block?.["children"];
  return /* @__PURE__ */ jsx19("div", { className: cn17(className, "w-full overflow-auto md:overflow-visible"), children: /* @__PURE__ */ jsxs14("table", { className: "table-auto", children: [
    block?.table?.has_row_header && /* @__PURE__ */ jsx19("thead", { children: trBlock({
      cells: block?.["children"]?.[0]?.table_row?.cells,
      isRowHeader: true,
      key: 0
    }) }),
    /* @__PURE__ */ jsx19("tbody", { children: bodyRows?.map(
      (row, index) => trBlock({
        cells: row?.table_row?.cells,
        isRowHeader: false,
        key: index,
        hasColumnHeader: block?.table?.has_column_header
      })
    ) })
  ] }) });
}
function trBlock(options) {
  const { cells, isRowHeader, key, hasColumnHeader } = options;
  if (!cells)
    return null;
  return /* @__PURE__ */ jsx19("tr", { children: cells.map((cell, index, _cells) => {
    if (hasColumnHeader && index === 0) {
      return cellBlock({
        cell,
        key: index,
        isHeader: true,
        headerType: "column"
        // hideBorder: index + 1 === cells.length
      });
    } else {
      return cellBlock({
        cell,
        key: index,
        isHeader: isRowHeader,
        headerType: "row"
        // hideBorder: index + 1 === cells.length
      });
    }
  }) }, key);
}
function cellBlock(options) {
  const { cell, isHeader, key, headerType, hideBorder } = options;
  const cellClass = { "px-4 py-2": true, "border border-slate-300": !hideBorder };
  if (isHeader) {
    const headerClass = {
      "bg-sky-100": headerType === "row",
      "bg-gray-100": headerType === "column"
    };
    return /* @__PURE__ */ jsx19("th", { className: cn17(cellClass, headerClass), children: cell.map((richText, index2) => /* @__PURE__ */ jsx19(BlockRichText, { richText }, index2)) }, key);
  } else {
    return /* @__PURE__ */ jsx19("td", { className: cn17(cellClass), children: cell.map((richText, index2) => /* @__PURE__ */ jsx19(BlockRichText, { richText }, index2)) }, key);
  }
}
var init_BlockTable = __esm({
  "src/notion-blocks/BlockTable.tsx"() {
    init_BlockRichText();
  }
});

// src/notion-blocks/BlockVideo.tsx
var BlockVideo_exports = {};
__export(BlockVideo_exports, {
  default: () => BlockVideo
});
import cn18 from "classnames";
import { get as get5 } from "lodash";
import YouTube from "react-youtube";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
function BlockVideo(props) {
  const videoUrl = get5(props.block, "video.external.url");
  const videoId = getYoutubeVideoId(videoUrl);
  if (!videoId)
    return null;
  const caption = get5(props.block, "video.caption");
  const title = caption ? getJoinedRichText(caption) : "";
  return /* @__PURE__ */ jsxs15("div", { className: cn18(props.className, "flex flex-col justify-center items-center gap-2"), children: [
    /* @__PURE__ */ jsx20("div", { className: "w-full", children: /* @__PURE__ */ jsx20(YouTube, { videoId, title, className: "aspect-video w-full" }) }),
    caption && caption.length > 0 && /* @__PURE__ */ jsx20("div", { className: "text-sm italic opacity-90", children: caption.map((richText, index) => /* @__PURE__ */ jsx20(BlockRichText, { richText }, index)) })
  ] });
}
var init_BlockVideo = __esm({
  "src/notion-blocks/BlockVideo.tsx"() {
    "use client";
    init_block_helpers();
    init_BlockRichText();
  }
});

// src/components/Renderer.tsx
import cn19 from "classnames";
import { get as get6 } from "lodash";
import dynamic2 from "next/dynamic";
import { Fragment as Fragment6, jsx as jsx21 } from "react/jsx-runtime";
function Renderer(props) {
  const { block, level } = props;
  let children;
  const isList = block.type === "bulleted_list_item" || block.type === "numbered_list_item";
  if (block.has_children) {
    children = get6(block, "children", [])?.map((childBlock) => /* @__PURE__ */ jsx21(
      Renderer,
      {
        block: childBlock,
        level: block.type === "synced_block" ? level : level + 1,
        isInsideList: isList
      },
      childBlock.id
    ));
  }
  const basicBlockGap = cn19(getIndentLevelClass(level, isList, props.isInsideList));
  const basicBlockGapHeading = "mt-6";
  switch (block.type) {
    case "synced_block":
      return /* @__PURE__ */ jsx21(Fragment6, { children });
    case "divider":
      return /* @__PURE__ */ jsx21("hr", { className: basicBlockGap });
    case "paragraph":
      return /* @__PURE__ */ jsx21(BlockParagraph, { block, className: cn19(basicBlockGap), children });
    case "numbered_list_item":
      return /* @__PURE__ */ jsx21(
        BlockNumberedListItem,
        {
          block,
          className: cn19(basicBlockGap),
          children
        }
      );
    case "bulleted_list_item":
      return /* @__PURE__ */ jsx21(
        BlockBulletedListItem,
        {
          block,
          className: cn19(basicBlockGap),
          children
        }
      );
    case "to_do":
      return /* @__PURE__ */ jsx21(BlockToDo, { block, className: cn19(basicBlockGap), children });
    case "heading_1":
      return /* @__PURE__ */ jsx21(
        BlockHeading,
        {
          type: "h1",
          block,
          outerClassName: getIndentLevelClass(level, false, props.isInsideList),
          className: cn19(basicBlockGap, basicBlockGapHeading),
          children
        }
      );
    case "heading_2":
      return /* @__PURE__ */ jsx21(
        BlockHeading,
        {
          type: "h2",
          block,
          outerClassName: getIndentLevelClass(level, false, props.isInsideList),
          className: cn19(basicBlockGap, basicBlockGapHeading),
          children
        }
      );
    case "heading_3":
      return /* @__PURE__ */ jsx21(
        BlockHeading,
        {
          type: "h3",
          block,
          outerClassName: getIndentLevelClass(level, false, props.isInsideList),
          className: cn19(basicBlockGap, basicBlockGapHeading),
          children
        }
      );
    case "quote":
      return /* @__PURE__ */ jsx21(BlockQuote, { block, className: cn19(basicBlockGap), children });
    case "code":
      return /* @__PURE__ */ jsx21(DynamicCode, { block, className: cn19(basicBlockGap) });
    case "equation":
      return /* @__PURE__ */ jsx21(DynamicEquation, { block, className: cn19(basicBlockGap) });
    case "column_list":
      return /* @__PURE__ */ jsx21(BlockColumnList, { block, className: cn19(basicBlockGap) });
    case "table":
      return /* @__PURE__ */ jsx21(DynamicTable, { block, className: cn19(basicBlockGap) });
    case "toggle":
      return /* @__PURE__ */ jsx21(BlockToggle, { block, className: cn19(basicBlockGap), children });
    case "callout":
      return /* @__PURE__ */ jsx21(BlockCallout, { block, className: cn19(basicBlockGap), children });
    case "image":
      return /* @__PURE__ */ jsx21(DynamicImage, { block, className: cn19(basicBlockGap) });
    case "video":
      return /* @__PURE__ */ jsx21(DynamicVideo, { block, className: cn19(basicBlockGap) });
    case "bookmark":
      return /* @__PURE__ */ jsx21(
        BlockBookmark,
        {
          block,
          className: cn19(basicBlockGap)
        }
      );
    default:
      return null;
  }
}
var DynamicImage, DynamicCode, DynamicEquation, DynamicTable, DynamicVideo;
var init_Renderer = __esm({
  "src/components/Renderer.tsx"() {
    "use client";
    init_block_helpers();
    init_BlockBookmark();
    init_BlockBulletedListItem();
    init_BlockCallout();
    init_BlockColumnList();
    init_BlockHeading();
    init_BlockNumberedListItem();
    init_BlockParagraph();
    init_BlockQuote();
    init_BlockToDo();
    init_BlockToggle();
    DynamicImage = dynamic2(() => Promise.resolve().then(() => (init_BlockImage(), BlockImage_exports)));
    DynamicCode = dynamic2(() => Promise.resolve().then(() => (init_BlockCode(), BlockCode_exports)));
    DynamicEquation = dynamic2(() => Promise.resolve().then(() => (init_BlockEquation(), BlockEquation_exports)));
    DynamicTable = dynamic2(() => Promise.resolve().then(() => (init_BlockTable(), BlockTable_exports)));
    DynamicVideo = dynamic2(() => Promise.resolve().then(() => (init_BlockVideo(), BlockVideo_exports)));
  }
});

// src/components/BlockRender.tsx
import { createContext } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
function BlockRender(props) {
  return /* @__PURE__ */ jsx22(BlockOptionContext.Provider, { value: props.blockOptionsContext, children: /* @__PURE__ */ jsx22(Renderer, { block: props.block, level: props.level, isInsideList: props.isInsideList }) });
}
var defaultBlockOptionContext, BlockOptionContext;
var init_BlockRender = __esm({
  "src/components/BlockRender.tsx"() {
    "use client";
    init_Renderer();
    defaultBlockOptionContext = {
      disableAnchorHeading: false,
      siteDomain: "dinhanhthi.com"
    };
    BlockOptionContext = createContext(defaultBlockOptionContext);
  }
});

// src/components/PostBody.tsx
init_BlockRender();
import cn21 from "classnames";

// src/components/PostToc.tsx
init_block_helpers();
import cn20 from "classnames";
import { useState as useState4 } from "react";
import { IoIosArrowDown } from "react-icons/io";

// src/lib/hooks.ts
import { useEffect, useRef as useRef2, useState as useState3 } from "react";
function useHeadsObserver() {
  const observer = useRef2(null);
  const [activeId, setActiveId] = useState3("");
  useEffect(() => {
    const handleObsever = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };
    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-100px 0% -80% 0px"
    });
    const elements = document.querySelectorAll("h2, h3");
    elements.forEach((elem) => observer?.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);
  return { activeId };
}

// src/components/PostToc.tsx
init_BlockRichText();
import { jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
function PostToc(props) {
  const [showContent, setShowContent] = useState4(true);
  const headingBlocks = props.contentBlocks.filter(
    (block) => block.type === "heading_2" || block.type === "heading_3"
  );
  const showToc = props.showToc && headingBlocks.length >= (props.minNumHeadingsToShowToc || 4);
  const { activeId } = useHeadsObserver();
  if (!showToc)
    return null;
  return /* @__PURE__ */ jsxs16(
    "nav",
    {
      className: cn20("h-fit w-full flex gap-2 flex-col px-4 py-3", {
        "2xl:hidden": props.inPost,
        // hide on large screens
        "max-h-full p-3": !props.inPost,
        "bg-gray-100 rounded-xl m2it-box-shadow border-[0.5px]": !props.inPost,
        "max-h-[350px] bg-slate-50 rounded-xl mt-8 mb-10 m2it-box-shadow": props.inPost,
        border: props.inPost
      }),
      "aria-label": "Table of contents",
      children: [
        /* @__PURE__ */ jsxs16(
          "button",
          {
            className: cn20(
              "flex items-center justify-between text-md font-semibold text-slate-700 pb-0"
            ),
            onClick: () => setShowContent(!showContent),
            children: [
              /* @__PURE__ */ jsx23("div", { children: "Trong b\xE0i n\xE0y" }),
              /* @__PURE__ */ jsx23("div", { children: /* @__PURE__ */ jsx23(
                IoIosArrowDown,
                {
                  className: cn20("text-2xl ease-in-out transition-all duration-[400ms]", {
                    "rotate-0": showContent,
                    "rotate-[-90deg]": !showContent
                  })
                }
              ) })
            ]
          }
        ),
        showContent && /* @__PURE__ */ jsx23(
          "div",
          {
            className: cn20("pt-3 pl-1 overflow-auto m2it-scrollbar m2it-scrollbar-small border-t", {
              "columns-1 md:columns-2": props.inPost
            }),
            children: headingBlocks.map((block) => {
              const anchor = convertHeadingIdToSlug(
                block.id,
                block[`${block.type}`]?.rich_text
              );
              return /* @__PURE__ */ jsxs16(
                "a",
                {
                  href: `#${anchor}`,
                  className: cn20("flex items-baseline gap-2 hover:m2it-link text-sm py-1", {
                    "pl-4 border-l": block.type === "heading_3",
                    "-ml-1": block.type === "heading_2",
                    "m2it-link-hover": activeId === anchor && !props.inPost,
                    "text-slate-700": activeId !== anchor || props.inPost
                  }),
                  children: [
                    block.type === "heading_2" && /* @__PURE__ */ jsx23("span", { className: "text-[0.7rem] text-slate-400", children: "\u25C6" }),
                    block.type === "heading_3" && /* @__PURE__ */ jsx23("span", { className: "text-[0.6rem] text-slate-400", children: "\u25CB" }),
                    /* @__PURE__ */ jsx23("span", { className: "block", children: block[`${block.type}`].rich_text.map(
                      (richText, index) => /* @__PURE__ */ jsx23(
                        BlockRichText,
                        {
                          richText,
                          ignore: ["hyperlink", "color", "underline", "bold", "italic"],
                          mathFontSize: "text-[0.83rem]"
                        },
                        index
                      )
                    ) })
                  ]
                },
                block.id
              );
            })
          }
        )
      ]
    }
  );
}

// src/components/PostBody.tsx
import { jsx as jsx24, jsxs as jsxs17 } from "react/jsx-runtime";
var postBodyContainerClass = "mx-auto container pb-8 pt-4";
function PostBody(props) {
  const { contentBlocks, className } = props;
  return /* @__PURE__ */ jsxs17("div", { className: cn21("m2it-prose", postBodyContainerClass, className), children: [
    /* @__PURE__ */ jsx24(
      PostToc,
      {
        showToc: props.showToc,
        inPost: true,
        contentBlocks
      }
    ),
    !!contentBlocks.length && contentBlocks.map((block) => /* @__PURE__ */ jsx24(
      BlockRender,
      {
        blockOptionsContext: props.blockOptionsContext,
        block,
        level: 0
      },
      block.id
    )),
    !contentBlocks.length && /* @__PURE__ */ jsx24("p", { children: props.noContentMessage || "B\xE0i vi\u1EBFt n\xE0y ch\u01B0a c\xF3 n\u1ED9i dung." })
  ] });
}
export {
  PostBody as default,
  postBodyContainerClass
};
//# sourceMappingURL=PostBody.js.map