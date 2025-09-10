import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { diffChars } from "diff";
import "./Compare.css";

const Compare = forwardRef((props, ref) => {
  const firstRef = useRef();
  const secondRef = useRef();

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  function handleInput1() {
    setText1(firstRef.current.innerText);
    props.onTextChange?.(firstRef.current.innerText.length > 0 || text2.length > 0);
  }

  function handleInput2() {
    setText2(secondRef.current.innerText);
    props.onTextChange?.(text1.length > 0 || secondRef.current.innerText.length > 0);
  }

  useImperativeHandle(ref, () => ({
    runCompare() {
      const diff = diffChars(text1, text2);

      const styleRemoved = "background-color: var(--removed-text-color); color: white;";
      const styleAdded = "background-color: var(--added-text-color); color: white;";

      firstRef.current.innerHTML = diff
        .map((part) => {
          if (part.removed) return `<span style="${styleRemoved}">${part.value}</span>`;
          if (!part.added) return part.value;
          return "";
        })
        .join("");

      secondRef.current.innerHTML = diff
        .map((part) => {
          if (part.added) return `<span style="${styleAdded}">${part.value}</span>`;
          if (!part.removed) return part.value;
          return "";
        })
        .join("");
    },
    hasText() {
      return text1.length > 0 || text2.length > 0;
    },
    clear() {
      setText1("");
      setText2("");
      firstRef.current.innerHTML = "";
      secondRef.current.innerHTML = "";
      props.onTextChange?.(false);
    },
  }));
  
  return (
    <div className="compare" style={props.style}>
      <div
        className="fake-textarea"
        ref={firstRef}
        contentEditable
        data-placeholder="დაიწყე წერა..."
        onInput={handleInput1}
      ></div>
      <img src="/images/Group.png" alt="arrow" />
      <div
        className="fake-textarea"
        ref={secondRef}
        contentEditable
        data-placeholder="დაიწყე წერა..."
        onInput={handleInput2}
      ></div>
    </div>
  );
});

export default Compare;
