import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = () => {
  const navigation = useNavigation();

  return (
    <Text
      style={{
        paddingTop: 40,
        paddingBottom: 10,
        textAlign: "center",
        fontSize: 30,
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#FF6347",
      }}
    >
      {"               "}Just Meet{"          "}
      <Ionicons
        name="person-circle-outline"
        size={30}
        color="#FF6347"
        onPress={() => navigation.navigate("Profile")}
      />
    </Text>
  );
};

export default Header;
