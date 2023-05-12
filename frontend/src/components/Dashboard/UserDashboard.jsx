import { useState } from "react";

// components
import TCCreation from "./TCCreation";

export default function UserDashboard() {
  // eslint-disable-next-line no-unused-vars
  const [view, setView] = useState("tc-creation");
  return (
    <main className="container mx-auto">
      {view === "tc-creation" && <TCCreation />}
    </main>
  );
}
