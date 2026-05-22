"use client";

import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>👥 Users</h1>

      {users.map((u: any) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  );
}