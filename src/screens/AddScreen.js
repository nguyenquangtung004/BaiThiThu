import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addXeMay } from '../redux/XeMaySlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const AddScreen = ({ navigation }) => {
  console.log('AddScreen: Khởi tạo màn hình thêm xe'); // Log khi màn hình AddScreen được khởi tạo

  const [tenXe, setTenXe] = useState('');
  const [mauSac, setMauSac] = useState('');
  const [giaBan, setGiaBan] = useState('');
  const [moTa, setMoTa] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');

  const dispatch = useDispatch();

  const handleAddXeMay = () => {
    console.log('AddScreen: Bắt đầu quá trình thêm xe mới'); // Log khi bắt đầu quá trình thêm xe

    const newXeMay = {
      ten_xe_PH32251: tenXe,
      mau_sac_PH32251: mauSac,
      gia_ban_PH32251: parseFloat(giaBan),
      mo_ta_PH32251: moTa,
      hinh_anh_PH32251: hinhAnh,
    };

    console.log('AddScreen: Dữ liệu xe mới:', newXeMay); // Log dữ liệu xe mới trước khi gửi lên API

    dispatch(addXeMay(newXeMay))
      .then(() => {
        console.log('AddScreen: Thêm xe thành công, quay lại màn hình trước'); // Log khi thêm xe thành công
        navigation.goBack(); // Quay lại màn hình trước
      })
      .catch((error) => {
        console.error('AddScreen: Lỗi khi thêm xe:', error); // Log khi gặp lỗi trong quá trình thêm xe
      });
  };

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
  
    Alert.alert(
      'Chọn ảnh',
      'Bạn muốn chọn ảnh từ đâu?',
      [
        {
          text: 'Chụp ảnh',
          onPress: () => {
            console.log('AddScreen: Người dùng chọn chụp ảnh');
            launchCamera(options, (response) => {
              if (response.didCancel) {
                console.log('AddScreen: Người dùng đã hủy chụp ảnh');
              } else if (response.errorCode) {
                console.error('AddScreen: Lỗi khi chụp ảnh:', response.errorCode);
              } else {
                setHinhAnh(response.assets[0].uri);
                console.log('AddScreen: Hình ảnh đã được chụp:', response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Chọn từ thư viện',
          onPress: () => {
            console.log('AddScreen: Người dùng chọn ảnh từ thư viện');
            launchImageLibrary(options, (response) => {
              if (response.didCancel) {
                console.log('AddScreen: Người dùng đã hủy chọn ảnh từ thư viện');
              } else if (response.errorCode) {
                console.error('AddScreen: Lỗi khi chọn ảnh từ thư viện:', response.errorCode);
              } else {
                setHinhAnh(response.assets[0].uri);
                console.log('AddScreen: Hình ảnh đã được chọn từ thư viện:', response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên xe:</Text>
      <TextInput
        style={styles.input}
        value={tenXe}
        onChangeText={(text) => {
          setTenXe(text);
          console.log('AddScreen: Người dùng đã thay đổi tên xe:', text);
        }}
      />
  
      <Text style={styles.label}>Màu sắc:</Text>
      <TextInput
        style={styles.input}
        value={mauSac}
        onChangeText={(text) => {
          setMauSac(text);
          console.log('AddScreen: Người dùng đã thay đổi màu sắc:', text);
        }}
      />
  
      <Text style={styles.label}>Giá bán:</Text>
      <TextInput
        style={styles.input}
        value={giaBan}
        onChangeText={(text) => {
          setGiaBan(text);
          console.log('AddScreen: Người dùng đã thay đổi giá bán:', text);
        }}
        keyboardType="numeric"
      />
  
      <Text style={styles.label}>Mô tả:</Text>
      <TextInput
        style={styles.input}
        value={moTa}
        onChangeText={(text) => {
          setMoTa(text);
          console.log('AddScreen: Người dùng đã thay đổi mô tả:', text);
        }}
      />
  
      <Button title="Chọn hình ảnh" onPress={chooseImage} />
      {hinhAnh ? <Text>Đã chọn hình ảnh</Text> : null}
  
      <Button title="Thêm xe" onPress={handleAddXeMay} />
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

export default AddScreen;
