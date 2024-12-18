import React, { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable, Image, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VetUsersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const clients = [
    { id: 1, name: 'Carlos Pérez', phone: '+34 612 345 678', email: 'carlos.perez@example.com' },
    { id: 2, name: 'María López', phone: '+34 689 123 456', email: 'maria.lopez@example.com' },
    { id: 3, name: 'Luis Ramírez', phone: '+34 654 987 321', email: 'luis.ramirez@example.com' },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.client}>
      <Text style={styles.clientName}>👤 {item.name}</Text>
      <Text style={styles.details}>
        Teléfono: <Text style={styles.bold}>{item.phone}</Text>
      </Text>
      <Text style={styles.details}>
        Email: <Text style={styles.bold}>{item.email}</Text>
      </Text>
    </View>
  );

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
          <Text style={styles.navTitle}>Clientes</Text>
        </View>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cliente..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.noClients}>No hay clientes disponibles</Text>}
      />
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
    padding: 16,
  },
  searchInput: {
    height: 40,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: 'white',
    borderColor: '#009688'
  },
  client: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#009688',
  },
  clientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#006368',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  noClients: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default VetUsersScreen;