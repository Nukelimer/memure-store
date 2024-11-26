import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-40 w-40 border-b-4 border-green-500"></div>
    </div>
  );
}

export default Loader;
