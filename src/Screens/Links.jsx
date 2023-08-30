import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  AppState,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { getAllLinks } from "../utils/api";
import Modal from "../Components/Modal";
import EditModal from "../Components/editModal";
import Web from "./Web";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const Links = () => {
  const { jwt } = useContext(AuthContext);
  const [modalState, setModalState] = useState(false);
  const [editmodalState, setEditModalState] = useState(false);
  const [slug, setSlug] = useState("");

  const [links, setLinks] = useState([]);
  const [webState, setWebState] = useState(false);
  const [webLink, setWebLink] = useState("");

  const fetchAllLinks = async (jwt) => {
    try {
      const response = await getAllLinks(jwt);
      const linksData = response.data;
      console.log("Link Data", linksData);
      setLinks(linksData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // const isFocused = useIsFocused();
  useEffect(() => {
    fetchAllLinks(jwt);
    setModalState(false);
    onRefresh();
  }, []);

  // useFocusEffect(
  //   useCallback(async () => {
  //     await fetchAllLinks(jwt);
  //   }, [])
  // );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchAllLinks(jwt);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const createNewLink = () => {
    setModalState(true);
  };

  const editDelete = (slug) => {
    setSlug(slug);
    setEditModalState(true);
    console.log("Yo");
  };

  const redirectToPage = async (slug) => {
    console.log(slug);

    await WebBrowser.openBrowserAsync(
      `https://bitly-clone-v2.onrender.com/${slug}`
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => editDelete(item.slug)}
      onPress={() => redirectToPage(item.slug)}
    >
      <View on style={styles.linkContainer}>
        <Text style={styles.linkText}>{item.link}</Text>
        <Text style={styles.slugText}>Slug: {item.slug}</Text>
        <Text style={styles.visitCountText}>
          Visit Counts: {item.visit_counts}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {!modalState && !editmodalState && (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.heading}>All Links</Text>
          <FlatList
            scrollEnabled={false}
            data={links}
            renderItem={renderItem}
            keyExtractor={(item) => item.created_at}
          />
          <View style={styles.buttonContainer}>
            <Button title="Create Link" onPress={createNewLink} />
          </View>
        </ScrollView>
      )}
      {modalState && <Modal setShow={setModalState} />}
      {editmodalState && <EditModal setShow={setEditModalState} slug={slug} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  linkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    marginBottom: 5,
  },
  slugText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  visitCountText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default Links;
