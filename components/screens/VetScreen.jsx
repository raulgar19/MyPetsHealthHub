import React from 'react';
import { Link } from 'expo-router';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VetScreen = () => {
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
        <Text style={styles.navTitle}>Opciones de Veterinario</Text>
        <Link asChild href= {"/profile"}>
          <Pressable>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>

      <View style={styles.buttonContainer}>
      <Link asChild href={"/scheduledQueries"}>
          <Pressable style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Consultas programadas</Text>
          </Pressable>
        </Link>
        <Link asChild href={"/myVet"}>
          <Pressable style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Mi Veterinario</Text>
          </Pressable>
        </Link>
        <Link asChild href={"/changeVet"}>
          <Pressable style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Cambiar de Veterinario</Text>
          </Pressable>
        </Link>
      </View>
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  optionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VetScreen;