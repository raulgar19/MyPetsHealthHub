import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VetHomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href="/vetHome" style={styles.link}>
          <Pressable>
            <Image
              source={require('../../assets/icons/logo-mobile.png')}
              style={styles.logo}
            />
          </Pressable>
        </Link>
      <View style={styles.navTextContainer}>
        <Text style={styles.navTitle}>Menú Veterinario</Text>
      </View>
    </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Opciones</Text>

          <Text style={styles.categoryTitle}>Citas</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/selectUser"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Añadir cita</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/removeQueryUsers"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Eliminar cita</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/allQueries"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Ver todas las citas</Text>
              </Pressable>
            </Link>
          </View>

          <Text style={styles.categoryTitle}>Clientes y mascotas</Text>
          <View style={styles.menuContainer}>
            <Link asChild href={"/vetUsers"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Ver usuarios del veterinario</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/petsVet"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Ver mascotas del veterinario</Text>
              </Pressable>
            </Link>
            <Link asChild href={"/userPetsUsers"}>
              <Pressable style={styles.menuItem}>
                <Image
                  source={require('../../assets/icons/logo-mobile.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Ver mascotas de un cliente</Text>
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
  },
  link: {
    position: 'absolute',
    left: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
    marginBottom: 10,
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

export default VetHomeScreen;