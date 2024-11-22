import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type AddItemScreenNavigationProp = StackNavigationProp<any, "AddItemScreen">;
type AddItemScreenRouteProp = RouteProp<any, "AddItemScreen">;

type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: string;
};

interface AddItemScreenProps {
  navigation: AddItemScreenNavigationProp;
  route: AddItemScreenRouteProp;
}

export default function AddItemScreen({ navigation, route }: AddItemScreenProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const { setMenuItems } = route.params || {};

  const handleAddItem = () => {
    if (setMenuItems) {
      const newMenuItem: MenuItem = {
        name,
        description,
        course,
        price,
      };
      setMenuItems((prevItems: MenuItem[]) => [...prevItems, newMenuItem]);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Menu Item</Text>

      {/* Course Images */}
      {course === "Starter" && (
        <Image source={require("../assets/STARTERS.jpg")} style={styles.itemImage} />
      )}
      {course === "Main" && (
        <Image source={require("../assets/MAIN COURSE.jpg")} style={styles.itemImage} />
      )}
      {course === "Dessert" && (
        <Image source={require("../assets/POTLUCK.png")} style={styles.itemImage} />
      )}
      {course === "Beverage" && (
        <Image source={require("../assets/beverage.jpg")} style={styles.itemImage} />
      )}

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Course"
        style={styles.input}
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
    alignSelf: "center",
  },
});


