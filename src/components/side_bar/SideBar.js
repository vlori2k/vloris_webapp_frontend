// Sidebar.js
import React from "react";
import { useAuthContext } from "../../authContext";

const Sidebar = () => {
  const { userData } = useAuthContext();
  return (
    <>
      {userData.isAuthenticated && <aside className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
        </ul>
      </aside>}
    </>
  );
};

export default Sidebar; // This should be the only export default statement in the file
