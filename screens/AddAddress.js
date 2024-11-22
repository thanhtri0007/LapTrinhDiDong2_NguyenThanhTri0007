import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "./UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId } = useContext(UserType);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const handleEdit = (address) => {
    // Logic for editing the address
    console.log("Editing address:", address);
  };

  const handleRemove = async (addressId) => {
    try {
      await axios.delete(`http://localhost:8000/addresses/${addressId}`);
      fetchAddresses(); // Refresh addresses after removal
    } catch (error) {
      console.log("Error removing address:", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.searchContainer}>
          <AntDesign style={styles.searchIcon} name="search1" size={22} color="black" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={styles.addressList}>
        <Text style={styles.title}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={styles.addAddressButton}
        >
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        {addresses.map((item) => (
          <Pressable key={item.id} style={styles.addressContainer}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{item.name}</Text>
              <Entypo name="location-pin" size={24} color="red" />
            </View>
            <Text style={styles.addressDetail}>{item.houseNo}, {item.landmark}</Text>
            <Text style={styles.addressDetail}>{item.street}</Text>
            <Text style={styles.addressDetail}>Số đt: {item.mobileNo}</Text>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text>Edit</Text>
              </Pressable>
              <Pressable style={styles.removeButton} onPress={() => handleRemove(item.id)}>
                <Text>Remove</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    backgroundColor: "#00CED1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
  },
  addressList: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 10,
    flexDirection: "column",
    gap: 5,
    marginVertical: 10,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  addressName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  addressDetail: {
    fontSize: 15,
    color: "#181818",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  editButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: "#D0D0D0",
  },
  removeButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: "#D0D0D0",
  },
});
