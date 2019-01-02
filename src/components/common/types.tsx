export const LoginState = {
  CreateAccount: "createaccount" as "createaccount",
  EnteringUsername: "enteringusername" as "enteringusername",
  EnteringPassword: "enteringpassword" as "enteringpassword",
  EnteringForgotPassword: "enteringforgotpassword" as "enteringforgotpassword",
  ThankYou: "thankyou" as "thankyou",
  TwoWayAuth: "twoauthauth" as "twowayauth"
};

export type LoginState = typeof LoginState[keyof typeof LoginState];

export const StepperStates = {
  hidden: "hidden" as "hidden",
  finished: "finished" as "finished",
  active: "active" as "active",
  default: "default" as "default"
};

export type StepperStates = typeof StepperStates[keyof typeof StepperStates];

export type StepperNode = {
  state?: StepperStates;
  num?: string;
  title: string;
};

export const ChannelBoxTypes = {
  default: "default" as "default",
  groups: "group" as "group",
  maps: "maps" as "maps",
  detailed: "detailed" as "detailed",
  multimedia: "multimedia" as "multimedia"
};

export type ChannelBoxTypes = typeof ChannelBoxTypes[keyof typeof ChannelBoxTypes];

export const HeaderTypes = {
  default: "default" as "default",
  compose: "compose" as "compose"
};

export type HeaderTypes = typeof HeaderTypes[keyof typeof HeaderTypes];

// export const SelectTypes = {
//   default: "default" as "default",
//   compose: "compose" as "compose",
//   account: 'account' as 'account'
// };

// export type SelectTypes = typeof SelectTypes[keyof typeof SelectTypes];
