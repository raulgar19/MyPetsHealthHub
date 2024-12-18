import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TextInput, Pressable, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const EditProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Juan',
    surname: 'Perez',
    nick: 'juan_prz',
    email: 'juan.perez@example.com',
    profileImage: require('../../assets/icons/profile-icon.png'),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [scaleValue] = useState(new Animated.Value(0));
  const [opacityValue] = useState(new Animated.Value(0));

  const handleSaveChanges = () => {
    setMessage('Los cambios han sido guardados correctamente.');
    setConfirmModalVisible(true);
  };

  const handleOpenPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const handleCloseModal = () => {
    animateCloseModal(() => setConfirmModalVisible(false));
  };

  const handleClosePasswordModal = () => {
    animateCloseModal(() => setPasswordModalVisible(false));
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    handleClosePasswordModal();
  };

  const animateOpenModal = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateCloseModal = (closeCallback) => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      closeCallback();
    });
  };

  useEffect(() => {
    if (confirmModalVisible || passwordModalVisible) {
      scaleValue.setValue(0);
      opacityValue.setValue(0);
      animateOpenModal();
    }
  }, [confirmModalVisible, passwordModalVisible]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href="/home">
          <Pressable>
            <Image
              source={require('../../assets/icons/logo-mobile.png')}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Editar Perfil</Text>
      </View>
      <View style={styles.container}>
        <Image source={userData.profileImage} style={styles.profileImage} />
        
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          value={userData.surname}
          onChangeText={(text) => setUserData({ ...userData, surname: text })}
          placeholder="Apellidos"
        />
        <TextInput
          style={styles.input}
          value={userData.nick}
          onChangeText={(text) => setUserData({ ...userData, nick: text })}
          placeholder="Nombre de usuario"
        />
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          placeholder="Correo electrónico"
        />
        
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.commonButton, styles.otherChangesButton]} onPress={handleOpenPasswordModal}>
            <Text style={styles.buttonText}>Otros Cambios</Text>
          </Pressable>

          <Pressable style={styles.commonButton} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={confirmModalVisible}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <Animated.View
          style={[styles.modalOverlay, { opacity: opacityValue }]}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable style={[styles.modalButton]} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Modal>

      <Modal
        transparent={true}
        visible={passwordModalVisible}
        animationType="none"
        onRequestClose={handleClosePasswordModal}
      >
        <Animated.View
          style={[styles.modalOverlay, { opacity: opacityValue }]}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Introduce tu Contraseña</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Contraseña"
                secureTextEntry={!isPasswordVisible}
              />
              <Pressable
                style={styles.eyeIconContainer}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <FontAwesome
                  name={isPasswordVisible ? 'eye-slash' : 'eye'}
                  size={24}
                  color="#000"
                />
              </Pressable>
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable style={[styles.modalButton]} onPress={handleClosePasswordModal}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Link asChild href={"/otherChanges"}>
                  <Pressable style={styles.modalButton} onPress={handlePasswordSubmit}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                  </Pressable>
              </Link>
            </View>
          </View>
        </Animated.View>
      </Modal>
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
  logoContainer: {
    position: 'absolute', 
    left: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  commonButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  modalButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  eyeIconContainer: {
    marginLeft: 10,
    padding: 5,
  },
});

export default EditProfileScreen;