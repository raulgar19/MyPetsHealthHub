import React, { useState, useEffect, useRef } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../api";

const CartStoreScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const storedCart = localStorage.getItem("storeCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateCartStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("storeCart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const showSuccessModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userID");
    const total = calculateTotalPrice();

    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario.");
      return;
    }

    if (total <= 0) {
      Alert.alert("Error", "El carrito está vacío.");
      return;
    }

    try {
      await ApiService.deductMoney(userId, total);
      showSuccessModal();
      updateCartStorage([]);
    } catch (error) {
      Alert.alert("Error", "No se pudo completar la compra.");
      console.error("Error al realizar la compra:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Carrito de la tienda</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.cartItemContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cartItemImage}
                />
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    {item.price.toFixed(2)}€
                  </Text>
                  <View style={styles.quantityContainer}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        updateCartStorage(
                          cartItems.map((cartItem) =>
                            cartItem.id === item.id && cartItem.quantity > 1
                              ? { ...cartItem, quantity: cartItem.quantity - 1 }
                              : cartItem
                          )
                        )
                      }
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        updateCartStorage(
                          cartItems.map((cartItem) =>
                            cartItem.id === item.id
                              ? { ...cartItem, quantity: cartItem.quantity + 1 }
                              : cartItem
                          )
                        )
                      }
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  style={styles.removeButton}
                  onPress={() =>
                    updateCartStorage(
                      cartItems.filter((cartItem) => cartItem.id !== item.id)
                    )
                  }
                >
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: {calculateTotalPrice()}€
            </Text>
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Realizar Compra</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Tu carrito está vacío.</Text>
      )}

      <Modal transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <Text style={styles.modalTitle}>¡Compra realizada!</Text>
            <Text style={styles.modalMessage}>
              Tu pedido ha sido procesado con éxito.
            </Text>
            <Link asChild href={"/store"}>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => {
                  setModalVisible(false);
                  fadeAnim.setValue(0);
                }}
              >
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </Pressable>
            </Link>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#B7E3DD",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    backgroundColor: "#006368",
    paddingHorizontal: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  cartContainer: {
    paddingHorizontal: 10,
  },
  cartItemContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#009688",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#006368",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 250,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "#009688",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartStoreScreen;
