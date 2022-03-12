import { Button } from "antd";
import AppLayout from "./components/Layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <div className="App">
        <div
          style={{
            height: "100vh",
          }}
        >
          <Button type="primary">Hello World</Button>
          <header className="App-header">Hello</header>
        </div>
      </div>
    </AppLayout>
  );
}

export default App;
