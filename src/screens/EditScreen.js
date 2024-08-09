import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateXeMay } from '../redux/XeMaySlice';
import ImagePicker from 'react-native-image-picker';

const EditScreen = ({ route, navigation }) => {
  const { xeMay } = route.params;

  // Kiểm tra và khởi tạo giá trị không null
  const [tenXe, setTenXe] = useState(xeMay?.ten_xe_PH32251 || '');
  const [mauSac, setMauSac] = useState(xeMay?.mau_sac_PH32251 || '');
  const [giaBan, setGiaBan] = useState(xeMay?.gia_ban_PH32251?.toString() || '');
  const [moTa, setMoTa] = useState(xeMay?.mo_ta_PH32251 || '');
  const [hinhAnh, setHinhAnh] = useState(xeMay?.hinh_anh_PH32251 || '');

  const dispatch = useDispatch();

  const handleUpdateXeMay = () => {
    const updatedXeMay = {
      id: xeMay.id,
      ten_xe_PH32251: tenXe,
      mau_sac_PH32251: mauSac,
      gia_ban_PH32251: parseFloat(giaBan),
      mo_ta_PH32251: moTa,
      hinh_anh_PH32251: hinhAnh,
    };

    dispatch(updateXeMay(updatedXeMay));
    navigation.goBack();
  };

  const chooseImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.uri) {
        setHinhAnh(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên xe:</Text>
      <TextInput style={styles.input} value={tenXe} onChangeText={setTenXe} />

      <Text style={styles.label}>Màu sắc:</Text>
      <TextInput style={styles.input} value={mauSac} onChangeText={setMauSac} />

      <Text style={styles.label}>Giá bán:</Text>
      <TextInput style={styles.input} value={giaBan} onChangeText={setGiaBan} keyboardType="numeric" />

      <Text style={styles.label}>Mô tả:</Text>
      <TextInput style={styles.input} value={moTa} onChangeText={setMoTa} />

      <Button title="Chọn hình ảnh" onPress={chooseImage} />
      {hinhAnh ? <Text>Đã chọn hình ảnh</Text> : null}

      <Button title="Cập nhật xe" onPress={handleUpdateXeMay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditScreen;
