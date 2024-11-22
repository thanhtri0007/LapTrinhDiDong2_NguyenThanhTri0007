import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "./CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart?.reduce((curr, item) => curr + item.price * item.quantity, 0) || 0;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => dispatch(removeFromCart(item)) },
    ]);
  };

  const applyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscountAmount(total * 0.1);
    } else {
      Alert.alert("Mã không hợp lệ", "Vui lòng nhập mã giảm giá hợp lệ.");
    }
  };

  const finalTotal = total - discountAmount;

  return (
    <ScrollView style={[styles.container, { marginTop: 50 }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
        <Pressable style={styles.searchBox}>
          <AntDesign name="search1" size={22} color="black" style={styles.searchIcon} />
          <TextInput placeholder="Tìm kiếm sản phẩm" style={styles.searchInput} />
        </Pressable>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng giá: </Text>
        <Text style={styles.totalAmount}>{finalTotal.toFixed(2)} $</Text>
      </View>

      <View style={styles.discountContainer}>
        <TextInput 
          placeholder="Nhập mã giảm giá"
          style={styles.discountInput}
          value={discountCode}
          onChangeText={setDiscountCode}
        />
        <Pressable onPress={applyDiscount} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Áp dụng</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Checkout", { cart })}
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutText}>Thanh toán ({cart.length}) sản phẩm</Text>
      </Pressable>

      <View style={styles.separator} />

      <View style={styles.cartContainer}>
        {cart?.map((item, index) => (
          <View style={styles.cartItem} key={index}>
            <Pressable style={styles.cartItemContent}>
              <Image style={styles.itemImage} source={{ uri: item?.image }} />
              <View style={styles.itemDetails}>
                <Text numberOfLines={2} style={styles.itemTitle}>{item?.title}</Text>
                <Text style={styles.itemPrice}>Giá: {item?.price.toFixed(2)} $</Text>
                <Text style={styles.itemSubtotal}>Tổng: {(item.price * item.quantity).toFixed(2)} $</Text>
              </View>
            </Pressable>

            <View style={styles.quantityContainer}>
              <Pressable
                onPress={() => item?.quantity > 1 ? decreaseQuantity(item) : deleteItem(item)}
                style={styles.quantityButton}
              >
                <AntDesign name={item?.quantity > 1 ? "minus" : "delete"} size={24} color="black" />
              </Pressable>

              <Pressable style={styles.quantityDisplay}>
                <Text>{item?.quantity}</Text>
              </Pressable>

              <Pressable onPress={() => increaseQuantity(item)} style={styles.quantityButton}>
                <Feather name="plus" size={24} color="black" />
              </Pressable>

              <Pressable onPress={() => deleteItem(item)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {cart.length === 0 && (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  



  header: {
    backgroundColor: "#FF3D00",
    padding: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    width: "90%",
    paddingHorizontal: 10,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: 16,
  },
  totalContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "400",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3D00",
  },
  checkoutButton: {
    backgroundColor: "#00FF00",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  checkoutText: {
    color: "white",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginVertical: 10,
  },
  cartContainer: {
    marginHorizontal: 10,
  },
  cartItem: {
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cartItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  itemDetails: {
    justifyContent: "center",
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
    color: "#FF3D00",
  },
  itemSubtotal: {
    fontSize: 14,
    color: "#555",
  },
  quantityContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderRadius: 6,
  },
  quantityDisplay: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  deleteButton: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
  },
  deleteButtonText: {
    color: "#FF3D00",
  },
  emptyCartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  discountInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: "#FF3D00",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

