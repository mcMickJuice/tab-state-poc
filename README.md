# tab-state-poc

url - https://compassionate-hypatia-34d1cf.netlify.app/
- open a tab. Notice that its state is "focused" and "opened"
- click the "open another tab" button
- notice that tab is now "focused" and "opened" and has the previous tab in the "opened" section with a state of "blurred" and "opened"
- open a number of other tabs
- split your windows so that multiple are visible at the same time
- click between windows and notice that the state of the tab updates as you click (this is the window "focus" and "blur" events firing)
- click on another application. All tabs show now be "blurred" as they're not focused
- close one of the tabs. that tab should now appear in the "closed" section

References:

- window.focus/blur https://stackoverflow.com/questions/7389328/detect-if-browser-tab-has-focus
- page visibility api (document is visible or not) - https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- page lifecycle - https://developers.google.com/web/updates/2018/07/page-lifecycle-api

Interesting but not part of POC

- local storage event - https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
  - key here is "interface fires when a storage area (localStorage) has been _modified in the context of another document_."
