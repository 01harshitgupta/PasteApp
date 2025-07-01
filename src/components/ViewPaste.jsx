
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("final paste:", paste);

  return (
    <div>
      <div className='home-div'>
        <input
          className='home-title'
          type="text"
          placeholder="type title here..."
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste} className='home-button'>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>
      <div>
        <textarea
          className='home-textarea'
          value={paste.content}
          disabled
          placeholder='enter content here..'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
