import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import { Adapter } from "enzyme-adapter-react-16";

const Hello = props => {
  return <h1>Hello {props.nme}</h1>;
};

describe("Testing renders", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

// Enzyme.configure({ adapter: new Adapter() });

// describe("Testing with enzyme", () => {
//   it("render an h1", () => {
//     const wrapper = shallow(<Hello>nme="there"</Hello>);
//     expect(wrapper.find("h1").length).toBe(1);
//   });

//   it("contains there", () => {
//     const wrapper = shallow(<Hello>nme="there"</Hello>);
//     expect(wrapper.contains(<h1>Hello there</h1>));
//   });
// });
