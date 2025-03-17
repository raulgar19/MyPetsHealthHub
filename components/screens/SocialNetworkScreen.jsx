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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SocialNetworkMobile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = await AsyncStorage.getItem("userID");
        if (!userId) {
          console.error("No se encontró el userID en localStorage.");
          setLoading(false);
          return;
        }
        const response = await ApiService.getCommunityPosts(userId);
        setPosts(response.data || []);
      } catch (error) {
        console.error("Error obteniendo posts de la comunidad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.userName}>{`@${item.appUser.nickname}`}</Text>
      <Text style={styles.postContent}>{item.description}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      <Text style={styles.postDate}>{item.postDate}</Text>
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
        <Text style={styles.navTitle}>Comunidad</Text>
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
      ) : posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay publicaciones disponibles en este momento.
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
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

const styles = StyleSheet.create({
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
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004D40",
  },
  postContent: {
    fontSize: 15,
    marginVertical: 5,
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#808080",
    textAlign: "right",
    marginTop: 5,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#808080",
    textAlign: "center",
  },
});

export default SocialNetworkMobile;
