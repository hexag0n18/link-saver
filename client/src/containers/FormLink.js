import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLinks } from "../context/LinkProvider";
import { AiFillCaretLeft, AiOutlineLoading } from "react-icons/ai";

export const FormLink = () => {
	const { createLink, getLink, updateLink } = useLinks();
	const navigate = useNavigate();
	const params = useParams();
	const [link, setLink] = useState({
		name: "",
		link: "",
		description: "",
    image: null
	});
	useEffect(() => {
		(async () => {
			if (params.id) {
				const data = await getLink(params.id);
				setLink(data);
			}
		})();
	}, []);

	return (
		<div className="w-9/12 bg-slate-900 m-auto py-4 rounded-lg shadow-2xl shadow-blue-500/50 relative">
      <Link to="/"><AiFillCaretLeft className="absolute top-0 left-0 text-white text-2xl mt-2 ml-2" /></Link>
			<h1 className="text-center text-white text-xl mb-2">
				{params.id ? "Update link info" : "Save new url link"}
			</h1>
			<Formik
				initialValues={link}
				validationSchema={Yup.object({
					name: Yup.string().required("Name is required"),
					link: Yup.string()
						.url("Link must be a valid URL")
						.required("Url is required"),
					description: Yup.string().required("Description is required"),
				})}
				onSubmit={async (values, actions) => {
          if (params.id) await updateLink(params.id, values)
					else await createLink(values);
          actions.setSubmitting(false)
					navigate("/");
				}}
        enableReinitialize
			>
				{({ errors, handleSubmit, setFieldValue, isSubmitting }) => (
					<Form onSubmit={handleSubmit} className="flex flex-col items-center">
						<div className="mb-2 w-8/12 px-4 pb-5 flex flex-col relative">
							<Field
								name="name"
								placeholder="Name"
								className={
									errors.name
										? "px-2 py-1 rounded-md bg-gray-500 text-white border-2 border-red-500 placeholder:text-red-200"
										: "px-2 py-1 rounded-md bg-gray-500 text-white"
								}
							/>
							<ErrorMessage
								component="span"
								name="name"
								className="absolute bottom-0 text-red-500"
							/>
						</div>
						<div className="mb-2 w-8/12 px-4 pb-5 flex flex-col relative">
							<Field
								name="link"
								placeholder="Url link"
								className={
									errors.link
										? "px-2 py-1 rounded-md bg-gray-500 text-white border-2 border-red-500 placeholder:text-red-200"
										: "px-2 py-1 rounded-md bg-gray-500 text-white"
								}
							/>
							<ErrorMessage
								component="span"
								name="link"
								className="absolute bottom-0 text-red-500"
							/>
						</div>
						<div className="mb-2 w-8/12 px-4 pb-5 flex flex-col relative">
							<Field
                component="textarea"
								name="description"
								placeholder="Description"
								className={
									errors.description
										? "px-2 py-1 rounded-md bg-gray-500 text-white border-2 border-red-500 placeholder:text-red-200"
										: "px-2 py-1 rounded-md bg-gray-500 text-white"
								}
                rows="3"
							/>
							<ErrorMessage
								component="span"
								name="description"
								className="absolute bottom-0 text-red-500"
							/>
						</div>
            <div className="mb-2 w-8/12 px-4 pb-5 flex flex-col relative">
              <input type="file" name="image" className="file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-slate-900 hover:file:bg-slate-300 text-white bg-gray-500 rounded-md" onChange={(e) => setFieldValue('image', e.target.files[0])} />
            </div>
						<button
							type="submit"
							className="bg-cyan-900 w-auto py-2 px-4 rounded-md text-white"
              disabled={isSubmitting}
						>
							{isSubmitting? (<AiOutlineLoading className="animate-spin h-4 w-4" />) : 'Save'}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
