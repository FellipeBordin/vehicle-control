import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";

import { claimLegacyVehicles, getVehicles } from "@/src/service/vehicleService";
import { clearSession, getToken, getUser } from "@/src/lib/session";
import { Vehicle } from "@/src/types/vehicles";
import { calculateVehicleSummary } from "@/src/utils/calculateVehicle";
import { showAlert } from "@/src/utils/alert";

type ApiErrorResponse = {
  error?: string;
};

export function useVehiclesHome() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  const loadVehicles = useCallback(async () => {
    setError(null);

    const token = await getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    const user = await getUser();
    setUserName(user?.name ?? "");

    await claimLegacyVehicles();

    const res = await getVehicles();

    if (res.status === 401) {
      await clearSession();
      router.replace("/login");
      return;
    }

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as ApiErrorResponse;

      throw new Error(
        data.error ?? `Não foi possível carregar os veículos (${res.status}).`,
      );
    }

    const data = (await res.json()) as Vehicle[];
    setVehicles(data);
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      loadVehicles()
        .catch((error: unknown) => {
          setError(getErrorMessage(error));
        })
        .finally(() => {
          setLoading(false);
        });
    }, [loadVehicles]),
  );

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await loadVehicles();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setRefreshing(false);
    }
  }, [loadVehicles]);

  const logout = useCallback(async () => {
    try {
      await clearSession();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      showAlert("Erro", "Não foi possível sair da conta.");
    }
  }, [router]);

  const summary = useMemo(() => calculateVehicleSummary(vehicles), [vehicles]);

  return {
    router,
    vehicles,
    summary,
    userName,
    loading,
    refreshing,
    error,
    onRefresh,
    logout,
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
