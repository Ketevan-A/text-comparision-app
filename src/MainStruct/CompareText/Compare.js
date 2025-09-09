import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { diffChars } from "diff";
import "./Compare.css";

const Compare = forwardRef((props, ref) => {
  const firstRef = useRef();
  const secondRef = useRef();

  function handleInput() {
    const text1 = firstRef.current.innerText.trim();
    const text2 = secondRef.current.innerText.trim();
    props.onTextChange?.(text1.length > 0 || text2.length > 0);
  }

  useImperativeHandle(ref, () => ({
    runCompare() {
      const text1 = firstRef.current.innerText;
      const text2 = secondRef.current.innerText;

      const diff = diffChars(text1, text2);

      const styleRemoved = "background-color: var(--removed-text-color); color: white;";
      const styleAdded   = "background-color: var(--added-text-color); color: white;";

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
      const text1 = firstRef.current.innerText.trim();
      const text2 = secondRef.current.innerText.trim();
      return text1.length > 0 || text2.length > 0;
    },
    clear() {
      firstRef.current.innerHTML = "";
      secondRef.current.innerHTML = "";
      props.onTextChange?.(false); 
    }
  }));

  return (
    <div className="compare">
      <div
        className="fake-textarea"
        ref={firstRef}
        contentEditable
        data-placeholder="დაიწყე წერა..."
        onInput={handleInput}
      ></div>
      <img src="/images/Group.png" alt="arrow" />
      <div
        className="fake-textarea"
        ref={secondRef}
        contentEditable
        data-placeholder="დაიწყე წერა..."
        onInput={handleInput}
      ></div>
    </div>
  );
});


export default Compare;
