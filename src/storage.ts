import { FocusState, OpenState, Tab } from "./types";

const TABS_KEY = "poc_tabs_key";

export function clearClosedTabsFromStorage() {
  const tabs = getTabsFromStorage();
  const openedTabs = tabs.filter((t) => t.openState === "opened");
  localStorage.setItem(TABS_KEY, JSON.stringify(openedTabs));
}

export function updateTabStateInStorage(
  tabId: string,
  focusState: FocusState,
  openState: OpenState
): void {
  const currentTabs = getTabsFromStorage();

  const currentDate = new Date();
  const newTabs = currentTabs.map((t) => {
    if (t.tabId !== tabId) return t;

    return {
      ...t,
      focusState,
      openState,
      lastChangeTime: currentDate,
    };
  });

  updateTabsStateInStorage(newTabs);
}

export function createNewTabInStorage(
  tabId: string,
  emoji: string,
  focusState: FocusState,
  openState: OpenState
): void {
  const currentDate = new Date();
  const newTab: Tab = {
    tabId,
    emoji,
    focusState,
    openState,
    lastChangeTime: currentDate,
  };

  const currentTabs = getTabsFromStorage();
  const newTabs = [...currentTabs, newTab];
  updateTabsStateInStorage(newTabs);
}

export function getTabsFromStorage(): Tab[] {
  const value = localStorage.getItem(TABS_KEY);

  if (value == null) return [];

  const tabs = JSON.parse(value) as Tab[];

  return tabs;
}

export function subscribeToTabsChange(cb: (tabs: Tab[]) => void): () => void {
  function handler() {
    const tabs = getTabsFromStorage();
    cb(tabs);
  }
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener("storage", handler);
  };
}

function updateTabsStateInStorage(tabs: Tab[]) {
  localStorage.setItem(TABS_KEY, JSON.stringify(tabs));
}
