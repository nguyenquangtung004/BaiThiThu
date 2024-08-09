import React, { useEffect } from 'react';
import { View, FlatList, Text, Button, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchXeMays } from '../redux/XeMaySlice';
import Banner from '../components/Banner';
import XeMayItem from '../components/XeMayItem';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { xeMays, loading } = useSelector(state => state.xeMay);

  // Gọi API lấy danh sách xe khi component được mount
  useEffect(() => {
    dispatch(fetchXeMays());
  }, [dispatch]);

  // Hàm xử lý làm mới dữ liệu
  const onRefresh = () => {
    dispatch(fetchXeMays());
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Hiển thị banner quảng cáo */}
      <Banner />

      {/* Danh sách xe */}
      <FlatList
        data={xeMays}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <XeMayItem xeMay={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />

      {/* Nút thêm mới */}
      <Button title="Thêm Xe Mới" onPress={() => navigation.navigate('Add')} />
    </View>
  );
};

export default HomeScreen;
