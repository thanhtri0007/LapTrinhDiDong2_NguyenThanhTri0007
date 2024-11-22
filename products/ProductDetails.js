import { ScrollView, Text, View, Pressable, TextInput, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/CartReducer";
import axios from "axios";

const ProductDetails = ({ route }) => {
  const { productId, carouselImages, oldPrice, price } = route.params;
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ color: '', size: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const reviews = [
    { id: 1, name: "Nguyễn Kim Hoàng Anh", rating: 4, comment: "Sản phẩm rất tốt, tôi rất hài lòng với chất lượng!" },
    { id: 2, name: "Đỗ Quốc Huy", rating: 5, comment: "Dịch vụ tuyệt vời và sản phẩm chất lượng!" },
    { id: 3, name: "Nguyễn Thành Trí", rating: 3, comment: "Sản phẩm tạm ổn, nhưng có thể cải thiện." },
  ];

  const addItemToCart = () => {
    if (route.params && route.params.id && !addedToCart) {
      setAddedToCart(true);
      dispatch(addToCart({ ...route.params, selectedOption, paymentMethod, shippingMethod }));
      setTimeout(() => {
        setAddedToCart(false);
      }, 60000);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  const fetchProductDetail = async (productId) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      const productDetail = response.data;
      setProductDetail(productDetail);
    } catch (error) {
      console.error('Lỗi khi tìm chi tiết sản phẩm:', error);
    }
  };

  useEffect(() => {
    if (!productDetail && productId) {
      fetchProductDetail(productId);
    }
  }, [productId, productDetail]);

  const colors = ["Đỏ", "Xanh", "Vàng"];
  const sizes = ["S", "M", "L"];
  const shippingMethods = [
    { id: 'standard', label: 'Giao hàng tiêu chuẩn (3-5 ngày)' },
    { id: 'express', label: 'Giao hàng nhanh (1-2 ngày)' },
    { id: 'same_day', label: 'Giao hàng trong ngày' },
  ];
  const paymentMethods = [
    { id: 'cod', label: 'Thanh toán khi nhận hàng' },
    { id: 'online', label: 'Thanh toán trực tuyến' },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={15}
        color={index < rating ? "#FF5722" : "#C0C0C0"}
      />
    ));
  };

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{
        backgroundColor: "#f7f7f7",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            backgroundColor: "white",
            borderRadius: 20,
            height: 38,
            flex: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
            paddingHorizontal: 10,
          }}
        >
          <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
          <TextInput placeholder="Tìm kiếm sản phẩm..." style={{ flex: 1 }} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {carouselImages && carouselImages.map((item, index) => (
          <ImageBackground
            key={index}
            style={{ width: 300, height: 300, marginTop: 25, resizeMode: "contain", borderRadius: 15, overflow: 'hidden' }}
            source={{ uri: item }}
          />
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>
            {route.params.title}
          </Text>
          <Pressable onPress={toggleFavorite}>
            <AntDesign name={isFavorited ? "heart" : "hearto"} size={24} color={isFavorited ? "red" : "black"} />
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Text style={{ fontSize: 16, textDecorationLine: 'line-through', color: 'gray', marginRight: 5 }}>
            {oldPrice ? `${oldPrice} $` : ''}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF5722' }}>
            {price} $
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          {renderStars(4)}
          <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>4.0</Text>
          <Text style={{ marginLeft: 5, color: 'gray' }}>({reviews.length} đánh giá)</Text>
        </View>

        <Text style={{ marginTop: 5, color: 'gray', fontSize: 14 }}>
          Đã bán: 500 sản phẩm
        </Text>

        <Text style={{ fontSize: 16, marginVertical: 10 }}>
          Mô tả: Đây là sản phẩm tuyệt vời với chất lượng hàng đầu. Được làm từ nguyên liệu tự nhiên, sản phẩm này mang lại sự thoải mái và tiện lợi cho người sử dụng. Hãy trải nghiệm ngay để cảm nhận sự khác biệt!
        </Text>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dịch vụ:</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>✅ Bảo hành 1 năm</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>✅ Giao hàng miễn phí</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>✅ Hỗ trợ khách hàng 24/7</Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Chọn màu sắc:</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {colors.map((color, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedOption({ ...selectedOption, color })}
                style={{
                  padding: 10,
                  borderWidth: selectedOption.color === color ? 2 : 1,
                  borderColor: selectedOption.color === color ? "#FF5722" : "#ccc",
                  borderRadius: 10,
                  marginRight: 10,
                  backgroundColor: selectedOption.color === color ? "#FF5722" : "transparent",
                  elevation: selectedOption.color === color ? 2 : 0,
                }}
              >
                <Text style={{ color: selectedOption.color === color ? "#fff" : "#000" }}>{color}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Chọn kích thước:</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {sizes.map((size, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedOption({ ...selectedOption, size })}
                style={{
                  padding: 10,
                  borderWidth: selectedOption.size === size ? 2 : 1,
                  borderColor: selectedOption.size === size ? "#FF5722" : "#ccc",
                  borderRadius: 10,
                  marginRight: 10,
                  backgroundColor: selectedOption.size === size ? "#FF5722" : "transparent",
                  elevation: selectedOption.size === size ? 2 : 0,
                }}
              >
                <Text style={{ color: selectedOption.size === size ? "#fff" : "#000" }}>{size}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Khuyến mãi:</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>🎉 Giảm giá 10% cho đơn hàng đầu tiên!</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>🎁 Sử dụng mã: WELCOME10</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Hình thức thanh toán:</Text>
          {paymentMethods.map(method => (
            <Pressable
              key={method.id}
              onPress={() => setPaymentMethod(method.id)}
              style={{
                padding: 10,
                backgroundColor: paymentMethod === method.id ? '#FF5722' : '#f0f0f0',
                borderRadius: 10,
                marginTop: 10,
                elevation: 2,
              }}
            >
              <Text style={{ color: paymentMethod === method.id ? 'white' : 'black' }}>{method.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Phương thức vận chuyển:</Text>
          {shippingMethods.map(method => (
            <Pressable
              key={method.id}
              onPress={() => setShippingMethod(method.id)}
              style={{
                padding: 10,
                backgroundColor: shippingMethod === method.id ? '#FF5722' : '#f0f0f0',
                borderRadius: 10,
                marginTop: 10,
                elevation: 2,
              }}
            >
              <Text style={{ color: shippingMethod === method.id ? 'white' : 'black' }}>{method.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Chính sách đổi trả:</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>
            ✅ Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.
          </Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>
            ✅ Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng.
          </Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>
            ✅ Khách hàng phải chịu chi phí vận chuyển cho việc đổi trả.
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đánh giá của khách hàng:</Text>
          <Text style={{ marginTop: 5, color: 'gray' }}>
            Tổng số đánh giá: {reviews.length}
          </Text>
          <View style={{ marginTop: 10 }}>
            {reviews.map(review => (
              <View key={review.id} style={{ marginBottom: 15, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{review.name}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  {renderStars(review.rating)}
                </View>
                <Text style={{ marginTop: 5 }}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ height: 1, borderColor: "#e0e0e0", borderWidth: 1, marginVertical: 10 }} />

      <Pressable
        onPress={addItemToCart}
        style={{
          backgroundColor: "#FF5722",
          padding: 15,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 10,
          elevation: 3,
        }}
      >
        <Text style={{ color: "white", fontWeight: 'bold' }}>
          {addedToCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
        </Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#00C853",
          padding: 15,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 10,
          elevation: 3,
        }}
      >
        <Text style={{ color: "white", fontWeight: 'bold' }}>Mua Ngay</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductDetails;
