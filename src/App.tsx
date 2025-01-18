function App() {
  return (
    <main>
      <h1 className="my-5 text-center text-3xl font-bold">
        Active Yuwa Extension
      </h1>
      <button id="runScript">Fetch Low-Comment Posts</button>
      <ul id="postList"></ul>
      <p id="noPosts" style={{ display: "none" }}>No low-comment posts found!</p>
    </main>
  );
}

export default App;
