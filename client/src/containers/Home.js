import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit, AiOutlineFrown } from "react-icons/ai";
import { useLinks } from "../context/LinkProvider";

export const Home = () => {
	const { links } = useLinks();
	const { deleteLink } = useLinks();

	const handleDelete = (id) => {
		toast(
			(t) => (
				<div className="text-white">
					<p className="mb-1">Are you sure you want to delete this?</p>
					<div className="flex justify-center">
						<button
							className="mx-1 py-1 px-2 bg-red-700 rounded-md"
							onClick={async () => {
                await deleteLink(id)
                toast.dismiss(t.id)
              }}
						>
							Delete it
						</button>
						<button
							className="mx-1 py-1 px-2 bg-gray-700 rounded-md"
							onClick={() => toast.dismiss(t.id)}
						>
							No
						</button>
					</div>
				</div>
			),
			{
				style: {
					background: "#1E293B",
				},
			}
		);
	};

	return (
		<div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl">Links saved ({links.length})</h1>
        <Link
          to="/new"
          className="bg-indigo-500 px-2 py-1 w-24 rounded-lg"
        >
          New Link
        </Link>
      </div>
			<div className="flex flex-row flex-wrap justify-center items-center">
				{links.length !== 0 ? (
					links.map((link) => (
						<div
							key={link._id}
							className="bg-slate-900 container px-4 py-2 text-white shadow-lg shadow-blue-500/50 rounded-lg max-w-md m-4"
						>
							<h2 className="text-lg">{link.name}</h2>
							<p className="pl-1 text-xs">{link.description}</p>
							<a
								href={link.link}
								target="_blank"
								rel="noreferrer noopener"
								className="text-gray-500 italic text-sm hover:underline"
							>
								{link.link}
							</a>
              {link.image && <img src={link.image.url} className="max-h-40" />}
							<div className="flex justify-end">
								<Link
									to={"/edit/" + link._id}
									className="mr-2 rounded-md bg-gray-700 w-6 h-6 flex items-center justify-center"
								>
									<AiFillEdit className="inline" />
								</Link>
								<button
									className="rounded-md bg-red-700 w-6 h-6 flex items-center justify-center"
									onClick={() => handleDelete(link._id)}
								>
									<AiFillDelete className="inline" />
								</button>
							</div>
						</div>
					))
				) : (
					<>
						<AiOutlineFrown className="w-48 h-48 text-white" />
						<h1 className="text-white text-2xl">There are no links saved</h1>
					</>
				)}
			</div>
		</div>
	);
};
