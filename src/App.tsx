import { Sidebar, Stepper, Footer, Content } from "./components";

function App() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex w-full flex-col justify-between">
        <Stepper />
        <Content />
        <Footer />
      </div>
    </div>
  );
}

export default App;
