import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";

// const Web = ({ slug, setShow }) => {
//   return (
//     <WebView
//       style={{ flex: 1, height: "100%", width: "100%" }}
//       source={{ uri: `https://bitly-clone-v2.onrender.com/${slug}` }}
//     ></WebView>
//   );
// };

// export default Web;

import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

export default function Web({ slug }) {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      `https://bitly-clone-v2.onrender.com/${slug}`
    );
    setResult(result);
  };
  return (
    <View style={styles.container}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
});
