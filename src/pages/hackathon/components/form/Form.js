import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import PrepLoader from "../../../../components/prep-loader/loader";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    // tagline: "",
    // likes: "",
    // overview: "",
    key_features: "",
    use_cases: "",
    created_by: "",
    access: "",
    tags: "",
    preview_image: "",
    demo_video: "",
    email: "",
    logo: "",
    pricing: "",
    category: "",
    industry: "",
    description: "",
    name: "",
    website_url: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = "dnrvz201s"; // Replace with your Cloudinary cloud name
    const uploadPreset = "cfbnzkaa"; // Replace with your Cloudinary upload preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url; // Cloudinary URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Upload Logo and Preview Image to Cloudinary
      const logoUrl = await uploadToCloudinary(formData.logo);
      // const previewImageUrl = await uploadToCloudinary(formData.preview_image);

      // Update formData with Cloudinary URLs
      const updatedFormData = {
        ...formData,
        logo: logoUrl,
        // preview_image: previewImageUrl,
      };

      // Submit form with Cloudinary URLs to your API
      const formBody = new FormData();
      Object.keys(updatedFormData).forEach((key) => {
        formBody.append(key, updatedFormData[key]);
      });

      const response = await axios.post(
        "http://13.215.228.42:4001/api/agents_create", // Your existing API endpoint
        formBody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);

      // Display a Windows alert for success
      alert("successfully completed and approval with 24 hours."); // You can customize this message

      // Navigate to a different page if needed
      navigate("/agnets-hub");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="  bg-slate-300   flex justify-center items-center">
      <div
        className=" bg-slate-400 border-spacing-1 p-3 rounded-md my-2 shadow-md "
        class="bg-slate-400 p-6 my-3 rounded-md"
        name="SubmitPage"
      >
        <div>
          <div className="container shadow-mg hover:shadow-lg rounded-md p-2">
            <div className="bg-gray-200 rounded-lg ">
              <br />
              <h1 className="text-center font-bold text-lg border border-b-slate-200 ">
                Submit AI agent
              </h1>
              <p className="font-semibold p-3 space-x-3">
                free submition Reivew and approval with 24 hours.
                <br />
                Gain visibility,attract new users,and reciew valuable feedback
                by showcasing your AI Agent.
              </p>
              <div></div>
            </div>
          </div>
          <div className="input-container flex items-center bg-slate-100 p-2  rounded-md  ">
            <div style={{ width: "50%" }} className="p-1">
              <div className="flex py-2 ">
                <label className="hi" htmlFor="AiAgentName">
                  AI Agent Name <span className="star ml-2">*</span>
                </label>
                <div className="wordCount">{formData?.name?.length}/35</div>
              </div>
              <input
                className="form-control container mb-2 shadow-md hover:shadow-lg text-lg"
                type="text"
                name="name"
                id="AiAgentName"
                placeholder="Enter AI Agent Name"
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ width: "50%" }}>
              <div className="flex py-2 ">
                <label className="hi " htmlFor="CreatedBy">
                  Created By <span className="star ml-2">*</span>
                </label>
                <div className="wordCount">
                  {formData?.created_by?.length}/50
                </div>
              </div>
              <input
                className="form-control container mb-2 shadow-md hover:shadow-lg text-lg"
                type="text"
                name="created_by"
                id="CreatedBy"
                onChange={handleChange}
                required
                placeholder="Enter Creator Name"
              />
            </div>
          </div>
          <div className="input-container flex items-center  bg-slate-100 p-3  rounded-md ">
            <div style={{ width: "50%" }}>
              <div className="flex py-2 ">
                <label className="hi" for="Ai Agent">
                  Website URL <span className="star ml-2">*</span>
                </label>
                <div className="wordCount">
                  {formData?.website_url?.length}/100
                </div>
              </div>
              <input
                className="form-control container mb-2 shadow-md hover:shadow-lg text-lg"
                type="text"
                name="website_url"
                onChange={handleChange}
                required // This makes the field mandatory
                id="floatingInputGrid"
                placeholder="Enter Website URL or github Url"
              />
            </div>

            <div style={{ width: "50%" }}>
              <div className="flex py-2 ">
              <label className="hi " for="Ai Agent">
                Contact Email
              </label>
              <div className="wordCount ml-2">{formData?.email?.length}/50</div>
              </div>
              <input
                className="form-control container mb-2 shadow-md hover:shadow-lg text-lg"
                type="email"
                onChange={handleChange}
                name="email"
                id="floatingInputGrid"
                placeholder="Enter Email"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="input-container bg-slate-100 p-2  flex justify-center items-center rounded-md ">
            <div>
              <label className="hi" htmlFor="accessModel">
                Access Model <span className="star ml-2">*</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="access"
                  id="flexRadioDefault1"
                  value="Open Source"
                  checked={formData?.access === "Open Source"}
                  onChange={handleChange}
                  required // This makes the field mandatory
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Open Source
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="access"
                  id="flexRadioDefault2"
                  value="Closed Source"
                  checked={formData?.access === "Closed Source"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Closed Source
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="access"
                  id="flexRadioDefault3"
                  value="API"
                  checked={formData?.access === "API"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  API
                </label>
              </div>
            </div>
            <br />
            <div>
              <label className="hi" htmlFor="pricingModel">
                Pricing Model <span className="star ml-2">*</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="pricing"
                  id="flexRadioDefault4"
                  value="Free"
                  checked={formData.pricing === "Free"}
                  onChange={handleChange}
                  required // This makes the field mandatory
                />
                <label className="form-check-label" htmlFor="flexRadioDefault4">
                  Free
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="pricing"
                  id="flexRadioDefault5"
                  value="Freemium"
                  checked={formData.pricing === "Freemium"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault5">
                  Freemium
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="pricing"
                  id="flexRadioDefault6"
                  value="Paid"
                  checked={formData.pricing === "Paid"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault6">
                  Paid
                </label>
              </div>
            </div>
          </div>
          <div className="input-container bg-slate-100 p-2  flex justify-center items-center rounded-md ">
            <div>
              <label className="hi" htmlFor="category">
                Category <span className="star ml-2">*</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault7"
                  value="Personal Assistant"
                  checked={formData.category === "Personal Assistant"}
                  onChange={handleChange}
                  required // This makes the field mandatory
                />
                <label className="form-check-label" htmlFor="flexRadioDefault7">
                  Personal Assistant
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault8"
                  value="Data Analysis"
                  checked={formData.category === "Data Analysis"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault8">
                  Data Analysis
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault9"
                  value="Research"
                  checked={formData.category === "Research"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault9">
                  Research
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault10"
                  value="Digital Workers"
                  checked={formData.category === "Digital Workers"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault10"
                >
                  Digital Workers
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault11"
                  value="Productivity"
                  checked={formData.category === "Productivity"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault11"
                >
                  Productivity
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault12"
                  value="Customer Service"
                  checked={formData.category === "Customer Service"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault12"
                >
                  Customer Service
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault13"
                  value="Transition"
                  checked={formData.category === "Transition"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault13"
                >
                  Transition
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault14"
                  value="AI Agents Builder"
                  checked={formData.category === "AI Agents Builder"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault14"
                >
                  AI Agents Builder
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault15"
                  value="Content Creation"
                  checked={formData.category === "Content Creation"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault15"
                >
                  Content Creation
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault16"
                  value="Coding"
                  checked={formData.category === "Coding"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault16"
                >
                  Coding
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault17"
                  value="WorkFlow"
                  checked={formData.category === "WorkFlow"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault17"
                >
                  WorkFlow
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="category"
                  id="flexRadioDefault18"
                  value="Other"
                  checked={formData.category === "Other"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault18"
                >
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="input-container bg-slate-100 p-2  flex justify-center items-center rounded-md ">
            <div>
              <label className="hi" htmlFor="industry">
                Industry <span className="star ml-2">*</span>
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault19"
                  value="Fintech"
                  checked={formData.industry === "Fintech"}
                  onChange={handleChange}
                  required // This makes the field mandatory
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault19"
                >
                  Fintech
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault20"
                  value="Healthcare"
                  checked={formData.industry === "Healthcare"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault20"
                >
                  Healthcare
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault21"
                  value="Retail"
                  checked={formData.industry === "Retail"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault21"
                >
                  Retail
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault22"
                  value="Education"
                  checked={formData.industry === "Education"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault22"
                >
                  Education
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault23"
                  value="Transportation"
                  checked={formData.industry === "Transportation"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault23"
                >
                  Transportation
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault24"
                  value="Government"
                  checked={formData.industry === "Government"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault24"
                >
                  Government
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault25"
                  value="Agriculture"
                  checked={formData.industry === "Agriculture"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault25"
                >
                  Agriculture
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault26"
                  value="Media"
                  checked={formData.industry === "Media"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault26"
                >
                  Media
                </label>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault27"
                  value="E-commerce"
                  checked={formData.industry === "E-commerce"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault27"
                >
                  E-commerce
                </label>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="radio"
                  name="industry"
                  id="flexRadioDefault27"
                  value="Legal"
                  checked={formData.industry === "Legal"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioDefault27"
                >
                  Legal
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="tagline my-4">
          <p className="align-center p-0 m-0">
            <label className="hi">
              Tagline <span className="star ml-2">*</span>
            </label>
            <div className="wordCount1">{formData?.tagline?.length}/50</div>
          </p>

          <textarea
            id="tagline"
            name="tagline"
            placeholder="This is used on your AI Agent card."
            rows="3"
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-base resize-none"
          />
        </div>

        <div className="my-4">
          <div className="align-center ">
            <label className="hi">
              Description <span className="star ml-2">*</span>
            </label>
            <div className="wordCount1">
              {formData?.description?.length}/750
            </div>
          </div>
          <textarea
            id="description"
            name="description"
            placeholder="Briefly describe your AI Agent. The description is used on your AI Agent page."
            rows="7"
            onChange={handleChange}
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-base resize-none"
          />
        </div>

        <div>
          <div className="align-center">
            <label className="hi">Key Features</label>
            <div className="wordCount1">
              {formData?.key_features?.length}/600
            </div>
          </div>

          <textarea
            id="tagline"
            name="key_features"
            placeholder="Enter comma-separated features of your AI Agent"
            rows="5"
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-base resize-none"
          />
        </div>

        <div className="input-container bg-slate-100 p-6 flex justify-center items-center rounded-lg shadow-md transition-all duration-300">
          <div className="ai-agent-input-group flex flex-col space-y-3">
            <label
              className="ai-agent-label text-lg font-semibold text-gray-700"
              htmlFor="logo"
            >
              AI Agent Logo <span className="text-red-500">*</span> (URL)
            </label>
            <div className="relative">
              <input
                className="ai-agent-input hidden"
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, logo: e.target.files[0] })
                }
                required
              />
              <label
                htmlFor="logo"
                className="flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md bg-white p-4 text-gray-700 cursor-pointer hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Click or Drag to Upload Logo</span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: JPG, PNG, SVG
            </p>
          </div>
        </div>

        <div className="input-container bg-slate-50 p-6 rounded-lg shadow-md transition-all duration-300">
          <div className="w-full">
            <label
              className="text-lg font-semibold text-gray-700 mb-2"
              htmlFor="Youtube"
            >
              Video URL
            </label>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              type="url"
              id="Youtube"
              name="demo_video"
              placeholder="Enter a YouTube or Video Embed URL."
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 mt-2">
              Please enter a valid YouTube or video embed URL.
            </p>
          </div>
        </div>

        <button
          className={`max-w-lg mt-4 py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-slate-600 hover:bg-slate-700 shadow-lg focus:ring-4 focus:ring-blue-300"
          }`}
          onClick={(e) => handleCreate(e)}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <span>Submitting...</span>
          ) : (
            <span>Submit AI Agent</span>
          )}
        </button>

        {isLoading && (
          <div className="loader">
            <PrepLoader />
          </div> // Display loader when loading
        )}
      </div>
    </div>
  );
}
