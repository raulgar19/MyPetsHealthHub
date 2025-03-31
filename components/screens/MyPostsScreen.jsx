import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyPostsScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userID");
      setUserId(storedUserId);
    };
    getUserId();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;
      try {
        const response = await ApiService.getUserPosts(userId);
        setUserPosts(response.data || []);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postDate}>{formatDate(item.postDate)}</Text>
      <Text style={styles.postContent}>{item.description}</Text>
      <Image source={item.image} style={styles.postImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Link asChild href={"/home"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/logo-mobile.png")}
              style={styles.logo}
            />
          </Pressable>
        </Link>
        <Text style={styles.navTitle}>Mis publicaciones</Text>
        <Link asChild href={"/profile"}>
          <Pressable style={styles.profileButton}>
            <Image
              source={require("../../assets/icons/profile-icon.png")}
              style={styles.profileIcon}
            />
          </Pressable>
        </Link>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#006368" style={styles.loader} />
      ) : userPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no tienes publicaciones</Text>
        </View>
      ) : (
        <FlatList
          data={userPosts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.iconContainer}>
        <Link asChild href={"/social"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/start-icon.png")}
              style={styles.iconImage}
            />
          </Pressable>
        </Link>
        <Link asChild href={"/addPost"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/add-post-icon.png")}
              style={styles.iconImage}
            />
          </Pressable>
        </Link>
        <Link asChild href={"/myPosts"}>
          <Pressable>
            <Image
              source={require("../../assets/icons/look-posts-icon.png")}
              style={styles.iconImage}
            />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles =
  Platform.OS !== "web"
    ? StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        navbar: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
        },
        logo: {
          width: 40,
          height: 40,
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        profileButton: {
          padding: 5,
        },
        profileIcon: {
          width: 40,
          height: 40,
        },
        listContainer: {
          padding: 20,
        },
        postItem: {
          backgroundColor: "#ffffff",
          borderRadius: 10,
          padding: 15,
          marginVertical: 10,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        postDate: {
          fontSize: 14,
          color: "#666",
          marginBottom: 5,
        },
        postContent: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#004D40",
          marginVertical: 5,
        },
        postImage: {
          width: "100%",
          aspectRatio: 1,
          borderRadius: 10,
          marginTop: 10,
          resizeMode: "contain",
        },
        iconContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
          backgroundColor: "#006368",
          elevation: 5,
        },
        iconImage: {
          width: 40,
          height: 40,
        },
        loader: {
          marginTop: 20,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        emptyText: {
          fontSize: 18,
          color: "#666",
        },
      })
    : StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: "#B7E3DD",
        },
        navbar: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 60,
          backgroundColor: "#006368",
          paddingHorizontal: 20,
        },
        logo: {
          width: 40,
          height: 40,
        },
        navTitle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
        profileButton: {
          padding: 5,
        },
        profileIcon: {
          width: 40,
          height: 40,
        },
        listContainer: {
          padding: 20,
        },
        postItem: {
          backgroundColor: "#ffffff",
          borderRadius: 10,
          padding: 15,
          marginVertical: 10,
          marginHorizontal: "35%",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        postDate: {
          fontSize: 14,
          color: "#666",
          marginBottom: 5,
        },
        postContent: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#004D40",
          marginVertical: 5,
        },
        postImage: {
          width: "100%",
          aspectRatio: 1.5,
          borderRadius: 10,
          marginTop: 10,
          resizeMode: "contain",
        },
        iconContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
          backgroundColor: "#006368",
          elevation: 5,
        },
        iconImage: {
          width: 40,
          height: 40,
        },
        loader: {
          marginTop: 20,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        emptyText: {
          fontSize: 18,
          color: "#666",
        },
      });

export default MyPostsScreen;
