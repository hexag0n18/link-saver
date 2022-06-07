import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FormLink, Home, NotFound } from "./containers";
import { LinkProvider } from "./context/LinkProvider";

const App = () => {
	return (
		<div className="bg-neutral-900 min-h-screen flex items-center">
			<div className="px-10 container m-auto">
        <LinkProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<FormLink />} />
            <Route path="/edit/:id" element={<FormLink />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </LinkProvider>
			</div>
		</div>
	);
};

export default App;
