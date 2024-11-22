import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductItem from "../products/ProductItem";
import axios from "axios";

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy sản phẩm:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = useCallback(() => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, handleSearch]);

    const navigateToProductDetail = (productId) => {
        navigation.navigate("Info", { productId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Pressable style={styles.searchInputContainer}>
                    <AntDesign style={styles.searchIcon} name="search1" size={22} color="#555" />
                    <TextInput
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.textInput}
                    />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.productsContainer}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <View key={item.id} style={styles.productWrapper}>
                            <ProductItem
                                item={item}
                                navigateToProductDetail={() => navigateToProductDetail(item.id)}
                            />
                        </View>
                    ))
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>Không tìm thấy sản phẩm nào.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        paddingTop: Platform.OS === "android" ? 40 : 0,
    },
    searchContainer: {
        backgroundColor: "#FF6600",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    productsContainer: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "center", // Căn giữa các sản phẩm
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    productWrapper: {
        width: '48%', // Điều chỉnh chiều rộng sản phẩm
        margin: '1%', // Khoảng cách giữa các sản phẩm
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    noResultsText: {
        fontSize: 16,
        color: "#999",
    },
});
