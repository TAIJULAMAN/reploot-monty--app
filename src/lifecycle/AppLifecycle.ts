import { AppState, AppStateStatus } from "react-native";

type AppStateListener = (state: AppStateStatus) => void;

class AppLifecycleManager {
  private listeners: Set<AppStateListener> = new Set();
  private currentState: AppStateStatus = AppState.currentState;

  constructor() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  private handleAppStateChange = (nextState: AppStateStatus) => {
    this.currentState = nextState;
    this.listeners.forEach((listener) => {
      try {
        listener(nextState);
      } catch (err) {
        console.error("Error in app state listener:", err);
      }
    });
  };

  public getCurrentState(): AppStateStatus {
    return this.currentState;
  }

  public isForeground(): boolean {
    return this.currentState === "active";
  }

  public subscribe(listener: AppStateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const appLifecycle = new AppLifecycleManager();
