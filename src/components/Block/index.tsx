import React, { useEffect, useState } from 'react';

import sha256 from 'sha256';
import styles from './styles.module.css';

interface Props {
  block: number;
  previousHash?: string;
  hash: string | undefined; // hash is undefined until set on initial render or hash updates via onHash
  onDelete?: () => void;
  onHash: (block: number, hash: string) => void;
}

/**
 * Block Component
 * Has all functionality for a block within a block chain.
 * You might need to add some things in here for step 2.
 * @param block number of this block
 * @param previousHash previous block's hash
 * @param hash the hash of the current block
 * @param onDelete deletion of this block
 * @param onHash hash change callback
 */
const Block = ({ block, previousHash = '0'.repeat(64), hash, onHash, onDelete }: Props) => {
  const [nonce, setNonce] = useState<number>(0);
  const [data, setData] = useState<string>('');

  // Every time the hash needs to be recalculated, call onHash
  useEffect(() => {
    onHash(block, sha256(block + data + previousHash + nonce))
  }, [block, data, previousHash, nonce]);

  // Checks if hash is valid
  const isValidHash = (hash: string) => hash.substring(0, 3) === '000';

  // Mine the block until we get a verified hash
  const onMine = (i = 1) => {
    while (!isValidHash(sha256(block + data + previousHash + i))) i++;
    onHash(block, sha256(block + data + previousHash + i));
    setNonce(i)
  };

  // combines multiple styles together
  const joinStyles = (...styles: string): string => {
    return styles.join(" ");
  }

  /**
    * returns the set of styles to be applied to the block:
    * block if the block is valid
    * block + invalid if the block is invalid
    */
  const getBlockStyles = (): string => {
    if(isValidHash(hash)) {
      return styles.block;
    }

    else {
      return joinStyles(styles.block, styles.invalid);
    }
  }

  return (
    <div className={getBlockStyles()}>
      <div>
        Block <span>{block}</span>
      </div>
      <div>
        Nonce <span>{nonce}</span>
      </div>
      <div>
        <label htmlFor={`data-${block}`}>Data</label>
        <textarea id={`data-${block}`} onChange={(e) => setData(e.target.value)}/>
      </div>
      <div>
        Previous Hash <span>{previousHash}</span>
      </div>
      <div>
        Hash <span>{hash}</span>
      </div>
      <div>
        Valid Block <span>{hash && isValidHash(hash) ? "Valid" : "Not Valid"}</span>
      </div>
      <button type="button" onClick={() => onMine()}>Mine</button>
      {onDelete && <button type="button" onClick={() => onDelete()}>Delete</button>}
    </div>
  )
};

export default Block;