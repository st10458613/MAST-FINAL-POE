import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Types for navigation and route props
type HomeScreenNavigationProp = StackNavigationProp<any, "HomePage">;
type HomeScreenRouteProp = RouteProp<any, "HomePage">;

type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: string;
};

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export default function HomeScreen({ route, navigation }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(route.params?.menuItems || []);

  // Function to remove an item by its index
  const handleRemoveItem = (index: number) => {
    const updatedMenuItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenuItems);
  };

  // Calculate the average price of the menu items
  const averagePrice =
    menuItems.length > 0
      ? menuItems.reduce((acc, item) => acc + parseFloat(item.price || "0"), 0) /
        menuItems.length
      : 0;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/mychef.jpg")} style={styles.logo} />
      <Text style={styles.title}>Welcome To Christofel's Kitcken!</Text>
      <Text style={styles.title}>Menu Overview</Text>
      <Text style={styles.text}>Average Price: R{averagePrice.toFixed(2)}</Text>

      <FlatList
        data={menuItems}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            {/* Displaying Item Image */}
            {item.course === "Starter" && (
              <Image source={require("../assets/STARTERS.jpg")} style={styles.itemImage} />
            )}
            {item.course === "Main" && (
              <Image source={require("../assets/MAIN COURSE.jpg")} style={styles.itemImage} />
            )}
            {item.course === "Dessert" && (
              <Image source={require("../assets/POTLUCK.png")} style={styles.itemImage} />
            )}
            {item.course === "Beverage" && (
              <Image source={require("../assets/beverage.jpg")} style={styles.itemImage} />
            )}

            <Text style={styles.itemText}>{item.name}</Text>
            <Text>{item.course}</Text>
            <Text>R{item.price}</Text>

            {/* Remove Item Button */}
            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <Text style={styles.deleteText}>Remove Item</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Add New Item Button */}
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate("AddItemScreen", { setMenuItems })}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteText: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});
