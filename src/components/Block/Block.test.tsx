import React from 'react';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import sha256 from 'sha256';

import Block from './';

/**
 * Block Testing
 * Please Complete these tests
 */

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {

});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
  const { getByText } = render(
    <Block
      block={1}
      hash={""}
      onHash={()=>{}}
      onDelete={()=>{}}
    />
  );

  // expect(getByText("Not Valid")).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {

});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
  const block = 1;

  const { getByText } = render(
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
  const nonce: number = document.getElementsByTagName('span')[1].textContent;
  const hash: string = sha256(block + data + previousHash + nonce);
  expect(hash.substring(0, 3)).toBe('000');
});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {

});

