import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaCopy, FaEye, FaShareAlt } from 'react-icons/fa';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(idToRemove) {
    dispatch(removeFromPaste(idToRemove));
  }

  return (
    <div>
      <input
        className='paste-input'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='paste-card'>
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div className='paste-title' key={paste?._id}>
              {/* Left Content (Title, Content, Date) */}
              <div className='paste-details'>
                <div className='paste-heading'>{paste.title}</div>
                <div className='paste-content'>{paste.content}</div>
                <div className='paste-date'>
                  📅{' '}
                  {new Date(paste.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {/* Right Buttons */}
              <div className='paste-button'>
                <button>
                  <a href={`/?pasteId=${paste?._id}`}>
                    <FaEdit />
                  </a>
                </button>
                <button>
                  <a href={`/pastes/${paste?._id}`}>
                    <FaEye />
                  </a>
                </button>
                <button onClick={() => handleDelete(paste?._id)}>
                  <FaTrash />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to Clipboard');
                  }}
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: shareUrl,
                        })
                        .then(() => toast.success('Shared successfully'))
                        .catch((err) => toast.error('Sharing failed'));
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      toast.success('Link copied to clipboard');
                    }
                  }}
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
