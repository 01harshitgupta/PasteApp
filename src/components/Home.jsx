
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function handleSubmit() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="home-container">
      <div className="home-form">
        <input
          className="home-input"
          type="text"
          placeholder="Type title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSubmit} className="home-button">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <textarea
        className="home-textarea"
        value={value}
        placeholder="Enter content here..."
        onChange={(e) => setValue(e.target.value)}
        rows={15}
      />
    </div>
  );
};

export default Home;
