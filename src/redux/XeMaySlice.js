import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// URL API
const API_URL = 'http://192.168.1.41:3000/XeMay';

// Thunk lấy danh sách xe
export const fetchXeMays = createAsyncThunk('xeMay/fetchXeMays', async () => {
  console.log('fetchXeMays: Bắt đầu lấy danh sách xe từ API');
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log('fetchXeMays: Dữ liệu nhận được từ API:', data);
  return data;
});

// Thunk thêm mới xe
export const addXeMay = createAsyncThunk('xeMay/addXeMay', async (newXe) => {
  console.log('addXeMay: Bắt đầu thêm xe mới:', newXe);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newXe),
  });
  const data = await response.json();
  console.log('addXeMay: Xe mới đã được thêm vào API:', data);
  return data;
});

// Thunk cập nhật xe
export const updateXeMay = createAsyncThunk('xeMay/updateXeMay', async (updatedXe) => {
  console.log('updateXeMay: Bắt đầu cập nhật xe:', updatedXe);
  const response = await fetch(`${API_URL}/${updatedXe.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedXe),
  });
  const data = await response.json();
  console.log('updateXeMay: Xe đã được cập nhật trên API:', data);
  return data;
});

// Thunk xóa xe
export const deleteXeMay = createAsyncThunk('xeMay/deleteXeMay', async (id) => {
  console.log(`deleteXeMay: Bắt đầu xóa xe với id: ${id}`);
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  console.log(`deleteXeMay: Xe với id: ${id} đã được xóa khỏi API`);
  return id;
});

const XeMaySlice = createSlice({
  name: 'xeMay',
  initialState: {
    xeMays: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchXeMays
      .addCase(fetchXeMays.pending, (state) => {
        console.log('fetchXeMays.pending: Đang lấy danh sách xe...');
        state.loading = true;
      })
      .addCase(fetchXeMays.fulfilled, (state, action) => {
        console.log('fetchXeMays.fulfilled: Lấy danh sách xe thành công');
        state.loading = false;
        state.xeMays = action.payload;
      })
      .addCase(fetchXeMays.rejected, (state, action) => {
        console.error('fetchXeMays.rejected: Lỗi khi lấy danh sách xe:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý addXeMay
      .addCase(addXeMay.fulfilled, (state, action) => {
        console.log('addXeMay.fulfilled: Thêm xe mới thành công:', action.payload);
        state.xeMays.push(action.payload);
      })
      // Xử lý updateXeMay
      .addCase(updateXeMay.fulfilled, (state, action) => {
        console.log('updateXeMay.fulfilled: Cập nhật xe thành công:', action.payload);
        const index = state.xeMays.findIndex((xe) => xe.id === action.payload.id);
        if (index !== -1) {
          state.xeMays[index] = action.payload;
        }
      })
      // Xử lý deleteXeMay
      .addCase(deleteXeMay.fulfilled, (state, action) => {
        console.log(`deleteXeMay.fulfilled: Xóa xe thành công với id: ${action.payload}`);
        state.xeMays = state.xeMays.filter((xe) => xe.id !== action.payload);
      });
  },
});

export default XeMaySlice.reducer;
