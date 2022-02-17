import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('adds to list', () => {
  render(<App />);

  const textBox = screen.getByRole('textbox');
  userEvent.type(textBox, 'cookies');
  const add = screen.getByRole('button', { name: /Add/i });
  userEvent.click(add);

  expect(screen.getByText('cookies')).toBeInTheDocument();
});

test('changes li item', () => {
  render(<App />);

  const milk = screen.getByText(/Milk/i);
  const edit = within(milk).getByRole('button', { name: /Edit/i });
  userEvent.click(edit);
  const li = screen.getByRole('list');
  const changeInput = within(li).getByRole('textbox');
  userEvent.type(changeInput, 'cookies');

  const save = screen.getByRole('button', { name: /Save/i });
  userEvent.click(save);

  expect(screen.getByText('Milkcookies')).toBeInTheDocument();
});

test('deletes li item', () => {
  render(<App />);

  const noodles = screen.getByText(/Noodles/i);
  const x = within(noodles).getByRole('button', { name: /x/i });
  userEvent.click(x);

  expect(noodles).not.toBeInTheDocument();
});

test('displays all items', () => {
  render(<App />);
  const milk = screen.getByText(/Milk/i);
  expect(milk).toBeInTheDocument();

  const header = screen.getByRole('heading');
  expect(header).toBeInTheDocument();

  const li = screen.getAllByRole('listitem');
  expect(li).toHaveLength(3);
});

test('header clears all items', () => {
  render(<App />);

  const clear = screen.getByRole('button', { name: /Clear/i });
  userEvent.click(clear);

  const count = screen.getByText(`shopping list count: 0`);

  expect(count).toBeInTheDocument();
});
