import * as React from "react";
import { useTabs } from "./hooks";
import { getRandomEmoji } from "./emoji_generator";
import { partition } from "lodash";
import { Tab } from "./types";
import "./styles.css";

export default function App() {
  const { tabs, createNewTab, updateTabState, clearClosedTabs } = useTabs();
  const { tabId, emoji } = React.useMemo(() => {
    const tabId = Date.now().toString();
    const emoji = getRandomEmoji();
    return { tabId, emoji };
  }, []);

  // create new tab on mount, which is the new tab event
  React.useEffect(() => {
    const title = document.querySelector("title");
    if (title != null) title.textContent = emoji;

    createNewTab(
      tabId,
      emoji,
      document.hidden ? "blurred" : "focused",
      "opened"
    );
    // eslint-disable-next-line
  }, [tabId]);

  // unload event
  React.useEffect(
    () => {
      function onUnload() {
        updateTabState(
          tabId,
          document.hidden ? "blurred" : "focused",
          "closed"
        );
      }

      window.addEventListener("beforeunload", onUnload);

      return () => window.removeEventListener("beforeunload", onUnload);
    },
    // eslint-disable-next-line
    []
  );

  // tab focus/blur event
  React.useEffect(
    () => {
      function onVisibilityChange() {
        const isHidden = document.hidden;
        updateTabState(
          tabId,
          isHidden ? "blurred" : "focused",
          isHidden ? "closed" : "opened"
        );
      }

      document.addEventListener("visibilitychange", onVisibilityChange);

      return () =>
        document.removeEventListener("visibilitychange", onVisibilityChange);
    },
    //eslint-disable-next-line
    []
  );

  React.useEffect(
    () => {
      function handleBlur() {
        updateTabState(tabId, "blurred", "opened");
      }

      function handleFocus() {
        updateTabState(tabId, "focused", "opened");
      }
      window.addEventListener("focus", handleFocus);
      window.addEventListener("blur", handleBlur);
    },
    // eslint-disable-next-line
    []
  );

  function handleClearClosedTabs() {
    clearClosedTabs();
  }

  function handleOpenNewTab() {
    window.open(document.location.href);
  }

  const [currentTab, otherTabs] = partition(tabs, (t) => t.tabId === tabId);

  const [openedTabs, closedTabs] = partition(
    otherTabs,
    (t) => t.openState === "opened"
  );

  return (
    <div className="App">
      <button onClick={handleOpenNewTab}>Open New Tab</button>
      {tabs.length === 0 ? <div>No tabs to show yo</div> : null}
      <div>
        <span>Current Tab</span>
        <div className="current-tab">
          {currentTab.map((t) => (
            <TabRecord key={t.tabId} tab={t} />
          ))}
        </div>
      </div>
      <div className="other-tabs">
        <span>Opened Tabs</span>
        {openedTabs.map((t) => (
          <TabRecord key={t.tabId} tab={t} />
        ))}
      </div>
      <div className="other-tabs">
        <span>Closed Tabs</span>
        <button onClick={handleClearClosedTabs}>Clear Closed Tabs</button>
        {closedTabs.map((t) => (
          <TabRecord key={t.tabId} tab={t} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  tab: Tab;
}
function TabRecord({ tab }: Props) {
  return (
    <div className="tab-record">
      <span className="tab-emoji">{tab.emoji}</span> is{" "}
      <span className="callout">{tab.focusState}</span> and{" "}
      <span className="callout">{tab.openState}</span>. Last changed at{" "}
      {tab.lastChangeTime.toLocaleString()}
    </div>
  );
}
