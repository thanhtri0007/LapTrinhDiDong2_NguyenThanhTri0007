import { Image, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "./UserContext";

const ProfileScreen = () => {
  const { userId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [user, setUser] = useState();

  const handleGoHome = () => {
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#FF5722",
      },
      headerLeft: () => (
        <Text style={styles.headerText}>
          Hồ sơ {user?.name}
        </Text>
      ),
      headerRight: () => (
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconContainer}>
            <Ionicons name="notifications-outline" size={26} color="white" />
          </Pressable>
          <Pressable style={styles.iconContainer}>
            <AntDesign name="search1" size={26} color="white" />
          </Pressable>
        </View>
      ),
    });
  }, [user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/profile/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/${userId}`);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.log("Lỗi khi lấy đơn hàng:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/tri_2.jpg')}
        style={styles.headerBackground}
      />
      <View style={styles.userInfo}>
        <Image
          source={require('../assets/svglogo.png')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>Thành Trí</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.actionButtonContainer}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Thông tin tài khoản</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleGoHome}>
          <Text style={styles.actionButtonText}>Đăng xuất</Text>
        </Pressable>
      </View>

      <View style={styles.ordersContainer}>
        <Text style={styles.ordersTitle}>Đơn hàng của bạn</Text>
        {loading ? (
          <Text style={styles.loadingText}>Đang tải...</Text>
        ) : (
          orders.length > 0 ? (
            orders.map((order, index) => (
              <View key={index} style={styles.orderItem}>
                <Text style={styles.orderText}>Đơn hàng #{order.id}</Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noOrdersText}>Bạn chưa có đơn hàng nào.</Text>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBackground: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 120,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Độ trong suốt
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF5722",
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  iconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Độ trong suốt
    marginLeft: 10,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    padding: 15,
    backgroundColor: "rgba(255, 87, 34, 0.9)", // Độ trong suốt
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  ordersContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
  orderItem: {
    padding: 15,
    backgroundColor: "rgba(224, 224, 224, 0.8)", // Độ trong suốt
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProfileScreen;
