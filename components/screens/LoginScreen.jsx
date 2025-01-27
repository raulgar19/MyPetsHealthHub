import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Image, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import apiService from '../../api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalScale] = useState(new Animated.Value(0));
  const [modalOpacity] = useState(new Animated.Value(0));

  const router = useRouter();

  const adminRegex = /^ADMIN[A-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const showModal = () => {
    setModalVisible(true);
    Animated.sequence([
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setEmailError('Por favor, ingresa un correo electrónico o usuario.');
      setPasswordError('Por favor, ingresa una contraseña.');
      showModal();
      return;
    }

    try {
      const trimmedEmail = email.trim();
      const response = adminRegex.test(trimmedEmail)
        ? await apiService.vetLogin(trimmedEmail, password)
        : await apiService.userLogin(trimmedEmail, password);

      if (response.status === 200) {
        localStorage.setItem(
          'userID',
          response.data.id
        )
        const navigationPath = adminRegex.test(trimmedEmail) ? '/vetHome' : '/home';
        router.push(navigationPath);
      }
    } catch (error) {
      setEmailError('Correo o contraseña incorrectos.');
      setPasswordError('');
      showModal();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Image
          source={require('../../assets/icons/logo-mobile.png')}
          style={styles.navLogo}
        />
        <Text style={styles.navTitle}>My Pet's Health Hub</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            placeholder="Correo Electrónico o Usuario"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={(text) => {
              setEmail(text.trim());
              if (emailRegex.test(text.trim()) || adminRegex.test(text.trim())) {
                setEmailError('');
              }
            }}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            placeholderTextColor="#A9A9A9"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {email && password ? (
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.button}
              onPress={() => {
                setEmailError('Por favor, ingrese un correo electrónico o usuario válido.');
                showModal();
              }}
            >
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Pressable>
          )}
          <Link href="/register">
            <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
          </Link>
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ scale: modalScale }],
                opacity: modalOpacity,
              },
            ]}
          >
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalText}>{emailError}</Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B7E3DD',
    paddingBottom: 50,
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
  navLogo: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 20,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    width: '70%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: '#006368',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#009688',
    width: '50%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    marginVertical: 5,
    color: '#006368',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;