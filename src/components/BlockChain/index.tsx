import React, { useState } from 'react';

import Block from '../Block';

import styles from './styles.module.css';

/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */
const BlockChain = () => {
  // Contains all hashes
  const [hashes, setHashes] = useState<string[]>([]);

  // contains all the content
  const [blockContents, setBlockContents] = useState<string[]>([]);

  /**
   * onAdd creates a new block
   * it initializes the content as an empty string
   * it initializes the hash as 0 (64 hex digits)
   * it updates the state synchronously to avoid race conditions
   */
  const onAdd = () => {
    const newBlockContents: string[] = [...blockContents, ""];
    setBlockContents(() => newBlockContents);

    // increase the size of hashes, this instantly changes
    const newHashes: string[] = [...hashes, "0".repeat(64)];
    setHashes(() => newHashes);
  }

  /**
   * onDelete deletes the last block
   * Only the last block receives this function
   */
  const onDelete = () => {
    const newBlockContents: string[] = [
      ...blockContents.slice(0, blockContents.length - 1)
    ];
    setBlockContents(() => newBlockContents);

    const newHashes: string[] = [
      ...hashes.slice(0, hashes.length - 1)
    ];
    setHashes(() => newHashes);
  }

  /**
   * Updates the hash of the block with block number `_block`
   * Sets the new hash value to `hash` (calculated by the block)
   */
  const onHash = (_block: number, hash: string) => {
    const newHashes: string[] = [...hashes];
    newHashes[_block-1] = hash;
    setHashes(newHashes);
  }

  /**
   * Displays a list of blocks and the number that there are dynamically
   */
  return (
    <div className={styles.blockChain}>
      <div className={styles.stickyContainer}>
        <div><h1>Block Chain Demo</h1> Total Blocks: {blockContents.length}</div>
      </div>


      <div className={styles.blockListWrapper}>
        {blockContents.map(
           (content, i) => {
            const deletionHandler = (i == blockContents.length - 1) ?
              onDelete :
              null;

            const previousHash = (i > 0) ?
              hashes[i-1] :
              "0".repeat(64); /**
                                * the default value of previousHash
                                * technically handled by the Block
                                * I figured that this is more readable
                                */
            return (
             <Block
              key={i}
              block={i+1} 
              hash={hashes[i]}
              previousHash={previousHash}
              onHash={onHash}
              onDelete={deletionHandler}/>
            );
           }
        )}
      </div>

      <div className={styles.stickyContainer}>
        <button type="button" onClick={() => onAdd()}>Add Block</button>
      </div>
    </div> 
  );
}

export default BlockChain;
