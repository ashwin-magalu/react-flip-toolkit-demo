import React, { useState } from "react";
import "./App.css";
import { Flipper, Flipped } from "react-flip-toolkit";

const listData = [...Array(3).keys()];

const shouldFlip = (index) => (prevDecisionData, currentDecisionData) =>
  index === prevDecisionData || index === currentDecisionData;

const ListItem = ({ index, onClick }) => (
  <Flipped
    flipId={`listItem-${index}`}
    shouldInvert={shouldFlip(index)}
    stagger="card"
  >
    <div className="listItem" onClick={() => onClick(index)}>
      <Flipped inverseFlipId={`listItem-${index}`}>
        <div className="listItemContent">
          <Flipped
            flipId={`avatar-${index}`}
            stagger="card-content"
            shouldFlip={shouldFlip(index)}
          >
            <div className="avatar" />
          </Flipped>
          <div className="description">
            {listData.map((i) => (
              <Flipped
                flipId={`description-${index}-${i}`}
                key={i}
                stagger="card-content"
                shouldFlip={shouldFlip(index)}
              >
                <div key={i} />
              </Flipped>
            ))}
          </div>
        </div>
      </Flipped>
    </div>
  </Flipped>
);

const ExpandedListItem = ({ index, onClick }) => (
  <Flipped
    flipId={`listItem-${index}`}
    stagger="card"
    onStart={(el) => {
      setTimeout(() => {
        el.classList.add("animated-in");
      }, 600);
    }}
  >
    <div className="expandedListItem" onClick={() => onClick(index)}>
      <Flipped inverseFlipId={`listItem-${index}`}>
        <div className="expandedListItemContent">
          <Flipped flipId={`avatar-${index}`} stagger="card-content">
            <div className="avatar avatarExpanded" />
          </Flipped>
          <div className="description">
            {listData.map((i) => (
              <Flipped
                flipId={`description-${index}-${i}`}
                key={i}
                stagger="card-content"
              >
                <div key={i} />
              </Flipped>
            ))}
          </div>
          <div className="additional-content">
            {listData.map((i) => (
              <div key={i} />
            ))}
          </div>
        </div>
      </Flipped>
    </div>
  </Flipped>
);

function App() {
  const [focused, setFocused] = useState(null);

  const onClick = (index) => {
    setFocused(focused === index ? null : index);
  };

  return (
    <Flipper
      flipKey={focused}
      className="staggered-list-content"
      spring="gentle"
      staggerConfig={{
        card: {
          reverse: focused !== null,
          speed: 0.5,
        },
      }}
      decisionData={focused}
    >
      <ul className="list">
        {listData.map((index) => {
          return (
            <li key={index}>
              {index === focused ? (
                <ExpandedListItem index={focused} onClick={onClick} />
              ) : (
                <ListItem index={index} key={index} onClick={onClick} />
              )}
            </li>
          );
        })}
      </ul>
    </Flipper>
  );
}

export default App;
