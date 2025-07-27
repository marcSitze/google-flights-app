import "./App.css";
import GoogleFlights from "./features/GoogleFlights/GoogleFlights";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleFlights />
    </QueryClientProvider>
  );
}

export default App;
