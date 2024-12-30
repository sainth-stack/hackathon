import React, { useEffect, useState } from "react";
// Import the CSS file for styling
import './index.css'
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaTag,
  FaIndustry,
  FaDollarSign,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa"; // Import icons
import PrepLoader from "../../../../components/prep-loader/loader";
const DetailPage = () => {
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();
  // Extract the ID from the URL
  const getAgentIdFromURL = () => {
    const url = window.location.href;

    const id = url.split("/"); 
    return id[id.length - 1];
  };

  // const getVideoIdFromURL = (url) => {
  //   const id = url.split("/");
  //   // Split the URL at the '?' and get the part after it
  //   console.log(`https://www.youtube.com/embed/${id[3]}`);

  //   return id; // Return the ID directly
  // };

  function getVideoIdFromURL(url) {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
  // Fetch agent details from the API
  useEffect(() => {
    const fetchAgentDetails = async () => {
      const agentId = getAgentIdFromURL();
      try {
        const response = await fetch(
          `http://13.215.228.42:4001/api/agents_detail/${agentId}`
        );
        const data = await response.json();
        setAgent(data?.agent);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      }
    };

    fetchAgentDetails();
    // console.log(agent);
  }, []);

  if (!agent) {
    return (
      <div
        style={{
          display: "display",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PrepLoader />
      </div>
    ); // Show a loading state while fetching data
  }

  return (
    <div className="total-container">
      <div className="detail-container">
        <button
          className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
          onClick={() => navigate("/agi-agents")}
        >
          ← Back to Directory
        </button>

        <div className="detail-header bg-slate-100 w-full section-border">
          <img
            src={agent?.logo}
            alt={""}
            className="agent-logo shadow-md  object-contain border shadow-gray-800 hover:shadow-lg"
          />
          <div className=" flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {agent?.name}
            </h1>
            <p className="agent-tagline text-gray-600 text-sm md:text-base mt-2">
              {agent?.tagline}
            </p>

            <div className="flex justify-center items-center space-x-4 mt-4">
              <span className="tag flex items-center text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full shadow">
                <i className="fas fa-headset mr-2"></i> Customer Service
              </span>
              <span className="tag industry flex items-center text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full shadow">
                <i className="fas fa-laptop-code mr-2"></i> Technology
              </span>
              <span className="tag pricing flex items-center text-sm bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full shadow">
                <i className="fas fa-tags mr-2"></i> Freemium
              </span>
              <span className="tag accessory flex items-center text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full shadow">
                <i className="fas fa-lock mr-2"></i> Closed Source
              </span>
            </div>

            <button className="mt-5 bg-gray-300 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 ease-in-out hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <a
                href={agent.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 no-underline text-blue-600 hover:text-white transition duration-200 ease-in-out"
              >
                <i className="fas fa-external-link-alt"></i>
                <span className="font-semibold">Visit Website</span>
              </a>
            </button>
          </div>
        </div>

        {/* Overview Section */}
        <div className="detail-section section-border">
          <h3>
            <span class="description-label font-bold">Description:</span>
            <span class="agent-name">{agent?.name}</span>
          </h3>

          <p>{agent?.description}</p>
        </div>
        {/* tags Section
      <div className="detail-section section-border">
        <h2>Tags </h2>
        <p>{agent?.tag}</p>
      </div> */}

        {/* Key Features Section */}
        <div className="detail-section section-border">
          <h2>Key Features</h2>
          <ul className="star-list p-0">
            {agent.key_features.map((feature, index) => (
              <li key={index} className="mt-2  space-x-2">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases Section */}
        {/* <div className="detail-section section-border">
                <h2>Use Cases</h2>
                <ul className='tick-list'>
                    {agent.use_cases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                    ))}
                </ul>
            </div> */}
        {/* tagline Section
        <div className="detail-section section-border">
          <h2>Tagline </h2>
          <p>{agent.tagline}</p>
        </div> */}

        {/* AI Agent Details Section */}
        <div className="detail-section section-border">
          <h2>AI Agent Details</h2>
          <div className="agent-details">
            <div>
              <p>
                {" "}
                <FaUser className="icon" />
                <strong className="New ">Created by:</strong>{" "}
                <div className="hiii  mx-2 "> {agent?.details?.created_by}</div>
              </p>
              <p>
                <FaTag className="icon" />{" "}
                <strong className="New">Category:</strong>{" "}
                <dvi className="hiii  mx-2"> {agent?.details?.category}</dvi>
              </p>
              <p>
                <FaLock className="icon" />
                <strong className="New">Access:</strong>{" "}
                <div className="hiii  mx-2"> {agent?.details?.access}</div>
              </p>
            </div>
            <div>
              <p>
                <FaIndustry className="icon" />
                <strong className="New">Industry:</strong>{" "}
                <div className="hiii  mx-2"> {agent?.details?.industry}</div>
              </p>
              <p>
                {" "}
                <FaDollarSign className="icon" />
                <strong className="New">Pricing Model:</strong>{" "}
                <div className="hiii  mx-2"> {agent?.details?.pricing}</div>
              </p>

              <p>
                <FaCalendarAlt className="icon" />
                <strong className="New">Date Created:</strong>
                <div className="hiii  mx-2"> {agent?.details?.date_added}</div>
              </p>
            </div>{" "}
          </div>
        </div>

        {/* Preview Section */}
        {/* <div className="detail-section section-border">
                <h2>Preview</h2>
                <img
                    src={agent?.details?.preview_image || "https://via.placeholder.com/800x400"}
                    alt="Phonely AI Preview"
                    className="preview_image"
                    name="preview_image"
                />
            </div> */}

        {/* Demo Video Section */}
        <div className="detail-section section-border">
          <h2>DemoVideo</h2>
          <iframe
            className="demo"
            width="100%"
            height="300"
            name="demo_video"
            src={`https://www.youtube.com/embed/${getVideoIdFromURL(
              agent?.demo_video || "https://youtu.be/cJsZwyh7O5M"
            )} `} // Replace with actual video link
            title="Phonely AI Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
