import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ResultArea from "./ResultArea";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with error msg", () => {
  act(() => {
    render(<ResultArea error={'something happened'} />, container);
  });
  expect(container.querySelector('h3').textContent).toBe("ERROR: something happened");

  act(() => {
    render(<ResultArea error={'something happened'} />, container);
  });
  expect(container.querySelector('h3').textContent).not.toBe("Everything OK!");
});

it("correctly renders canvas", () => {
  act(() => {
    render(<ResultArea error={null} data={[100,200]} range={[2014,2015]}/>, container);
  });
  expect(container.querySelector('div.canvas > svg').getAttribute('width')).toEqual("960");

  act(() => {
    render(<ResultArea error={null} data={[100,200]} range={[2014,2015]}/>, container);
  });
  expect(container.querySelector('div.canvas > svg').getAttribute('height')).toEqual("500");
});