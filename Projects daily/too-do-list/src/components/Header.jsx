import React from 'react';

export default function Header() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">📝Celebal To-Do App</h1>
        <span className="text-sm">Celebal Technologies</span>
      </div>
    </nav>
  );
}
