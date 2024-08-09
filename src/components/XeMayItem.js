import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteXeMay } from '../redux/XeMaySlice';

const XeMayItem = ({ xeMay, navigation }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa xe này không?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            dispatch(deleteXeMay(xeMay.id));
            console.log('Xe đã bị xóa');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: xeMay.hinh_anh_PH32251 }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{xeMay.ten_xe_PH32251}</Text>
        <Text>Màu sắc: {xeMay.mau_sac_PH32251}</Text>
        <Text>Giá bán: {xeMay.gia_ban_PH32251} VND</Text>
        <Text>Mô tả: {xeMay.mo_ta_PH32251}</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Sửa"
          onPress={() => navigation.navigate('Edit', { xeMay })}
        />
        <Button
          title="Xóa"
          color="red"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttons: {
    justifyContent: 'space-around',
  },
});

export default XeMayItem;
