import React, { useState } from 'react';
import { Pressable, Image, TouchableOpacity, Text, View, StyleSheet, ToastAndroid, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart/CartReducer';

const ProductItem = ({ item, navigateToProductDetail }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const scaleAnim = useState(new Animated.Value(1))[0]; // Giá trị scale khởi tạo

  const addItemToCart = (item) => {
    if (!addedToCart) {
      setAddedToCart(true);
      dispatch(addToCart(item));
      ToastAndroid.show("Sản phẩm đã được thêm vào giỏ!", ToastAndroid.SHORT); // Hiển thị thông báo

      // Thực hiện hiệu ứng nhấn
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9, // Thu nhỏ
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Trở lại kích thước ban đầu
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setAddedToCart(false);
      }, 60000); // Thời gian hiển thị thông báo
    }
  };

  return (
    <Pressable style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: item?.image }}
      />

      <TouchableOpacity onPress={navigateToProductDetail}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.price}>{item?.price} $</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={() => addItemToCart(item)}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartText}>
            {addedToCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
          </Text>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2, // Để có hiệu ứng bóng trên Android
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10, // Để bo góc hình ảnh
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 150,
    textAlign: 'center', // Căn giữa tiêu đề
    marginVertical: 5,
  },
  infoContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 15, // Tăng kích thước chữ để giá trở nên nổi bật hơn
  fontWeight: 'bold', // Chữ đậm để nhấn mạnh
  color: '#FF6347', // Sử dụng màu đỏ cam để tạo sự nổi bật và gần gũi với các nút CTA (call-to-action)
  textAlign: 'center', // Căn giữa văn bản
  textTransform: 'uppercase', // Làm cho chữ in hoa, tạo cảm giác mạnh mẽ
  paddingVertical: 8, // Tăng padding trên và dưới để tạo khoảng cách giữa giá và các phần tử khác
  paddingHorizontal: 15, // Thêm khoảng cách trái và phải để chữ không bị sát viền
  backgroundColor: '#FFF0F0', // Thêm nền màu hồng nhạt nhẹ nhàng để làm giá nổi bật
  borderRadius: 25, // Bo góc mềm mại và hiện đại
  marginVertical: 10, // Thêm khoảng cách trên và dưới để không bị sát với các phần tử khác
  borderWidth: 2, // Thêm viền dày để làm giá nổi bật hơn
  borderColor: '#FF4500', // Màu viền đỏ cam (tương đồng với màu nền)
  shadowColor: '#FF6347', // Màu bóng đổ đỏ cam nhẹ
  shadowOffset: { width: 0, height: 6 }, // Tạo bóng đổ phía dưới cho giá
  shadowOpacity: 0.2, // Đặt độ mờ bóng để tạo cảm giác nhẹ nhàng
  shadowRadius: 10, // Tạo bóng mềm mại
  elevation: 6, // Tạo bóng đổ trên Android
  letterSpacing: 1.5, // Khoảng cách giữa các chữ giúp giá trông rộng rãi và dễ đọc hơn
  fontFamily: 'Roboto', // Font chữ hiện đại và dễ đọc
  },
  addToCartButton: {
    backgroundColor: "#FF6600", // Màu sắc nút
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  addToCartText: {
    fontWeight: '500',
    color: 'white', // Màu chữ
  },
});

export default ProductItem;
