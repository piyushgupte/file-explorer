import "./styles.css";
import json from "./data.json";
import { useState } from "react";

function List({ json }) {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {json.map((data) => (
        <div key={data?.id}>
          {data.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [data?.name]: !prev[data?.name],
                }))
              }
            >
              +
            </span>
          )}{" "}
          <span>{data?.name}</span>
          {data.isFolder && isExpanded?.[data.name] && (
            <List json={data?.children} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <List json={json} />
    </div>
  );
}
