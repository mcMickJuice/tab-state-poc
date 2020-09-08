import * as React from 'react'
import {
  subscribeToTabsChange,
  createNewTab,
  clearTabStorage,
  updateTabState
} from './storage'
import { Tab } from './types'
/**
 * keep state of opened tabs
 * tab id
 * open date
 * enter text message
 * focus event
 * blur event
 * close date (nullable)
 */

function useTabs() {
  const [tabsState, setTabsState] = React.useState<Tab[]>([])

  React.useEffect(() => {
    const unSub = subscribeToTabsChange((tabs) => setTabsState(tabs))

    return unSub
  }, [])
  console.log('useTabs rerender', tabsState.length)

  return tabsState
}

export default function App() {
  const tabs = useTabs()
  const tabId = React.useMemo(() => Date.now().toString(), [])

  // create new tab on mount, which is the new tab event
  React.useEffect(() => {
    const isDocumentHidden = document.hidden
    createNewTab(tabId, isDocumentHidden ? 'blurred' : 'focused')

    // this will fire when app closes or just rerender??
    return () => {
      updateTabState(tabId, 'closed')
    }
  }, [tabId])

  function handleClearStorage() {
    clearTabStorage()
  }

  function handleOpenNewTab() {
    window.open(document.location.href)
  }

  console.log(tabs)

  return (
    <div className="App">
      <button onClick={handleClearStorage}>Clear Storage</button>
      <button onClick={handleOpenNewTab}>Open New Tab</button>
      {tabs.length === 0 ? <div>No tabs to show yo</div> : null}
      {tabs.map((t) => (
        <div key={t.tabId}>
          {t.tabId} is {t.currentState}. Last changed at{' '}
          {t.lastChangeTime.toLocaleString()}
        </div>
      ))}
    </div>
  )
}
