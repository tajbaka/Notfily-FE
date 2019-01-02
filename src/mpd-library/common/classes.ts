const NS = "mpd";

import { Alignment, Justify, MPDSelectTypes, Severities, States } from "../";

export const JUSTIFY_TOP = `${NS}-justify-top`;
export const JUSTIFY_BOTTOM = `${NS}-justify-bottom`;
export const JUSTIFY_CENTER = `${NS}-justify-center`;
export const ALIGN_RIGHT = `${NS}-align-right`;
export const ALIGN_LEFT = `${NS}-align-left`;
export const ALIGN_CENTER = `${NS}-align-center`;

export const SEVERE = `${NS}-severe`;
export const MINOR = `${NS}-minor`;
export const MODERATE = `${NS}-moderate`;
export const EXTREME = `${NS}-extreme`;

export const ACTIVE = `${NS}-active`;
export const DISABLED = `${NS}-disabled`;
export const HOVER = `${NS}-hover`;
export const DEFAULT = `${NS}-default`;
// const SORT = `${NS}-sort`;
const IMAGE_LIST = `${NS}-image-list`;
const STATIC_ICON = `${NS}-static-icon`;
const STATIC_TEXT = `${NS}-static-text`;

export const FINISHED = `${NS}-finished`;
export const SELECTED = `${NS}-selected`;
export const EXPANDED = `${NS}-expanded`;
export const COLLAPSED = `${NS}-collapsed`;
export const HAS_CHILD = `${NS}-has-child`;
export const NO_CHILD = `${NS}-no-child`;
export const UNSELECTED = `${NS}-unselected`;
export const LOADING = `${NS}-loading`;
export const ERROR = `${NS}-error`;

export const ROW = `${NS}-row`;
export const COL = `${NS}-col`;

export const EMPTY = `${NS}-empty`;
export const FULL = `${NS}-full`;

export const HIDE = `${NS}-hide`;
export const SHOW = `${NS}-show`;

export const TOP = `${NS}-top`;
export const BOTTOM = `${NS}-bottom`;
export const LEFT = `${NS}-left`;
export const RIGHT = `${NS}-right`;

export const SIDEBAR = `${NS}-sidebar`;
export const SIDEBAR_GROUP_CONTAINER = `${SIDEBAR}-group-container`;
export const SIDEBAR_GROUP = `${SIDEBAR}-group`;
export const SIDEBAR_ITEM = `${SIDEBAR}-item`;
export const SIDEBAR_TOOLTIP = `${SIDEBAR}-tooltip`;
export const SIDEBAR_DIVIDER = `${SIDEBAR}-divider`;

export const SELECT = `${NS}-select`;
export const SELECT_TEXT = `${SELECT}-text`;
export const SELECT_TEXT_CONTAINER = `${SELECT}-text-container`;

export const SELECT_DEFAULT_CONTAINER = `${SELECT}-default-container`;
export const SELECT_STATIC_ICON_CONTAINER = `${SELECT}-static-icon-container`;
export const SELECT_STATIC_TEXT_CONTAINER = `${SELECT}-static-text-container`;
export const SELECT_ICON_CONTAINER = `${SELECT}-icon-container`;
export const SELECT_ARROW_CONTAINER = `${SELECT}-arrow-container`;

export const SELECT_OPTIONS = `${NS}-select-options`;
export const SELECT_OPTION = `${NS}-select-option`;
export const SELECT_CONTAINER = `${SELECT}-container`;
export const SELECT_INNER_CONTAINER = `${SELECT}-inner-container`;

export const FORM_LOADER = `${NS}-signin-form-loader`;
export const FORM_LOADER_WRAPPER = `${NS}-signin-form-loader-wrapper`;

export const NAVBAR = `${NS}-navbar`;
export const NAVBAR_GROUP = `${SIDEBAR}-group`;
export const NAVBAR_ITEM = `${SIDEBAR}-item`;

export const CONTAINER = `${NS}-container`;
export const ITEM_LOADER = `${NS}-item-loader`;
export const ICON = `${NS}-icon`;

export const FLOATING_INPUT = `${NS}-floating-input`;
export const FLOATING_INPUT_CONTAINER = `${FLOATING_INPUT}-container`;
export const FLOATING_INPUT_LABEL = `${FLOATING_INPUT}-label`;
export const FLOATING_INPUT_INVISIBLE = `${FLOATING_INPUT}-invisible`;
export const FLOATING_INPUT_FIXED_PLACEHOLDER = `${FLOATING_INPUT}-fixed-placeholder`;
export const FLOATING_INPUT_COUNTER = `${FLOATING_INPUT}-counter`;

export const FLOATING_TEXTAREA = `${NS}-floating-textarea`;
export const FLOATING_TEXTAREA_CONTAINER = `${FLOATING_TEXTAREA}-container`;
export const FLOATING_TEXTAREA_LABEL = `${FLOATING_TEXTAREA}-label`;
export const FLOATING_TEXTAREA_COUNTER = `${FLOATING_TEXTAREA}-counter`;

export const FROSTED_GLASS = `${NS}-frosted-glass`;
export const FROSTED_GLASS_CONTAINER = `${FROSTED_GLASS}-container`;
export const FROSTED_GLASS_CONTENT = `${FROSTED_GLASS}-content`;
export const FROSTED_GLASS_CONTENT_COPY = `${FROSTED_GLASS}-content-copy`;

export const LIST = `${NS}-list`;
export const LIST_TABS = `${LIST}-tabs`;
export const LIST_EMPTY = `${LIST}-empty`;
export const LIST_LOADER = `${LIST}-loader`;
export const LIST_LOADER_IMAGE = `${LIST_LOADER}-image`;
export const LIST_LOADER_ANIMATED_BACKGROUND = `${LIST_LOADER}-animated-background`;
export const LIST_LOADER_WRAPPER = `${LIST_LOADER}-wrapper`;

export const PANEL_STACK = `${NS}-panel-stack`;
export const PANEL_STACK_HEADER_BACK = `${PANEL_STACK}-header-back`;
export const PANEL_STACK_VIEW = `${PANEL_STACK}-view`;
export const PANEL_STACK_HEADER = `${PANEL_STACK}-header`;

export const HEADING = `${NS}-heading`;
export const FOOTER = `${NS}-footer`;

export const DIVIDER = `${NS}-divider`;

export const BUTTON = `${NS}-button`;
export const BUTTON_TEXT = `${NS}-button-text`;

export const TREE = `${NS}-tree`;
export const TREE_ROOT = `${NS}-tree-root`;
export const TREE_NODE_LIST = `${NS}-tree-node-list`;

export const TREE_NODE = `${NS}-tree-node`;
export const TREE_NODE_CONTENT = `${TREE_NODE}-content`;
export const TREE_NODE_CHILD = `${TREE_NODE}-child`;

export const SCROLLABLE_DIV = `${NS}-scrollable-div`;
export const SCROLLABLE_DIV_CONTAINER = `${SCROLLABLE_DIV}-container`;
export const SCROLLABLE_DIV_INNER_CONTAINER = `${SCROLLABLE_DIV}-inner-container`;

export const TEXT_IMAGE = `${NS}-text-image`;
export const TEXT_IMAGE_TEXT = `${TEXT_IMAGE}-text`;

export function justifyClass(justify?: Justify) {
  switch (justify) {
    case Justify.TOP:
      return JUSTIFY_TOP;
    case Justify.BOTTOM:
      return JUSTIFY_BOTTOM;
    case Justify.CENTER:
      return JUSTIFY_CENTER;
    default:
      return undefined;
  }
}

export function alignmentClass(alignment?: Alignment) {
  switch (alignment) {
    case Alignment.CENTER:
      return ALIGN_CENTER;
    case Alignment.RIGHT:
      return ALIGN_RIGHT;
    case Alignment.LEFT:
      return ALIGN_LEFT;
    default:
      return undefined;
  }
}

export function loadingStateClass(loading?: boolean) {
  switch (loading) {
    case true:
      return LOADING;
    default:
      return undefined;
  }
}

export function errorStateClass(error?: string) {
  if (error !== undefined && error.length > 0) {
    return ERROR;
  }
  return;
}

export function severitiesClass(severity?: string) {
  if (severity) {
    switch ((severity as string).toLowerCase()) {
      case Severities.severe:
        return SEVERE;
      case Severities.moderate:
        return MODERATE;
      case Severities.minor:
        return MINOR;
      case Severities.extreme:
        return EXTREME;
      default:
        return undefined;
    }
  }
  return;
}

export function statesClass(state?: States) {
  switch (state) {
    case States.hover:
      return HOVER;
    case States.selected:
      return SELECTED;
    case States.unselected:
      return UNSELECTED;
    case States.default:
      return;
    default:
      return undefined;
  }
}

export function selectStatesClass(type?: MPDSelectTypes) {
  switch (type) {
    case MPDSelectTypes.images:
      return IMAGE_LIST;
    case MPDSelectTypes.staticIcon:
      return STATIC_ICON;
    case MPDSelectTypes.staticText:
      return STATIC_TEXT;
    default:
      return DEFAULT;
  }
}
