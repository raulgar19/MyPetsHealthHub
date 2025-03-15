import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../api";

const CartPharmacyScreen = () => {
  const [pharmacyCartItems, setPharmacyCartItems] = useState([]);
  const [parapharmacyCartItems, setParapharmacyCartItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Pharmacy");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pharmacyItems =
      JSON.parse(localStorage.getItem("pharmacyCart")) || [];
    const parapharmacyItems =
      JSON.parse(localStorage.getItem("parapharmacyCart")) || [];
    setPharmacyCartItems(pharmacyItems);
    setParapharmacyCartItems(parapharmacyItems);
  }, []);

  const increaseQuantity = (itemId, items, setItems) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId, items, setItems) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId, items, setItems) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    localStorage.setItem(
      selectedTab === "Pharmacy" ? "pharmacyCart" : "parapharmacyCart",
      JSON.stringify(updatedItems)
    );
  };

  const calculateTotalPrice = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const totalAmount =
      selectedTab === "Pharmacy"
        ? calculateTotalPrice(pharmacyCartItems)
        : calculateTotalPrice(parapharmacyCartItems);

    const userId = localStorage.getItem("userID");

    try {
      await ApiService.deductMoney(userId, totalAmount);
      console.log("Compra realizada correctamente.");

      if (selectedTab === "Pharmacy") {
        setPharmacyCartItems([]);
        localStorage.setItem("pharmacyCart", JSON.stringify([]));
      } else {
        setParapharmacyCartItems([]);
        localStorage.setItem("parapharmacyCart", JSON.stringify([]));
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error("Error al realizar la compra", error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price.toFixed(2)}€</Text>
        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={() =>
              decreaseQuantity(
                item.id,
                selectedTab === "Pharmacy"
                  ? pharmacyCartItems
                  : parapharmacyCartItems,
                selectedTab === "Pharmacy"
                  ? setPharmacyCartItems
                  : setParapharmacyCartItems
              )
            }
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            style={styles.quantityButton}
            onPress={() =>
              increaseQuantity(
                item.id,
                selectedTab === "Pharmacy"
                  ? pharmacyCartItems
                  : parapharmacyCartItems,
                selectedTab === "Pharmacy"
                  ? setPharmacyCartItems
                  : setParapharmacyCartItems
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
          removeItem(
            item.id,
            selectedTab === "Pharmacy"
              ? pharmacyCartItems
              : parapharmacyCartItems,
            selectedTab === "Pharmacy"
              ? setPharmacyCartItems
              : setParapharmacyCartItems
          )
        }
      >
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </Pressable>
    </View>
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
    router.push("/pharmacy");
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
        <Text style={styles.navTitle}>Carrito de la farmacia</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
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

      {selectedTab === "Pharmacy" && pharmacyCartItems.length > 0 ? (
        <>
          <FlatList
            data={pharmacyCartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: {calculateTotalPrice(pharmacyCartItems)}€
            </Text>
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Realizar Compra</Text>
            </Pressable>
          </View>
        </>
      ) : (
        selectedTab === "Pharmacy" && (
          <Text style={styles.emptyCartText}>El carrito está vacío</Text>
        )
      )}

      {selectedTab === "Parapharmacy" && parapharmacyCartItems.length > 0 ? (
        <>
          <FlatList
            data={parapharmacyCartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: {calculateTotalPrice(parapharmacyCartItems)}€
            </Text>
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Realizar Compra</Text>
            </Pressable>
          </View>
        </>
      ) : (
        selectedTab === "Parapharmacy" && (
          <Text style={styles.emptyCartText}>
            El carrito de parafarmacia está vacío
          </Text>
        )
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Compra realizada!</Text>
            <Text style={styles.modalText}>
              Tu pedido ha sido procesado con éxito.
            </Text>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </View>
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
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: "center",
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
    marginLeft: 10,
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#009688",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CartPharmacyScreen;
