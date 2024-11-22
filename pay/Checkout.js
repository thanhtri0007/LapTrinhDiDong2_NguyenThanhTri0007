import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Image, Alert, Pressable, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../cart/CartReducer';
import { useDispatch } from 'react-redux';

const CheckoutScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [paymentType, setPaymentType] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [qrCodeImage, setQrCodeImage] = useState(require('../assets/qr.jpg'));

    useEffect(() => {
        const cartItems = route.params.cart;
        if (!cartItems || cartItems.length === 0) {
            Alert.alert("Giỏ hàng trống", "Vui lòng thêm sản phẩm trước khi thanh toán.");
            navigation.goBack();
            return;
        }

        const totalPriceBeforeDiscount = cartItems
            .map((item) => item.price * item.quantity)
            .reduce((curr, prev) => curr + prev, 0) || 0;

        const discountPercentage = 10;
        const discountAmount = (discountPercentage / 100) * totalPriceBeforeDiscount;
        const totalPriceAfterDiscount = totalPriceBeforeDiscount - discountAmount;

        setTotalBeforeDiscount(totalPriceBeforeDiscount);
        setTotalAfterDiscount(totalPriceAfterDiscount);
    }, [route.params.cart]);

    const handleApplyPromoCode = () => {
        if (promoCode === "DISCOUNT10") {
            const discountAmount = (10 / 100) * totalBeforeDiscount;
            const newTotal = totalBeforeDiscount - discountAmount;
            setTotalAfterDiscount(newTotal);
            Alert.alert("Mã giảm giá đã được áp dụng!", `Giá sau giảm: ${newTotal.toFixed(2)} $`);
        } else {
            Alert.alert("Mã giảm giá không hợp lệ!");
        }
    };

    const handlePayment = () => {
        const cartItems = route.params.cart;

        if (!cartItems || cartItems.length === 0) {
            Alert.alert("Giỏ hàng trống", "Vui lòng thêm sản phẩm trước khi thanh toán.");
            return;
        }

        if (paymentType === "card" && (!cardNumber || !expiryDate)) {
            Alert.alert("Vui lòng nhập thông tin thẻ đầy đủ!");
            return;
        }

        dispatch(cleanCart());
        navigation.navigate("Confirm", { products: cartItems });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.heading, { marginTop: 30 }]}>Xác nhận thanh toán</Text>

            <View style={styles.paymentTypeContainer}>
                {["card", "qrCode", "cashOnDelivery"].map((type) => (
                    <Pressable
                        key={type}
                        style={[styles.paymentButton, paymentType === type && styles.selectedPayment]}
                        onPress={() => setPaymentType(type)}
                    >
                        <Text style={styles.paymentText}>{type === "card" ? "Thẻ ngân hàng" : type === "qrCode" ? "Mã QR" : "Khi nhận hàng"}</Text>
                    </Pressable>
                ))}
            </View>

            {paymentType === "card" && (
                <View style={styles.paymentFields}>
                    <Text style={styles.label}>Số thẻ ngân hàng</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập số thẻ"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>Ngày hết hạn (MM/YY)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        keyboardType="numeric"
                    />
                </View>
            )}
            {paymentType === "qrCode" && (
                <View style={styles.qrCodeContainer}>
                    <Image source={qrCodeImage} style={styles.qrCodeImage} />
                    <Text style={styles.qrCodeText}>Quét mã QR để thanh toán</Text>
                </View>
            )}

            <View style={styles.promoCodeContainer}>
                <Text style={styles.label}>Mã giảm giá</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChangeText={setPromoCode}
                />
                <Pressable style={styles.applyPromoButton} onPress={handleApplyPromoCode}>
                    <Text style={styles.applyPromoText}>Áp dụng</Text>
                </Pressable>
            </View>

            <View style={styles.totalContainer}>
                <View style={styles.totalRow}>
                    <Text style={styles.label}>Tổng giá trước giảm giá:</Text>
                    <Text style={styles.price}>{totalBeforeDiscount.toFixed(2)} $</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.label}>Tổng giá sau giảm giá:</Text>
                    <Text style={styles.price}>{totalAfterDiscount.toFixed(2)} $</Text>
                </View>

                <Pressable style={styles.paymentButton} onPress={handlePayment}>
                    <Text style={styles.paymentText}>Thanh toán</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f7f9fc",
        padding: 20,
        borderRadius: 10,
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FF3D00",
        textAlign: "center",
    },
    paymentTypeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    paymentButton: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: "center",
        elevation: 3,
    },
    selectedPayment: {
        backgroundColor: "#FF3D00",
    },
    paymentText: {
        color: "#34495e",
        fontWeight: "bold",
    },
    paymentFields: {
        width: "100%",
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        elevation: 3,
    },
    promoCodeContainer: {
        width: "100%",
        marginBottom: 20,
    },
    totalContainer: {
        width: "100%",
        alignItems: "center",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        width: "100%",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#34495e",
    },
    input: {
        height: 45,
        borderColor: "#bdc3c7",
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: "#ecf0f1",
    },
    qrCodeContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    qrCodeImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    qrCodeText: {
        color: "#34495e",
        fontSize: 16,
        textAlign: "center",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e74c3c",
    },
    applyPromoButton: {
        backgroundColor: "#1abc9c",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    applyPromoText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
