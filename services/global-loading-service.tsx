type LoadingListener = (isLoading: boolean) => void;

class GlobalLoadingService {
  private isLoading = false;
  private listeners = new Set<LoadingListener>();

  getState() {
    return this.isLoading;
  }

  setLoading(isLoading: boolean) {
    if (this.isLoading === isLoading) return;

    this.isLoading = isLoading;
    this.notifyListeners();
  }

  subscribe(listener: LoadingListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isLoading));
  }
}

const globalLoadingService = new GlobalLoadingService();

export default globalLoadingService;
