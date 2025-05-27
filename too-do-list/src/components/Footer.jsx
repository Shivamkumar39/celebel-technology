import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 text-center py-4 mt-6 shadow-inner">
      <p>© {new Date().getFullYear()} To-Do App Built with &#x1F9E1; by Celebal Technologies.</p>
    </footer>
  );
}
