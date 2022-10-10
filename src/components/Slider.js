import React, { useEffect, useReducer, useRef } from "react";
import styled from "styled-components";
import { FlexBox } from "./ContentBase";

const SliderContainerBlock = styled(FlexBox)`
  position: absolute;
  transform: translate(${(props) => props.x}px, 0px);
  width: ${(props) => props.width};
  /* justify-content: space-between; */
  touch-action: pan-x;
`;

const SliderBox = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

function reducer(state, action) {

  const max = (curX) => {
    if (curX < state.xMin) {
      return state.xMin;
    } else if (curX > state.xMax) {
      return state.xMax;
    } else {
      return curX;
    }
  };
  switch (action.type) {    
    case "POINTERDOWN":
      state.downPosition = action.curPosition;
      state.lastPosition = action.curPosition;
      state.isActive = true;
      
      return { ...state };
    case "POINTERMOVE":
      if (state.isActive) {
        state.curTransX = max(state.prevTransX + (action.curPosition - state.lastPosition), state.xMin);
        state.prevTransX = state.curTransX;
        state.lastPosition = action.curPosition;
      }
      return { ...state };
    case "POINTERUP":
      if (state.isActive) {
        state.isActive = false;
        state.prevTransX = state.curTransX;
        return { ...state };
      }
      break;
    case "POINTERLEAVE":
      if (state.isActive) {
        state.isActive = false;
        return { ...state };
      }
      break;
    case "UPDATECONTAINER":
      state.curWidth = action.curWidth;
      state.xMin = -state.contentWidth + action.curWidth;
      return { ...state };
    default:
      break;
  }
  return { ...state };
}

function convertToInt(pxString) {
  return parseInt(pxString.slice(0, pxString.length - 2));
}

const SliderContainer = (props) => {
  return (
    <SliderContainerBlock
      x={props.curTransX}
      row={true}
      draggable={false}
      className="slider-container"
    >
      {props.children}
    </SliderContainerBlock>
  );
};
export default function Slider(props) {
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, {
    isActive: false,
    curTransX: 0,
    prevTransX: 0,
    curPosition: 0,
    xMax: 0,
    curWidth: 0,
    contentWidth: props.itemWidth * props.itemNumber,
    xMin: convertToInt(props.width) - props.itemWidth * props.itemNumber,
  });

  useEffect(()=>{
    dispatch({type:"UPDATECONTAINER", curWidth:ref.current.clientWidth})
  },
  [])

  return (
    <SliderBox
      ref={ref}
      width={props.width}
      height={props.height}
      itemWidth={props.itemWidth}
      itemNumber={props.itemNumber}
      padding={props.padding}
      {...props}
      draggable={false}

      onClickCapture={(e) => {
        let xDiff = state.downPosition - e.clientX;
        xDiff = xDiff > 0 ? xDiff : -xDiff;

        if (xDiff > 50) {
          e.preventDefault();
          e.stopPropagation();
        } 
      }}

      
      onMouseDownCapture={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: "POINTERDOWN", curPosition: e.clientX });
      }}
      onTouchStartCapture ={(e)=>{
        // e.stopPropagation();
        // e.preventDefault();
        dispatch({ type: "POINTERDOWN", curPosition: e.changedTouches[0].clientX });
      }}
      onTouchMoveCapture ={(e)=>{
        // e.stopPropagation();
        // e.preventDefault();
        dispatch({ type: "POINTERMOVE", curPosition: e.changedTouches[0].clientX });
      }}
      onTouchEndCapture ={(e)=>{
        // e.stopPropagation();
        // e.preventDefault();
        dispatch({ type: "POINTERUP", curPosition: e.changedTouches[0].clientX });
      }}
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: "POINTERMOVE", curPosition: e.clientX });
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: "POINTERUP", curPosition: e.clientX });
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: "POINTERLEAVE", curPosition: e.clientX });
      }}
    >
      <SliderContainer curTransX={state.curTransX}>
        {props.children}
      </SliderContainer>
    </SliderBox>
  );
}
