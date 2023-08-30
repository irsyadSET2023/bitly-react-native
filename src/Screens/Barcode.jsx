// import React, { useContext, useEffect, useState } from "react";
// import { Text, View, StyleSheet, Button, FlatList } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { AuthContext } from "../Context/AuthContext";
// import { getAllLinks } from "../utils/api";

//  const [hasPermission, setHasPermission] = useState(null);
//  const [scanned, setScanned] = useState(false);

//  useEffect(() => {
//    const getBarCodeScannerPermissions = async () => {
//      const { status } = await BarCodeScanner.requestPermissionsAsync();
//      setHasPermission(status === "granted");
//    };

//    getBarCodeScannerPermissions();
//  }, []);

//  const handleBarCodeScanned = ({ type, data }) => {
//    setScanned(true);
//    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//  };

//  if (hasPermission === null) {
//    return <Text>Requesting for camera permission</Text>;
//  }
//  if (hasPermission === false) {
//    return <Text>No access to camera</Text>;
//  }

//  return (
//    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//      <BarCodeScanner
//        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//        style={{ height: 300, width: 1000 }}
//      />
//      {scanned && (
//        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
//      )}
//    </View>
//  );
