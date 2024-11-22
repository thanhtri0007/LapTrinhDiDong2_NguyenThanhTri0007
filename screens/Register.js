import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/register', {
        username,
        email,
        password,
      });
      console.log('Phản hồi từ máy chủ:', response.data);
      Alert.alert('Thành công', 'Đăng ký thành công!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Lỗi đăng ký:', error.message);
      Alert.alert('Lỗi', 'Đăng ký không thành công. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/512px-SVG_Logo.svg.png' }} style={styles.logo} />
      <Text style={styles.header}>Đăng Ký</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#f76a6a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#f76a6a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#f76a6a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? "visibility-off" : "visibility"} size={20} color="#f76a6a" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#f76a6a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableWithoutFeedback onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon name={showConfirmPassword ? "visibility-off" : "visibility"} size={20} color="#f76a6a" />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e1f5fe',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f76a6a',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f76a6a',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 50,
    flex: 1,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#f76a6a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
