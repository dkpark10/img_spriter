import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MineSweeper from './components/template/minesweeper';

describe("instagram", () => {

  it("renders header", async () => {
    const { container, findAllByRole, getByText } = render(<MineSweeper />);
    const items = await findAllByRole('button');
    expect(items).toHaveLength(10);

    console.log(items[0].textContent);

    await waitFor(() => {
      fireEvent.click(items[0]);
      fireEvent.click(items[0]);
    })

    console.log(items[0].firstChild);

  });
});
