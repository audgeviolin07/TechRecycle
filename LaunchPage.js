/*
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import ThreeJSComponent from "./ThreeJSComponent";

const Launchpage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ThreeJSComponent />
        <View style={{ position: "absolute", bottom: 570, left: 0, right: 0, paddingTop: 50 }}>
          <Text style={{ fontSize: 48, fontWeight: "bold", color: "#ffffff", textAlign: "center" }}>RecycleAi</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff", textAlign: "center" }}>Technology towards a Cleaner Future</Text>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 120, left: 0, right: 0, paddingBottom: 20 }}>
          <TouchableOpacity style={{ backgroundColor: "#CC4488", padding: 15, borderRadius: 5, alignSelf: "center" }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Get Started</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" , marginTop: 10, textAlign: "center" }}>Click the button get started!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Launchpage;
*/
/*
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ThreeJSComponent from "./ThreeJSComponent";

const Stack = createStackNavigator();

const Launchpage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const LaunchScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate("Home"); // Navigate to the "Home" screen
  };

  return (
    <View style={{ flex: 1 }}>
      <ThreeJSComponent />
      <View style={{ position: "absolute", bottom: 570, left: 0, right: 0, paddingTop: 50 }}>
        <Text style={{ fontSize: 48, fontWeight: "bold", color: "#ffffff", textAlign: "center" }}>RecycleAi</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff", textAlign: "center" }}>Technology towards a Cleaner Future</Text>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 120, left: 0, right: 0, paddingBottom: 20 }}>
        <TouchableOpacity onPress={handleButtonPress} style={{ backgroundColor: "#CC4488", padding: 15, borderRadius: 5, alignSelf: "center" }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Get Started</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" , marginTop: 10, textAlign: "center" }}>Click the button to get started!</Text>
      </View>
    </View>
  );
};

export default Launchpage;

*/