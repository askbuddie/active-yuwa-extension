const detectPosts = () => {
  const feed = document.querySelector("[role='feed']");
  if (!feed) {
    console.log("Feed not found");
    return;
  }

  return [];
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message, sender);

  switch (message.type) {
    case "detectPosts":
      const posts = detectPosts();

      console.log("Posts detected:", posts);

      sendResponse({ status: "success", posts });
      break;
    default:
      sendResponse({ status: "unknown message type" });
  }
});
