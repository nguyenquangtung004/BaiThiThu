import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// Import các màn hình
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import EditScreen from './src/screens/EditScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Danh Sách Xe' }} />
          <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Thêm Xe Mới' }} />
          <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Sửa Thông Tin Xe' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
