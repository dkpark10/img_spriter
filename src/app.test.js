import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import App from './app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer/index';

describe("count", () => {

  const getCountText = buttonType => {
    const store = createStore(rootReducer);
    const result = render(
      <Provider store={store}>
        <App />
      </Provider>);

    const count = result.getByText('0');
    const button = result.getByText(buttonType);
    fireEvent.click(button);

    return count.textContent;
  }

  it("increase", async () => {
    const count = getCountText('increase');
    expect(count).toBe('1');
  });

  it("decrease", async () => {
    const count = getCountText('decrease');
    expect(count).toBe('-1');
  });
});
