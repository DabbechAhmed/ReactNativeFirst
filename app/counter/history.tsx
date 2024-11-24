import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { countdownStorageKey, PersistedCountDownState } from ".";
import { getFromStorage } from "../../utils/storage";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
  const [countdownState, setCountdownState] = useState<PersistedCountDownState>(
    {
      currentNotificationId: undefined,
      completedAtTimestamp: [],
    }
  );
  useEffect(() => {
    const loadState = async () => {
      const state = await getFromStorage(countdownStorageKey);
      if (state) {
        setCountdownState(state);
      }
    };
    loadState();
  }, []);

  return (
    <FlatList
      data={countdownState?.completedAtTimestamp}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <View style={styles.listEmpty}>
          <Text style={styles.listEmptyText}>No items</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    marginTop: 8,
  },
  listItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: theme.colorLightGrey,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 16,
  },
  listEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  listEmptyText: {
    fontSize: 24,
    color: theme.colorGrey,
  },
});
