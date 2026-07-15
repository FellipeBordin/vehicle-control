import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { EmptyState } from "@/src/components/common/EmptyState";
import { ErrorState } from "@/src/components/common/ErrorState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { HomeHeader } from "@/src/components/vehicle/HomeHeader";
import { VehicleCard } from "@/src/components/vehicle/vehicleCard";
import { VehicleSummary } from "@/src/components/vehicle/VehicleSummary";
import { useVehiclesHome } from "@/src/hooks/usevehiclesHome";
import { Spacing } from "@/src/styles/spacing";
import { confirmAction } from "@/src/utils/confirm";

export default function VehiclesHome() {
  const {
    router,
    vehicles,
    summary,
    userName,
    loading,
    refreshing,
    error,
    onRefresh,
    logout,
  } = useVehiclesHome();

  function handleLogout() {
    confirmAction({
      title: "Sair da conta",
      message: "Deseja realmente sair?",
      onConfirm: logout,
    });
  }

  return (
    <ScreenContainer>
      <HomeHeader
        userName={userName}
        onNewVehicle={() => router.push("/new")}
        onLogout={handleLogout}
      />

      <VehicleSummary summary={summary} />

      {error && (
        <ErrorState
          message={error}
          buttonTitle="Tentar novamente"
          onRetry={onRefresh}
        />
      )}

      {loading ? (
        <LoadingState
          message="Carregando veículos..."
          description="Estamos buscando seus veículos e o resumo da operação."
        />
      ) : (
        <FlatList
          style={styles.list}
          data={vehicles}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListSeparator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <VehicleCard
              vehicle={item}
              onPress={() => router.push(`/vehicles/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="Nenhum veículo cadastrado"
              message="Cadastre o primeiro veículo para começar a controlar compras, despesas e vendas."
              buttonTitle="+ Novo veículo"
              onPress={() => router.push("/new")}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            vehicles.length === 0 ? styles.emptyListContent : styles.listContent
          }
        />
      )}
    </ScreenContainer>
  );
}

function ListSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  list: {
    marginTop: Spacing.lg,
  },

  listContent: {
    paddingBottom: Spacing.xl,
  },

  emptyListContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xl,
  },

  separator: {
    height: Spacing.md,
  },
});
