export type FocusState = "focused" | "blurred";
export type OpenState = "opened" | "closed";

export interface Tab {
  emoji: string;
  tabId: string;
  focusState: FocusState;
  openState: OpenState;
  lastChangeTime: Date;
}
