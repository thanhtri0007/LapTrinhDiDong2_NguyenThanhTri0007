import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import Home from "./components/Home";
import CartScreen from "./cart/CartScreen";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Address from "./screens/Address";
import AddAddress from "./screens/AddAddress";
import ProductDetails from "./products/ProductDetails";
import store from "./store";
import { UserContext } from "./screens/UserContext";
import Search from "./screens/Search";
import Checkout from "./pay/Checkout";
import Confirm from "./pay/Confirm";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Trang chủ"
          component={Home}
          options={{
            tabBarLabel: "Trang chủ",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Giỏ hàng"
          component={CartScreen}
          options={{
            tabBarLabel: "Giỏ hàng",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Hồ sơ"
          component={Profile}
          options={{
            tabBarLabel: "Hồ sơ",
            tabBarLabelStyle: { color: "#008E97" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Info" component={ProductDetails} options={{ headerShown: false }} />
              <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
              <Stack.Screen name="Add" component={AddAddress} options={{ headerShown: false }} />
              <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
              <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
              <Stack.Screen name="Confirm" component={Confirm} options={{ headerShown: false }} />
              <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />

            </Stack.Navigator>
          </NavigationContainer>
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
