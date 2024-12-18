import React, { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RemovePetMobile = () => {
  const [selectedPetId, setSelectedPetId] = useState(null);

  const renderPetItem = ({ item }) => (
    <Pressable
      style={[styles.petItem, selectedPetId === item.id && styles.selectedItem]}
      onPress={() => setSelectedPetId(item.id)}
    >
      <Image
        source={require('../../assets/icons/logo-mobile.png')}
        style={styles.petImage}
      />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text>Especie: {item.species}</Text>
        <Text>Raza: {item.breed}</Text>
        <Text>Peso: {item.weight}</Text>
      </View>
    </Pressable>
  );

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
        <Text style={styles.navTitle}>Eliminar Mascota</Text>
        <Link asChild href= {"/profile"}>
          <Pressable>
            <Image
              source={require('../../assets/icons/profile-icon.png')}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={[
          { id: '1', name: 'Rex', species: 'Perro', breed: 'Labrador', weight: '30 kg' },
          { id: '2', name: 'Mimi', species: 'Gato', breed: 'Siames', weight: '4 kg' },
          { id: '3', name: 'Pico', species: 'Pájaro', breed: 'Canario', weight: '0.1 kg' },
        ]}
        renderItem={renderPetItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Link asChild href={"/home"}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </Link>
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
  listContainer: {
    padding: 20,
  },
  petItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  selectedItem: {
    backgroundColor: '#D3D3D3',
  },
  petImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006368',
  },
  button: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RemovePetMobile;
