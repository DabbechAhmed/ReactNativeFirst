import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
} from "react-native";
import { theme } from "../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
type props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: props) {
  const handleDelete = () => {
    Alert.alert("Delete", `Are you sure you want to delete ${name}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(),
      },
    ]); // Alert.alert
  };

  return (
    <Pressable
      style={[styles.itemContainer, isCompleted && styles.completedContainer]}
      onPress={onToggleComplete}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          numberOfLines={1}
          style={[styles.itemText, isCompleted && styles.completedText]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
        <Ionicons
          name="close-circle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: { fontSize: 18, fontWeight: 200, flex: 1 },
  // button: {
  //   backgroundColor: theme.colorBlack,
  //   padding: 8,
  //   borderRadius: 6,
  // },
  // buttonText: {
  //   color: theme.colorWhite,
  //   fontWeight: "bold",
  //   textTransform: "uppercase",
  //   letterSpacing: 1,
  // },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  // completedButton: {
  //   backgroundColor: theme.colorGrey,
  // },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.colorGrey,
    textShadowColor: theme.colorGrey,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
});
