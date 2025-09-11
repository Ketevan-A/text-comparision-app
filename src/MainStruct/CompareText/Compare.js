import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { diffChars } from "diff";
import "./Compare.css";

function setCaretToEnd(el) {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false); // move caret to end
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

const Compare = forwardRef((props, ref) => {
  //take text from first and second div
  const firstRef = useRef();
  const secondRef = useRef();
  
  //create usestate for texts
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  function handleInput1() {
    firstRef.current.innerHTML = firstRef.current.innerText;// remove all span if user continues tyiping
    setCaretToEnd(firstRef.current);//move caret to the end to continue typing from right 
    setText1(firstRef.current.innerText);//saves current text from the first div into
    props.onTextChange?.(firstRef.current.innerText.length > 0 || text2.length > 0);  //state and call a parent calllback
  }

  function handleInput2() {
    secondRef.current.innerHTML = secondRef.current.innerText;// remove all span if user continues tyiping
    setCaretToEnd(secondRef.current);//move caret to the end to continue typing from right 
    setText2(secondRef.current.innerText);//saves current text from the first div into
    props.onTextChange?.(text1.length > 0 || secondRef.current.innerText.length > 0);//state and call a parent calllback
  }

  //functions for parent to access this compare component
  useImperativeHandle(ref, () => ({
    runCompare() {
      //differentiate text with characters
      const diff = diffChars(text1, text2);

      //styles for removed and added characters
      const styleRemoved = "background-color: var(--removed-text-color); color: white;";
      const styleAdded = "background-color: var(--added-text-color); color: white;";

      //change html and make characters green or red
      firstRef.current.innerHTML = diff
        .map((part) => { //map through diff array
          if (part.removed) return `<span style="${styleRemoved}">${part.value}</span>`;
          if (!part.added) return part.value;
          return "";
        })
        .join("");
        
      //change html and make characters green or red
      secondRef.current.innerHTML = diff
        .map((part) => {//map through diff array
          if (part.added) return `<span style="${styleAdded}">${part.value}</span>`;
          if (!part.removed) return part.value;
          return "";
        })
        .join("");
    },
    //return true if div has text
    hasText() {
      return text1.length > 0 || text2.length > 0;
    },
    //clear text in div
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
