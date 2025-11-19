import React from "react";
import { Download, Plus, Search } from "lucide-react";

const API_URL = "http://localhost:8085/api";

const Header = ({ user }) => {
  return (
    <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-blue-600">Senti</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-gray-500">{user.role}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
