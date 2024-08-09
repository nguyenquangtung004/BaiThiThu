import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Thunk trong lập trình là một thuật ngữ dùng để chỉ một hàm được sử dụng như một đối số để trì hoãn việc tính toán.
// Trong ngữ cảnh của Redux, thunk thường là một hàm trả về một hàm khác.
// Redux Thunk là một middleware cho Redux cho phép bạn viết các action creators trả về một hàm thay vì một đối tượng action.
//  Thông thường, các action creators chỉ có thể trả về các đối tượng (actions), 
// nhưng khi sử dụng Redux Thunk, bạn có thể viết các action creators trả về một hàm có thể thực hiện các tác vụ bất đồng bộ (như gọi API) trước khi dispatch một action thông thường.

// Ví dụ ; Trong đoạn mã trên, fetchXeMays là một thunk. 
//Thay vì trả về một đối tượng action thông thường, nó trả về một hàm bất đồng bộ (async) để thực hiện một yêu cầu API. Khi API hoàn tất, 
//dữ liệu sẽ được trả về và Redux sẽ xử lý nó thông qua các case được xác định trong extraReducers
// URL API
//------------------------------------------------------------//
//Trong trường hợp này, bạn sử dụng export để xuất các thunk 
//(fetchXeMays, addXeMay, updateXeMay, deleteXeMay) và XeMaySlice.reducer để có thể sử dụng chúng ở các nơi khác trong ứng dụng của bạn.
//------------------------------------------------------------//
//createSlice là một hàm từ @reduxjs/toolkit giúp bạn dễ dàng tạo ra các slice của Redux store. Một "slice" bao gồm reducer và state ban đầu của nó, 
//cũng như các action creators tự động được tạo dựa trên các reducers bạn định nghĩa.

//createSlice nhận một đối tượng chứa các thuộc tính như:
// name: Tên của slice. Đây là tên duy nhất giúp phân biệt slice này với các slice khác trong store.
// initialState: Trạng thái ban đầu của slice.
// reducers: Nơi bạn định nghĩa các hàm để xử lý các action trong slice này.
// extraReducers: Dùng để xử lý các actions không được tạo ra bởi reducers trong slice này, thường là các actions từ createAsyncThunk.
//-----------------------------------------------------------//
// extraReducers cho phép slice xử lý các actions được tạo ra từ bên ngoài (như từ các thunk). 
// Khi một thunk được gọi, nó sẽ trải qua các trạng thái pending, fulfilled, và rejected,
//  và bạn có thể sử dụng extraReducers để xử lý các trạng thái này.
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
