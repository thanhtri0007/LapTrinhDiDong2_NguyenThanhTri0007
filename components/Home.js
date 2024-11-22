import {StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image,} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../products/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../screens/UserContext";
import jwt_decode from "jwt-decode";   

const HomeScreen = () => {
  const images = [
    "https://media.vneconomy.vn/images/upload/2022/12/07/mua-sam-online.png",
    "https://www.displayhersteller.de/ratgeber/wp-content/uploads/2022/12/Online-Shopping-2.jpg",
    "https://khaisanfood.vn/wp-content/uploads/2024/06/online-shopping-sites-benefits.png",
  ];

  const deals = [];
  const offers = [
    {
      id: "0",
      title: "Áo Khoác Da lộn Regular Phối Màu AK047 Màu Bò",
      offer: " Sale ",
      oldPrice: 55.00,
      price: 35.00,
      image:
        "https://4menshop.com/images/thumbs/2022/12/-17626-slide-products-638ef65e9fd38.jpg",
      carouselImages: [
        "https://4menshop.com/images/thumbs/2022/12/-17626-slide-products-638ef65e9fd38.jpg",
        "https://4menshop.com/images/thumbs/2022/12/-17626-slide-products-638ef65ee1439.jpg",
        "https://4menshop.com/images/thumbs/2022/12/-17626-slide-products-638ef65f30516.jpg",
        "https://4menshop.com/images/thumbs/2022/12/-17626-slide-products-638ef65f6ea3e.jpg"
      ],
    },
    {
      id: "1",
      title: "Áo Thun Regular Summer Escape",
      offer: "Sale ",
      oldPrice: 45.50,
      price: 25.00,
      image:
        "https://4menshop.com/images/thumbs/2022/05/-16720-slide-products-6278845ce0233.JPG",
      carouselImages: [
        "https://4menshop.com/images/thumbs/2022/05/-16720-slide-products-6278845ce0233.JPG",
        "https://4menshop.com/images/thumbs/2022/05/-16720-slide-products-6278845bee8d0.JPG",
        "https://4menshop.com/images/thumbs/2022/05/-16720-slide-products-6278845c4e3d2.JPG",
        "https://4menshop.com/images/thumbs/2022/05/-16720-slide-products-6278845c88750.JPG"
      ],
    },
    {
      id: "2",
      title: "Áo Thun Trơn Vải Rayon Thêu 4MEN",
      offer: "Sale",
      oldPrice: 23.00,
      price: 10.00,
      image:
        "https://4menshop.com/images/thumbs/2024/10/ao-thun-tron-vai-rayon-theu-4men-club-tay-ao-form-slimfit-at155-18805-slide-products-67090565e05b2.jpg",
      carouselImages: [
        "https://4menshop.com/images/thumbs/2024/10/ao-thun-tron-vai-rayon-theu-4men-club-tay-ao-form-slimfit-at155-18805-slide-products-67090565e05b2.jpg",
        "https://4menshop.com/images/thumbs/2024/10/ao-thun-tron-vai-rayon-theu-4men-club-tay-ao-form-slimfit-at155-mau-be-18806-slide-products-670905dced0db.jpg",
        "https://4menshop.com/images/thumbs/2024/10/ao-thun-tron-vai-rayon-theu-4men-club-tay-ao-form-slimfit-at155-mau-xanh-bien-dam-18807-slide-products-6709061d9d65d.jpg",
        "https://4menshop.com/images/thumbs/2024/10/ao-thun-tron-vai-rayon-theu-4men-club-tay-ao-form-slimfit-at155-18804-slide-products-67090457b70b5.jpg",
      ],
    },
  ];

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("men's clothing");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdress] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [items, setItems] = useState([
    { label: "Thời trang nam", value: "men's clothing" },
    { label: "Trang sức", value: "jewelery" },
    { label: "Điện tử", value: "electronics" },
    { label: "Thời trang nữ", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.log("Lỗi:", error);
      }
    };

    fetchData();
  }, []);  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const navigateToProductDetail = (productId) => {
    navigation.navigate("Info", { productId });
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("address", addresses);
  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "#FF6600",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={handleSearchPress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
                marginTop: 50,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Tìm kiếm sản phẩm..." />
              
            </Pressable>

          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable>
              {selectedAddress ? (
                <Text>
                  Giao hàng tới {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Thêm địa chỉ
                </Text>
              )}
            </Pressable>


            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>


          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

<Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color: "red" }}>
  Flash Sale Cực To Lên Tới 40%
</Text>

          

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                     {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} 
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem
                  item={item}
                  navigateToProductDetail={navigateToProductDetail}
                />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Chọn vị trí của bạn
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(addresses || []).map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
  style={{
    textAlign: "center",                  // Canh giữa nội dung
    color: "#007BFF",                     // Màu xanh dương nhẹ nhàng, dễ nhìn
    fontWeight: "600",                     // Chữ đậm hơn
    fontSize: 18,                          // Kích thước chữ lớn hơn
    backgroundColor: "#f0f8ff",            // Nền nhẹ nhàng (màu sắc sáng)
    paddingVertical: 12,                   // Thêm padding cho chữ, tạo không gian
    paddingHorizontal: 20,                 // Khoảng cách bên trái và phải
    borderRadius: 10,                      // Bo góc cho nền
    textTransform: "uppercase",            // Chữ in hoa
    letterSpacing: 1,                      // Giãn cách chữ một chút
    shadowColor: "#aaa",                   // Màu bóng đổ
    shadowOffset: { width: 0, height: 3 }, // Vị trí bóng
    shadowOpacity: 0.2,                    // Độ mờ của bóng
    shadowRadius: 5,                       // Độ mềm của bóng
  }}
>
  Thêm địa chỉ
</Text>

            </Pressable>
          </ScrollView>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
