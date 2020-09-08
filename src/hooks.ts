import * as React from "react";
import {
  subscribeToTabsChange,
  createNewTabInStorage,
  updateTabStateInStorage,
  getTabsFromStorage,
  clearClosedTabsFromStorage,
} from "./storage";
import { Tab, FocusState, OpenState } from "./types";

export function useTabs() {
  const [tabsState, setTabsState] = React.useState<Tab[]>([]);

  React.useEffect(() => {
    const unSub = subscribeToTabsChange((tabs) => {
      setTabsState(tabs);
    });

    return unSub;
  }, []);

  function createNewTab(
    tabId: string,
    emoji: string,
    focusState: FocusState,
    openState: OpenState
  ) {
    createNewTabInStorage(tabId, emoji, focusState, openState);
    const newTabs = getTabsFromStorage();
    setTabsState(newTabs);
  }

  function updateTabState(
    tabId: string,
    focusState: FocusState,
    openState: OpenState
  ) {
    updateTabStateInStorage(tabId, focusState, openState);
    const newTabs = getTabsFromStorage();
    setTabsState(newTabs);
  }

  function clearClosedTabs() {
    clearClosedTabsFromStorage();
    const newTabs = getTabsFromStorage();
    setTabsState(newTabs);
  }

  return {
    tabs: tabsState,
    createNewTab,
    updateTabState,
    clearClosedTabs,
  };
}
