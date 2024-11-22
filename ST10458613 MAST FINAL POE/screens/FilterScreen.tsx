// screens/FilterScreen.tsx
import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuItem, RootStackParamList } from "../types";

type FilterScreenProps = NativeStackScreenProps<RootStackParamList, "Filter"> & {
  menuItems: MenuItem[];
};

export default function FilterScreen({ route, navigation, menuItems }: FilterScreenProps) {
  const { course } = route.params;
  const filteredItems = menuItems.filter((item) => item.course === course);

  return (
    <View>
      <Text>Filtered Items: {course}</Text>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - R{item.price}</Text>
          </View>
        )}
      />
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

