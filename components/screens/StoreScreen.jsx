import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreScreen = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(null);

  const userId = null;
  const productTypeId = 1;

  const getUserId = async () => {
    userId = await AsyncStorage.getItem("userID");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("storeCart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }

        const responseWallet = await apiService.getWalletByUserId(userId);
        setBalance(responseWallet.data.balance);

        const responseProducts = await apiService.getProductsByProductTypeId(
          productTypeId
        );
        setProducts(responseProducts.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
    getUserId();
  }, [userId, productTypeId]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const addToCart = () => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === selectedProduct.id
      );
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...selectedProduct, quantity }];
      }

      AsyncStorage.setItem("storeCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    setModalVisible(false);
  };

  const chargeStoreCart = async () => {
    await AsyncStorage.setItem("storeCart", JSON.stringify(cart));
  };

  const renderProduct = ({ item }) => (
    <Pressable
      onPress={() => openProductModal(item)}
      style={styles.productContainer}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}€</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.navIcon}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Tienda</Text>
        <Link asChild href={"/cartStore"}>
          <Pressable style={styles.cartButton} onPress={chargeStoreCart}>
            <Image
              source={require("../../assets/icons/cart-icon.png")}
              style={styles.cartIcon}
            />
          </Pressable>
        </Link>
      </View>

      {balance !== null && (
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Saldo Actual: {balance}€</Text>
        </View>
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
      />

      {selectedProduct && (
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalProductName}>
                {selectedProduct.name}
              </Text>
              <Text>{selectedProduct.description}</Text>
              <Text style={styles.modalProductPrice}>
                {selectedProduct.price}€
              </Text>

              <View style={styles.quantityContainer}>
                <Pressable
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Pressable
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
              </View>

              <View style={styles.buttonContainer}>
                <Pressable onPress={addToCart} style={styles.actionButton}>
                  <Text style={styles.buttonText}>Añadir</Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.actionButton}
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
    elevation: 5,
  },
  navIcon: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  cartButton: {
    padding: 10,
  },
  cartIcon: {
    width: 40,
    height: 40,
  },
  balanceContainer: {
    padding: 10,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#009688",
  },
  productsContainer: {
    paddingHorizontal: 10,
  },
  productContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    margin: 10,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#009688",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalProductPrice: {
    fontSize: 16,
    color: "#009688",
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#333",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  actionButton: {
    backgroundColor: "#009688",
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StoreScreen;
