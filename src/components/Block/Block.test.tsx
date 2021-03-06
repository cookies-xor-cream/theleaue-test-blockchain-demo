import React from 'react';
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import sha256 from 'sha256';

import Block from './';

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
  const block = 1;
  const onHash = jest.fn();

  const { getByText, getByTestId, rerender } = render(
    <Block
      block={block} 
      hash={""}
      onHash={onHash}
      onDelete={()=>{}}
    />
  );

  expect(onHash).toHaveBeenCalledTimes(1);

  const data: string = "";
  const previousHash: string = "0".repeat(64);
  const nonce: number = 0;
  const hash: string = sha256(block + data + previousHash + nonce);

  expect(hash).toHaveLength(64);

  rerender(
    <Block
      block={block} 
      hash={hash}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  const renderedHash: string = getByTestId('hash-value').textContent;
  expect(renderedHash).toBe(hash);
});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
  const block = 1;

  const { getByText } = render(
    <Block
      block={block} 
      hash={""}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  expect(getByText("Not Valid")).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
  const block = 1;

  const onDelete = jest.fn()

  const { getByText } = render(
    <Block
      block={block} 
      hash={""}
      onHash={()=>{}}
      onDelete={onDelete}
    />
  );

  userEvent.click(getByText("Delete"));
  expect(onDelete).toHaveBeenCalledTimes(1);
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
  const block = 1;

  const { getByText, getByTestId, rerender } = render(
    <Block
      block={block} 
      hash={""}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  userEvent.click(getByText("Mine"));

  const data: string = "";
  const previousHash: string = "0".repeat(64);
  const nonce: number = getByTestId('nonce-value').textContent;
  const hash: string = sha256(block + data + previousHash + nonce);
  expect(hash.substring(0, 3)).toBe('000');

  rerender(
    <Block
      block={block} 
      hash={hash}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  expect(screen.getByText("Valid")).toBeInTheDocument();
});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
  const block = 1;

  const { getByText, getByLabelText, getByTestId, rerender } = render(
    <Block
      block={block} 
      hash={""}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  const oldHash: string = getByTestId('hash-value').textContent;

  const dataInput = getByLabelText("Data", {selector: "textarea"});
  userEvent.type(screen.getByRole('textbox'), 'test input');

  expect(getByLabelText("Data")).toHaveValue('test input');

  const data: string = dataInput.value;
  expect(data).toBe('test input');

  const previousHash: string = "0".repeat(64);
  const nonce: number = getByTestId('nonce-value').textContent;
  const hash: string = sha256(block + data + previousHash + nonce);

  rerender(
    <Block
      block={block} 
      hash={hash}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  const newHash: string = getByTestId('hash-value').textContent;

  expect(newHash).not.toBe(oldHash);
});

