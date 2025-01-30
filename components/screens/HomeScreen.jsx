import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiService from '../../api';

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (userId) {
      apiService
        .getUserById(userId)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require('../../assets/icons/logo-mobile.png')}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Menú Principal</Text>
        <Link asChild href={"/profile"}>
          <Pressable>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>
          Bienvenid@ de nuevo, {userData ? userData.name : 'Usuario'}
          </Text>
          <Text style={styles.categoryTitle}>Gestión</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/petsManagement"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/pet-management-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Seguimiento de tu mascota</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/addPet"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/add-pet-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Añadir mascota</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/removePet"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/delete-pet-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Eliminar mascota</Text>
              </Pressable>
            </Link>
          </View>
          <Text style={styles.categoryTitle}>Salud</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/vet"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/vet-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Veterinario</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/emergencies"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/emergency-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Urgencias 24h</Text>
              </Pressable>
            </Link>
          </View>
          <Text style={styles.categoryTitle}>Compras</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/store"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/store-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Tienda</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/pharmacy"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/pharmacy-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Farmacia</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/addMoney"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/add-money-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Añadir fondos</Text>
              </Pressable>
            </Link>
          </View>
          <Text style={styles.categoryTitle}>Ocio</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/social"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/social-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Comunidad</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/grooming"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/hair-saloon-icon.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Peluquería</Text>
              </Pressable>
            </Link>
          </View>
        </View>
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
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    width: '100%',
    color: '#006368',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuItem: {
    backgroundColor: '#009688',
    width: '48%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  menuIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;