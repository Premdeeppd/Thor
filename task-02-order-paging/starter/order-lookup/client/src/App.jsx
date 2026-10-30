import OrderSearch from './OrderSearch.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Order Lookup</h1>
        <span className="app-subtitle">Support Desk · internal</span>
      </header>
      <main>
        <OrderSearch />
      </main>
    </div>
  );
}
