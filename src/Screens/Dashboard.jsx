import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getAllLinks } from "../utils/api";
import { AuthContext } from "../Context/AuthContext";
import { optional } from "zod";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.3, // Adjust this to control the width of bars
  useShadowColorFromDataset: false,
  groupSpacing: 0.5,
};

const Dashboard = () => {
  const { jwt } = useContext(AuthContext);

  const [links, setLinks] = useState([]);
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

  useEffect(() => {
    fetchAllLinks(jwt);
  }, []);

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

  const labels = links.map((item) => item.slug);
  const visit_counts = links.map((item) => item.visit_counts);

  const totalLinks = labels.length;

  var totalVisitCounts = visit_counts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        data: visit_counts,
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ marginRight: 20, marginLeft: 20, marginTop: 100, gap: 50 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginTop: 20, backgroundColor: "blue" }}>
          <Text style={{ fontSize: 20 }}>Total Links</Text>
          <Text style={{ fontSize: 19 }}>{totalLinks}</Text>
        </View>
        <View style={{ marginTop: 20, backgroundColor: "blue" }}>
          <Text style={{ fontSize: 20 }}>Total Visit Counts</Text>
          <Text style={{ fontSize: 19 }}>{totalVisitCounts}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
{
  /* <BarChart
          data={data}
          width={screenWidth}
          height={400} // Adjust the height as needed
          chartConfig={chartConfig}
          // verticalLabelRotation={30}
          style={{ marginVertical: 20, marginTop: 80 }} // Add margin for better spacing
        /> */
}
