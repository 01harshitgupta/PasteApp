import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste(state, action) {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully")
    },
    updateToPaste(state, action) {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(p => p._id === updatedPaste._id);

      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully");
      } else {
        toast.error("Paste not found to update");
      }
    },
    resetAllPaste(state, action) {
      state.pastes = [];

      localStorage.removeItem("pastes");
      toast.success("All Pastes Reset");
    },
    removeFromPaste(state, action) {
      const idToRemove = action.payload;
      state.pastes = state.pastes.filter(paste => paste._id !== idToRemove);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Removed Successfully");

    },
  },
})

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions
export default pasteSlice.reducer