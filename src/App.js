import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="nav-list">
        <h2>Todos App</h2>

        <div className="menu-items">
          <NavLink to='/counter'>Counter</NavLink>
          <NavLink to='/todos'>Todos</NavLink>
          <NavLink to='/add-todo'>Add Todo</NavLink>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
