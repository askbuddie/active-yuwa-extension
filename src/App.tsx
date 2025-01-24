import { useEffect } from "react";

const ASK_BUDDIE_URL = "https://www.facebook.com/groups/124814721420217";

function App() {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const isAskBuddieTab = tabs[0].url === ASK_BUDDIE_URL;

      if (!isAskBuddieTab) return;
    });
  }, []);

  const onDetectPost = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        const isAskBuddieTab = tab.url === ASK_BUDDIE_URL;

        if (!isAskBuddieTab) return;
        if (!tab.id) return;

        chrome.tabs.sendMessage(tab.id, {
          type: "detectPosts",
        });
      }
    });
  };
  return (
    <div>
      <h1 className="my-5 text-center text-3xl font-bold">
        Active Yuwa Extension
      </h1>

      <button
        onClick={onDetectPost}
        style={{ background: "white", padding: "10px" }}
      >
        Detect Post
      </button>
    </div>
  );
}

export default App;
