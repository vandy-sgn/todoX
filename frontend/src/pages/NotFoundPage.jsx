import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-state-50">
      <img
        src="404-not-found-1.png"
        alt="not found"
        className="max-w-full mb-6"
      />
      <a
        href="/"
        className="inline-block px-6 py-8 mt-6 font-medium text-white transition 
        shadow-mb bg-primary rounded-2xl hover:bg-primary-dark"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFoundPage;
