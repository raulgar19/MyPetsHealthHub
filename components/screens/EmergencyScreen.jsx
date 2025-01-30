import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'expo-router';
import apiService from '../../api';

const EmergencyScreen = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await apiService.getAllEmergencies();
        setEmergencies(response.data);
      } catch (err) {
        setError('Error al cargar la lista de emergencias');
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, []);

  const handlePress = (link) => {
    if (link) {
      if (Platform.OS === 'web') {
        // Para web, abrimos en una nueva pestaña
        window.open(link, '_blank');
      } else {
        // Para dispositivos móviles, usamos Linking
        Linking.openURL(link).catch(() => {
          Alert.alert('Error', 'No se pudo abrir el enlace de Google Maps.');
        });
      }
    }
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.listItem} onPress={() => handlePress(item.link)}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemAddress}>{item.address}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Pressable>
          <Image source={require('../../assets/icons/logo-mobile.png')} style={styles.logo} />
        </Pressable>
        <Text style={styles.navTitle}>Urgencias 24h</Text>
        <Pressable style={styles.profileButton}>
          <Image source={require('../../assets/icons/profile-icon.png')} style={styles.profileIcon} />
        </Pressable>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={emergencies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.noResults}>No se encontraron emergencias</Text>}
        />
      )}
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
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemAddress: {
    fontSize: 14,
    color: '#555',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#006368',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default EmergencyScreen;