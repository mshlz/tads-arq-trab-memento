import { useEffect, useState } from "react";
import "./App.css";
import { Editor, Snapshot } from "./Editor";

function App() {
  const [count, setCount] = useState(0);

  const [editor] = useState(new Editor());
  const [snapshots, setHistory] = useState<Snapshot[]>([]);

  const update = (block: () => any) => {
    block();
    setCount(count + 1);
  };

  const saveHistory = () => {
    const snapshot = editor.createSnapshot();
    setHistory([snapshot, ...snapshots]);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode == 90 && event.ctrlKey) {
      // ctrl + z
      if (snapshots.length) {
        event.preventDefault();
        update(() => snapshots[0].restore());
      }
    } else if (event.keyCode == 83 && event.ctrlKey) {
      // ctrl + s
      event.preventDefault();
      saveHistory();
    }
  };
  window.onkeydown = onKeyDown;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ display: "flex", flexDirection: "column", minWidth: "500px" }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="fontColor">Font color</label>
            <input
              id="fontColor"
              type="color"
              value={editor.getFontColor()}
              onChange={(ev) =>
                update(() => editor.setFontColor(ev.target.value))
              }
            />
          </div>
          <div>
            <label htmlFor="bgColor">BG color</label>
            <input
              id="bgColor"
              type="color"
              value={editor.getBgColor()}
              onChange={(ev) =>
                update(() => editor.setBgColor(ev.target.value))
              }
            />
          </div>
          <div>
            <button onClick={() => saveHistory()}>save state</button>

            <button onClick={() => console.log(editor, "History", snapshots)}>
              debug
            </button>
          </div>
        </div>
        <textarea
          rows={10}
          style={{
            color: editor.getFontColor(),
            background: editor.getBgColor(),
          }}
          onChange={(ev) => update(() => editor.setText(ev.target.value || ""))}
          value={editor.getText()}
        ></textarea>
      </div>

      <div className="stateList">
        <ul>
          {snapshots.map((snapshot, i, l) => (
            <li
              key={`snap-${snapshot.date.getTime()}`}
              onClick={() => update(() => snapshot.restore())}
            >
              state ({l.length-i}) {snapshot.date.toLocaleTimeString()}
            </li>
          ))}
          {snapshots.length ? <button onClick={() => setHistory([])}>Clear history</button> : <></>}
        </ul>
      </div>
    </div>
  );
}

export default App;
