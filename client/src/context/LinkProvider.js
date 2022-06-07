import React, { createContext, useContext, useEffect, useState } from "react";
import { createLinkAPI, deleteLinkAPI, getLinkAPI, getLinksAPI, updateLinkAPI } from "../api/links";

const context = createContext();

export const useLinks = () => useContext(context);

export const LinkProvider = ({ children }) => {
	const [links, setLinks] = useState([]);

	const getLinks = async () => {
		const res = await getLinksAPI();
		setLinks(res.data);
	};

	const getLink = async (id) => {
		const res = await getLinkAPI(id);
    return res.data
	};

	const createLink = async (data) => {
		const res = await createLinkAPI(data);
		// if (res.status === 200) await getLinks()
		if (res.status === 200) await setLinks([...links, res.data]);
	};

	const deleteLink = async (id) => {
		const res = await deleteLinkAPI(id);
		// if (res.status === 200 | 204) await getLinks()
		if ((res.status === 200) | 204)
			setLinks(links.filter((link) => link._id !== id));
	};

  const updateLink = async (id, data) => {
    const res = await updateLinkAPI(id, data)
    if (res.status === 200)
      setLinks(links.map((link) => link._id === id ? res.data : link));
  }

	useEffect(() => {
		getLinks();
	}, []);

	return (
		<context.Provider
			value={{
				links,
				getLinks,
				createLink,
				deleteLink,
        getLink,
        updateLink
			}}
		>
			{children}
		</context.Provider>
	);
};
