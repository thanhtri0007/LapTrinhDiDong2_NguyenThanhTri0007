import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';
import { comparePassword, findUserByUsername } from '../api/lg';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin đăng nhập.');
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
      return;
    }

    setLoading(true);
    try {
      const user = findUserByUsername(username);
      if (user) {
        const isPasswordMatch = await comparePassword(password, user.password);
        if (isPasswordMatch) {
          navigation.navigate('Main');
          console.log('Đăng nhập thành công!');
        } else {
          Alert.alert('Thông báo', 'Mật khẩu không đúng.');
        }
      } else {
        Alert.alert('Thông báo', 'Người dùng không tồn tại.');
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error.message);
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/tri_2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/svglogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.header}>Đăng Nhập</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome name="user" size={20} color="#007BFF" style={styles.icon} />
            <TextInput
              style={[styles.input, focusedInput === 'username' && styles.inputFocused]}
              placeholder="Tên người dùng"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#B0B0B0"
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <FontAwesome name="lock" size={20} color="#007BFF" style={styles.icon} />
            <TextInput
              style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Hiện/ẩn mật khẩu
              placeholderTextColor="#B0B0B0"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? "eye" : "eye-slash"} // Biểu tượng ẩn hiện mật khẩu
                size={20}
                color="#007BFF"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
        
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Bạn chưa có tài khoản? Đăng ký ngay</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  inputFocused: {
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#007BFF',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  loadingIndicator: {
    marginBottom: 15,
  },
});

export default LoginScreen;
