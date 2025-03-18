import "./styles.css";
import json from "./data.json";
import { useState } from "react";

function List({ json, addNodeToFolder, deleteFromFolder, addFileToFolder }) {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {json?.map((data) => (
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
              {isExpanded?.[data?.name] ? "_" : "+"}
            </span>
          )}{" "}
          <span>{data?.name}</span>{" "}
          {data?.isFolder && (
            <span onClick={() => addNodeToFolder(data?.id)}>
              <img
                className="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
              />
            </span>
          )}
          <span>
            <img
              className="img"
              onClick={() => deleteFromFolder(data?.id)}
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            />
          </span>
          {data?.isFolder && (
            <span onClick={() => addFileToFolder(data?.id)}>
              <img
                className="img"
                src="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
              />
            </span>
          )}
          {data.isFolder && isExpanded?.[data.name] && (
            <List
              json={data?.children}
              addNodeToFolder={addNodeToFolder}
              deleteFromFolder={deleteFromFolder}
              addFileToFolder={addFileToFolder}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(json);
  console.log("data", data);

  const deleteFromFolder = (itemId) => {
    console.log("delete Id", itemId);
    const updateTree = (list) => {
      console.log("list", list);
      return list
        ?.filter((node) => node.id !== itemId)
        ?.map((node) => {
          if (node?.children) {
            return { ...node, children: updateTree(node?.children) };
          }
          return node;
        });
    };
    // console.log("data to delete", data);
    setData((prev) => updateTree(prev));
  };

  const addFileToTopFolder = (parentId) => {
    console.log("parentId", parentId);
    const name = prompt();
    setData((prev) => [
      ...prev,
      { id: Date.now(), name: name, isFolder: false },
    ]);
  };

  const addFileToFolder = (parentId) => {
    console.log("parentId", parentId);
    const fileName = prompt("enter file name");
    const updateTree = (list) => {
      return list?.map((node) => {
        if (node?.id === parentId) {
          return {
            ...node,
            children: [
              ...node?.children,
              { id: Date.now(), name: fileName, isFolder: false },
            ],
          };
        }
        if (node?.children) {
          return { ...node, children: updateTree(node?.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const addNodeToFolder = (parentId) => {
    console.log("parentId", parentId);
    const name = prompt();
    const addFolder = (list) => {
      return list?.map((node) => {
        if (node?.id === parentId) {
          return {
            ...node,
            children: [
              ...node?.children,
              {
                id: Date.now(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node?.children) {
          return { ...node, children: addFolder(node?.children) };
        }
        return node;
      });
    };
    console.log("addFolder", addFolder(data));
    setData((prev) => addFolder(prev));
  };
  const addTopLevelFolder = () => {
    const name = prompt("etner name");
    setData((prev) => [
      ...prev,
      { id: Date.now(), name: name, children: [], isFolder: true },
    ]);
  };

  return (
    <div className="App">
      <div className="controls">
        <span className="controls" onClick={() => addTopLevelFolder()}>
          <img
            className="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
          />
        </span>
        <span className="controls" onClick={() => addFileToTopFolder(data?.id)}>
          <img
            className="img"
            src="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
          />
        </span>
      </div>
      <List
        json={data}
        addNodeToFolder={addNodeToFolder}
        deleteFromFolder={deleteFromFolder}
        addFileToFolder={addFileToFolder}
      />
    </div>
  );
}
