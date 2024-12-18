import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateSocialAcount = () => {
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
        <Text style={styles.navTitle}>Crear cuenta de comunidad</Text>
      </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Datos</Text>

          <TextInput
            placeholder="Nombre de usuario"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            textAlign="left"
          />
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
          </Pressable>
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
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#006368',
    paddingHorizontal: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: '#006368',
    borderWidth: 1,
    textAlign: 'left',
  }, 
  button: { 
    backgroundColor: '#009688', 
    borderRadius: 5, 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    marginTop: 20, 
  }, 
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
  }, 
  });

    export default CreateSocialAcount;