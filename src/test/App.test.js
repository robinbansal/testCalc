import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App.js";
import * as Calculator from "../components/Calculator-core";

configure({ adapter: new Adapter() });

describe("App", () => {
  let expression;
  it("evaluates the expression correctly", () => {
    expression = [2 + 3 + 4 - 4 * 3];
    expect(Calculator.evaluate(expression)).toBe(-3);

    expression = [0 + 3 + 4];
    expect(Calculator.evaluate(expression)).toBe(7);

    expression = [0 - 9];
    expect(Calculator.evaluate(expression)).toBe(-9);

    expression = [0.5 + 2.3];
    expect(Calculator.evaluate(expression)).toBe(2.8);
  });

  it('evaluates expressions starting with a "-" operator', () => {
    expression = [-30];
    expect(Calculator.evaluate(expression)).toBe(-30);
  });

  it('evaluates longer expressions starting with a "-" operator', () => {
    expression = [-30 - 6];
    expect(Calculator.evaluate(expression)).toBe(-36);

    expression = [-0.5 + 5.3];
    expect(Calculator.evaluate(expression)).toBe(4.8);
  });
});
