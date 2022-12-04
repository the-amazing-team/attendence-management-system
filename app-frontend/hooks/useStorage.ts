import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

export default function useStorage() {
  const [store, setStore] = useState<Storage>();
  useEffect(() => {
    const initiateStorage = async () => {
      const storage = new Storage({
        name: "app-storage",
      });
      const newStore = await storage.create();
      setStore(newStore);
    };
    initiateStorage();
  });
  return store;
}
