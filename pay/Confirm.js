import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ConfirmPaymentScreen = ({ route }) => {
    const navigation = useNavigation();
    const { products } = route.params || {};

    const handleGoHome = () => {
        navigation.navigate("Main");
    };

    const handleContinueShopping = () => {
        navigation.goBack();
    };

    const hasProducts = products && products.length > 0;

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: "https://example.com/success-icon.png" }} // Hình ảnh biểu tượng thành công
                style={styles.icon}
            />
            {hasProducts ? (
                <>
                    <Text style={styles.successText}>Thanh toán thành công!</Text>
                    <Text style={styles.messageText}>Cảm ơn bạn đã mua hàng!</Text>
                    <Text style={styles.instructionText}>
                        Bạn sẽ nhận được email xác nhận trong vài phút tới.
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.errorText}>Thanh toán không thành công</Text>
                    <Text style={styles.messageText}>Không có sản phẩm trong giỏ hàng.</Text>
                </>
            )}
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleGoHome}
            >
                <Text style={styles.buttonText}>Quay về trang chính</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.anotherButton} 
                onPress={handleContinueShopping}
            >
                <Text style={styles.anotherButtonText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Công ty của Trí</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        padding: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingHorizontal: 15,
    },
    icon: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    successText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#FF3D00",
        textAlign: "center",
    },
    errorText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#e74c3c",
        textAlign: "center",
    },
    messageText: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
        color: "#34495e",
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#7f8c8d",
    },
    button: {
        backgroundColor: "#1abc9c",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 3,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    anotherButton: {
        backgroundColor: "#f39c12",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 3,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    anotherButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    footer: {
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        width: '100%',
        alignItems: 'center',
    },
    footerText: {
        color: "#7f8c8d",
        fontSize: 14,
    },
});

export default ConfirmPaymentScreen;
