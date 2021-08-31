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
  const [blockContents, setBlockContents] = useState<String[]>([]);

  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    const newBlockContents = [...blockContents, ""];
    setBlockContents(newBlockContents);

    const newHashes = [...hashes, "0"];
    setHashes(newHashes);
  }

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {
    
  }

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (_block: number, hash: string) => {
    setHashes([hash]);
  }

  const testblocks = blockContents.map(
    (i, c) => <Block key={i} block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>
  )

  /**
   * Fix the return statement
   * Currently we only show one block, this is incorrect.
   * We need to be able to show multiple blocks as a block chain should.
   * You'll most likely need to add more functions or states to fix the render. Figure out a way you can go about this.
   * Total Blocks is also incorrect.
   */
  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: 0</div>

      {/*{testblocks}*/}
      {/*{blockContents.map((i, num)=>{<Block block={1} hash={hashes[0]}></Block>})}*/}
      {/*{blockContents[0]}*/}

      {blockContents.map(
         (content, i) => {
          const deletion = (i == blockContents.length) ?
          onDelete :
          ()=>{}

          return (
           <Block
            key={i}
            block={i+1} 
            hash={hashes[i]}
            onHash={onHash}
            onDelete={onDelete}/>
          );
         }
      )}

      <button type="button" onClick={() => onAdd()}>Add Block</button>
    </div> 
  );
}

export default BlockChain;