import { TabState, Tab } from './types'

const TABS_KEY = 'poc_tabs_key'

export function clearTabStorage() {
  localStorage.removeItem(TABS_KEY)
}

export function updateTabState(tabId: string, state: TabState): void {
  const currentTabs = getTabs()

  const currentDate = new Date()
  const newTabs = currentTabs.map((t) => {
    if (t.tabId !== tabId) return t

    return {
      ...t,
      currentState: state,
      lastChangeTime: currentDate
    }
  })

  updateTabsStateInStorage(newTabs)
}

export function createNewTab(tabId: string, state: TabState): void {
  const currentDate = new Date()
  const newTab: Tab = {
    tabId,
    currentState: state,
    lastChangeTime: currentDate
  }

  const currentTabs = getTabs()
  const newTabs = [...currentTabs, newTab]
  updateTabsStateInStorage(newTabs)
}

export function getTabs(): Tab[] {
  const value = localStorage.getItem(TABS_KEY)

  if (value == null) return []

  const tabs = JSON.parse(value) as Tab[]

  return tabs
}

export function subscribeToTabsChange(cb: (tabs: Tab[]) => void): () => void {
  function handler() {
    console.log('storage has changed')
    const tabs = getTabs()
    console.log('new tab state', tabs)
    cb(tabs)
  }
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener('storage', handler)
  }
}

function updateTabsStateInStorage(tabs: Tab[]) {
  localStorage.setItem(TABS_KEY, JSON.stringify(tabs))
}
