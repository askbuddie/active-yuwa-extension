document.addEventListener('DOMContentLoaded', () => {
  const runScriptButton = document.getElementById('runScript');
  const postList = document.getElementById('postList');
  const noPosts = document.getElementById('noPosts');
  if (runScriptButton) {
    runScriptButton.addEventListener('click', async () => {
      postList.innerHTML = '';
      noPosts.style.display = 'none';
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tab.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: fetchLowCommentPosts,
          },
          (results) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              return;
            }

            const lowCommentPosts = results[0]?.result || [];
            if (lowCommentPosts.length === 0) {
              noPosts.style.display = 'block';
            } else {
              lowCommentPosts.forEach((post) => {
                const li = document.createElement('li');
                li.textContent = `Post #${post.posinset} - ${post.commentCount} comments`;
                li.style.cursor = 'pointer';

                li.addEventListener('click', () => {
                  chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: leaveComment,
                    args: [post.posinset],
                  });
                });

                postList.appendChild(li);
              });
            }
          }
        );
      }
    });
  } else {
    console.error('#runScript button not found!');
  }
});

function fetchLowCommentPosts() {
  const storyMessages = document.querySelectorAll('[aria-posinset]');
  const lowCommentPosts = [];
  const commentRegex = /\n\s*(\d+)\s*comment(s?)\s*\n/i;

  storyMessages.forEach((story) => {
    const postText = story.innerText;
    const match = postText.match(commentRegex);

    if (match) {
      const commentCount = parseInt(match[1], 10);
      if (commentCount < 5) {
        lowCommentPosts.push({
          posinset: story.getAttribute('aria-posinset'),
          commentCount,
        });
      }
    }
  });

  return lowCommentPosts;
}

function leaveComment(posinset) {
  const post = document.querySelector(`[aria-posinset='${posinset}']`);
  if (!post) {
    console.error('Post not found: ', posinset);
    return;
  }

  const commentButton = post.querySelector("[aria-label='Leave a comment']");
  if (commentButton) {
    commentButton.click();
  } else {
    console.error('Comment button not found: ', posinset);
  }
}
