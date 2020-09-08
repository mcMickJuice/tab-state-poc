export type TabState = 'focused' | 'closed' | 'blurred'

export interface Tab {
  tabId: string
  currentState: TabState
  lastChangeTime: Date
}
