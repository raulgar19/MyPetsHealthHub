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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PharmacyScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Pharmacy");
  const [pharmacyCart, setPharmacyCart] = useState([]);
  const [parapharmacyCart, setParapharmacyCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(null);
  const [pharmacyProducts, setPharmacyProducts] = useState([]);
  const [parapharmacyProducts, setParapharmacyProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userID");
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchWallet = async () => {
        try {
          const response = await apiService.getWalletByUserId(userId);
          setBalance(response.data.balance);
        } catch (error) {
          console.error("Error al obtener el saldo:", error);
        }
      };

      const fetchPharmacyProducts = async () => {
        try {
          const response = await apiService.getProductsByProductTypeId(3);
          setPharmacyProducts(response.data);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        }
      };

      const fetchParapharmacyProducts = async () => {
        try {
          const response = await apiService.getProductsByProductTypeId(2);
          setParapharmacyProducts(response.data);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        }
      };

      fetchWallet();
      fetchPharmacyProducts();
      fetchParapharmacyProducts();
    }
  }, [userId]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedPharmacyCart = await AsyncStorage.getItem("pharmacyCart");
      const storedParapharmacyCart = await AsyncStorage.getItem(
        "parapharmacyCart"
      );

      if (storedPharmacyCart) {
        setPharmacyCart(JSON.parse(storedPharmacyCart));
      }

      if (storedParapharmacyCart) {
        setParapharmacyCart(JSON.parse(storedParapharmacyCart));
      }
    };

    fetchCart();
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const addToCart = () => {
    const cartToUpdate =
      selectedTab === "Pharmacy" ? pharmacyCart : parapharmacyCart;

    const setCartToUpdate =
      selectedTab === "Pharmacy" ? setPharmacyCart : setParapharmacyCart;

    setCartToUpdate((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === selectedProduct.id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...selectedProduct, quantity }];
      }
    });

    setModalVisible(false);
  };

  const renderProduct = ({ item }) => (
    <Pressable
      onPress={() => openProductModal(item)}
      style={styles.productContainer}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}€</Text>
    </Pressable>
  );

  const saveCartToLocalStorage = async () => {
    await AsyncStorage.setItem("pharmacyCart", JSON.stringify(pharmacyCart));
    await AsyncStorage.setItem(
      "parapharmacyCart",
      JSON.stringify(parapharmacyCart)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href="/home">
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.navIcon}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Farmacia</Text>
        <Link
          asChild
          href="/cartPharmacy"
          onPress={() => {
            saveCartToLocalStorage();
          }}
        >
          <Pressable style={styles.cartButton}>
            <Image
              source={require("../../assets/icons/cart-icon.png")}
              style={styles.cartIcon}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setSelectedTab("Pharmacy")}
          style={[styles.tab, selectedTab === "Pharmacy" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Pharmacy" && styles.activeTabText,
            ]}
          >
            Farmacia
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab("Parapharmacy")}
          style={[
            styles.tab,
            selectedTab === "Parapharmacy" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Parapharmacy" && styles.activeTabText,
            ]}
          >
            Parafarmacia
          </Text>
        </Pressable>
      </View>

      {balance !== null && (
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Saldo Actual: {balance}€</Text>
        </View>
      )}

      {Platform.OS !== "web" && (
        <FlatList
          data={
            selectedTab === "Pharmacy" ? pharmacyProducts : parapharmacyProducts
          }
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsContainer}
        />
      )}

      {Platform.OS === "web" && (
        <FlatList
          data={
            selectedTab === "Pharmacy" ? pharmacyProducts : parapharmacyProducts
          }
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.productsContainer}
        />
      )}

      {selectedProduct && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedProduct.image} style={styles.modalImage} />
              <Text style={styles.modalProductName}>
                {selectedProduct.name}
              </Text>
              <Text style={styles.modalProductPrice}>
                {selectedProduct.price}
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

const styles =
  Platform.OS !== "web"
    ? StyleSheet.create({
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
        tabsContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
          backgroundColor: "#E0F7FA",
          borderRadius: 5,
          padding: 5,
        },
        tab: {
          flex: 1,
          paddingVertical: 10,
          alignItems: "center",
          borderRadius: 5,
        },
        activeTab: {
          backgroundColor: "#009688",
        },
        tabText: {
          fontSize: 16,
          color: "#009688",
        },
        activeTabText: {
          color: "#FFFFFF",
          fontWeight: "bold",
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
        },
        buttonContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        actionButton: {
          flex: 1,
          backgroundColor: "#009688",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginHorizontal: 5,
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
      })
    : StyleSheet.create({
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
        tabsContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
          backgroundColor: "#E0F7FA",
          borderRadius: 5,
          padding: 5,
        },
        tab: {
          flex: 1,
          paddingVertical: 10,
          alignItems: "center",
          borderRadius: 5,
        },
        activeTab: {
          backgroundColor: "#009688",
        },
        tabText: {
          fontSize: 16,
          color: "#009688",
        },
        activeTabText: {
          color: "#FFFFFF",
          fontWeight: "bold",
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
          marginHorizontal: "20%",
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
          width: "40%",
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
        },
        buttonContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        },
        actionButton: {
          flex: 1,
          backgroundColor: "#009688",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginHorizontal: 5,
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
      });

export default PharmacyScreen;
