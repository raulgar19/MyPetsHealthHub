import React, { useState, useRef } from 'react';
import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

const PetsManagementScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Pets');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const pets = [
    {
      name: 'Bobby',
      breed: 'Labrador',
      age: 5,
      weight: 25,
      image: require('../../assets/icons/logo-mobile.png'),
      healthCard: 'Tarjeta sanitaria válida hasta: 2025-12-31',
      petCard: '1234567890',
      chip: 'A12345678',
      sex: 'Macho',
    },
    {
      name: 'Max',
      breed: 'Bulldog',
      age: 3,
      weight: 20,
      image: require('../../assets/icons/logo-mobile.png'),
      healthCard: 'Tarjeta sanitaria válida hasta: 2024-06-15',
      petCard: '0987654321',
      chip: 'B12345678',
      sex: 'Hembra',
    },
    {
      name: 'Luna',
      breed: 'Golden Retriever',
      age: 4,
      weight: 30,
      image: require('../../assets/icons/logo-mobile.png'),
      healthCard: 'Tarjeta sanitaria válida hasta: 2025-05-20',
      petCard: '1122334455',
      chip: 'C12345678',
      sex: 'Macho',
    },
  ];

  const openModal = (pet) => {
    setCurrentPet(pet);
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
      <Link asChild href={"/home"}>
            <Pressable>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.navIcon}
                />
              </Pressable>
        </Link>
        <Text style={styles.navTitle}>Mis Mascotas</Text>
        <Link asChild href= {"/profile"}>
          <Pressable>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Pets')}
          style={[styles.tab, selectedTab === 'Pets' && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'Pets' && styles.activeTabText]}>Mascotas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('HealthCard')}
          style={[styles.tab, selectedTab === 'HealthCard' && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === 'HealthCard' && styles.activeTabText]}>Tarjetas Sanitarias</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedTab === 'Pets' && pets.map((pet, index) => (
          <Link asChild href={"/petDetails"}>
            <TouchableOpacity
              key={index}
              style={styles.petInfoContainer}
            >
              <View style={styles.petImageContainer}>
                <Image source={pet.image} style={styles.petImage} />
              </View>
              <View style={styles.petDetailsContainer}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>Raza: {pet.breed}</Text>
                <Text style={styles.petAge}>Edad: {pet.age} años</Text>
                <Text style={styles.petWeight}>Peso: {pet.weight} kg</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}

        {selectedTab === 'HealthCard' && pets.map((pet, index) => (
          <View style={styles.petCardContainer} key={index}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image
                  source={require('../../assets/icons/pets-health-union-icon.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.systemText}>SISTEMA DE REGISTRO DE MASCOTAS</Text>
                  <Text style={styles.cardTitle}>Tarjeta Sanitaria de Mascota</Text>
                </View>
                <QRCode value={pet.petCard} size={50} />
              </View>

              <View style={styles.content}>
                <Text style={styles.idNumber}>Chip: {pet.chip}</Text>
                <Text style={styles.name}>Nombre: {pet.name}</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Raza: {pet.breed}</Text>
                  <Text style={styles.label}>Sexo: {pet.sex}</Text>
                </View>
                <Text style={styles.code}>Número de Registro: {pet.petCard}</Text>
              </View>
            </View>

            <Pressable style={styles.qrButton} onPress={() => openModal(pet)}>
              <Text style={styles.qrButtonText}>QR</Text>
            </Pressable>

            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
                  {currentPet && (
                    <QRCode 
                      value={currentPet.petCard}
                      size={200}
                    />
                  )}
                  <Pressable style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </Pressable>
                </Animated.View>
              </View>
            </Modal>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B7E3DD',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
    elevation: 5,
  },
  navIcon: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  navButton: {
    position: 'absolute',
    right: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#009688',
  },
  tabText: {
    fontSize: 16,
    color: '#009688',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  petInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  petImageContainer: {
    marginRight: 20,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  petDetailsContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petBreed: {
    fontSize: 16,
    color: '#009688',
    marginBottom: 10,
  },
  petAge: {
    fontSize: 16,
    color: '#555',
  },
  petWeight: {
    fontSize: 16,
    color: '#555',
  },
  petCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderRadius: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  systemText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTitle: {
    fontSize: 16,
    color: '#006368',
    marginTop: 4,
  },
  content: {
    backgroundColor: '#009688',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    gap: 5,
  },
  idNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  code: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'monospace',
  },
  qrButton: {
    marginBottom: 20,
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#009688',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default PetsManagementScreen;