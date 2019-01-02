import { LoginState } from "../";

import { ChannelBoxTypes, HeaderTypes, StepperStates } from "../";

import { ACTIVE, DEFAULT, FINISHED, HIDE } from "src/mpd-library";

export const TIMER_CONTAINER = `timer-container`;
export const TIMER_BAR_TIME_ELAPSED = `timer-bar-time-elapsed`;
export const TIMER_BAR_TIME_REMAINING = `timer-bar-time-remaining`;
export const TIMER_BAR = `timer-bar`;
export const TIMER_OUTER_BAR = `timer-outer-bar`;
export const TIMER_INNER_BAR = `timer-inner-bar`;

export const STEPPER_CONTAINER = `stepper-container`;
export const STEPPER_ITEM_CONTAINER = `stepper-item-container`;
export const STEPPER_ITEM = `stepper-item`;
export const STEPPER_ITEM_NUMBER = `stepper-item-number`;
export const STEPPER_ITEM_TEXT = `stepper-item-text`;

export const SIGNIN = `signin`;
export const SIGNIN_BACKGROUND = `${SIGNIN}-background`;
export const SIGNIN_WRAPPER = `${SIGNIN}-wrapper`;
export const SIGNIN_HEADER = `${SIGNIN}-header`;
export const SIGNIN_FORM_CONTAINER_OUTER = `${SIGNIN}-form-container-outer`;
export const SIGNIN_FORM_CONTAINER_INNER = `${SIGNIN}-form-container-inner`;
export const SIGNIN_FORM_WRAPPER = `${SIGNIN}-form-wrapper`;
export const SIGNIN_FOOTER = `${SIGNIN}-footer`;
export const SIGNIN_FORM = `${SIGNIN}-form`;
export const SIGNIN_FORM_HEADER = `${SIGNIN}-form-header`;
export const SIGNIN_FORM_FOOTER = `${SIGNIN}-form-footer`;
export const SIGNIN_FORM_TITLE = `${SIGNIN}-form-title`;
export const SIGNIN_FORM_SUBTITLE = `${SIGNIN}-form-subtitle`;
export const SIGNIN_FORM_ERROR = `${SIGNIN}-form-error`;
export const SIGNIN_BUTTONS_CONTAINER = `${SIGNIN}-buttons-container`;
export const SIGNIN_ACTION_BUTTON = `${SIGNIN}-action-button`;

export const ENTERING_USERNAME = `entering-username`;
export const CREATE_ACCOUNT = `create-account`;
export const ENTERING_PASSWORD = `entering-password`;
export const ENTERING_FORGOTPASSWORD = `entering-forgotpassword`;
export const THANK_YOU = `got-thank-you`;
export const ENTERYING_TWOWAYAUTH = "entering-twowayauth";

const LIST = `list`;
export const LIST_CONTAINER = `${LIST}-container`;
export const LIST_INNER_CONTAINER = `${LIST}-inner-container`;

export const LIST_SIDEBAR_TOGGLE = `${LIST}-sidebar-toggle`;

export const LIST_SEARCHBAR_CONTAINER = `${LIST}-searchbar-container`;
export const LIST_SEARCHBAR = `${LIST}-searchbar`;
export const LIST_SEARCHBAR_INPUT = `${LIST}-searchbar-input`;
export const LIST_SEARCHBAR_TEXT = `${LIST}-searchbar-text`;
export const LIST_SEARCHBAR_EXIT = `${LIST}-searchbar-exit`;
export const LIST_SEARCHBAR_COMPOSE = `${LIST}-searchbar-compose`;

const SEARCH = `search`;
export const SEARCH_LIST_CONTAINER = `${SEARCH}-list-container`;
export const SEARCH_LIST_ALERT = `${SEARCH}-list-alert`;
export const SEARCH_LIST_ALERT_CONTAINER = `${SEARCH}-list-alert-container`;

export const LIST_TAB_CONTAINER = `${LIST}-tab-container`;
export const LIST_TAB = `${LIST}-tab`;

// export const SELECT_SORT = `select-sort`;
// export const SELECT_ACCOUNT= `select-account`;

export const MORE_INFO = `more-info`;
export const MORE_INFO_TEXT = `more-info-text`;

export const CHANNEL_BOX = `channel-box`;
export const CHANNEL_BOX_INNER = `channel-box-inner`;
export const CHANNEL_BOX_MAIN = `channel-box-main`;
export const CHANNEL_BOX_LIST = `channel-box-list`;
export const CHANNEL_BOX_LIST_ITEM = `channel-box-list-item`;
export const CHANNEL_BOX_CHECKMARK = `${CHANNEL_BOX}-checkmark`;

export const CHANNEL_BOX_ICONS_CONTAINER = `${CHANNEL_BOX}-icons-container`;
export const CHANNEL_BOX_ICON = `${CHANNEL_BOX}-icon`;

export const CHANNEL_BOX_INFO_CONTAINER = `${CHANNEL_BOX}-text-container`;
export const CHANNEL_BOX_INFO_BUTTONS = `${CHANNEL_BOX}-info-container`;
export const CHANNEL_BOX_TITLE = `${CHANNEL_BOX}-title`;
export const CHANNEL_BOX_DESCRIPTION = `${CHANNEL_BOX}-description`;

export const HEADERS = "headers";
export const HEADERS_CONTAINER = `${HEADERS}-container`;

const TREE = `tree`;
export const TREE_EMPTY = `${TREE}-empty`;
export const TREE_EMPTY_TITLE = `${TREE}-title`;
export const TREE_EMPTY_SUBTITLE = `${TREE}-subtitle`;

const DETAILED = "type-detailed";
const GROUPS = "type-groups";
const MAPS = "type-maps";
const MULTIMEDIA = "type-multimedia";

const COMPOSE = "type-compose";

export function loginStateClass(loginState?: LoginState) {
  switch (loginState) {
    case LoginState.EnteringUsername:
      return ENTERING_USERNAME;
    case LoginState.CreateAccount:
      return CREATE_ACCOUNT;
    case LoginState.EnteringForgotPassword:
      return ENTERING_FORGOTPASSWORD;
    case LoginState.EnteringPassword:
      return ENTERING_PASSWORD;
    case LoginState.TwoWayAuth:
      return ENTERYING_TWOWAYAUTH;
    case LoginState.ThankYou:
      return THANK_YOU;
    default:
      return undefined;
  }
}

export function stepperStatesClass(state?: StepperStates) {
  switch (state) {
    case StepperStates.finished:
      return FINISHED;
    case StepperStates.active:
      return ACTIVE;
    case StepperStates.default:
      return DEFAULT;
      case StepperStates.hidden:
      return HIDE;
    default:
      return undefined;
  }
}

export function channelStatesClass(type?: ChannelBoxTypes) {
  switch (type) {
    case ChannelBoxTypes.detailed:
      return DETAILED;
    case ChannelBoxTypes.multimedia:
      return MULTIMEDIA;
    case ChannelBoxTypes.maps:
      return MAPS;
    case ChannelBoxTypes.groups:
      return GROUPS;
    default:
      return DEFAULT;
  }
}

export function HeaderStatesClass(type?: HeaderTypes) {
  switch (type) {
    case HeaderTypes.compose:
      return COMPOSE;
    default:
      return DEFAULT;
  }
}

// export function SelectStatesClass(type?: SelectTypes) {
//   switch (type) {
//     case SelectTypes.compose:
//       return SELECT_SORT;
//     case SelectTypes.account:
//       return SELECT_ACCOUNT;
//     default:
//       return DEFAULT;
//   }
// }
