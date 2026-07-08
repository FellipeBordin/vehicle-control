import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type VehicleHeaderProps = {
  name: string;
  plate: string;
  isSold: boolean;
};

export function VehicleHeader({ name, plate, isSold }: VehicleHeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12, flex: 1 }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: isSold ? "#dcfce7" : "#eff6ff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="directions-car"
            size={28}
            color={isSold ? "#15803d" : "#2563eb"}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "800" }}>{name}</Text>
          <Text style={{ color: "#666", marginTop: 4 }}>Placa: {plate}</Text>
        </View>
      </View>

      <View
        style={{
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 999,
          backgroundColor: isSold ? "#dcfce7" : "#f3f4f6",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "800",
            color: isSold ? "#166534" : "#374151",
          }}
        >
          {isSold ? "Vendido" : "Em estoque"}
        </Text>
      </View>
    </View>
  );
}