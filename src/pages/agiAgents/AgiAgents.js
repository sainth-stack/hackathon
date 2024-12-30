import React, { useState, useEffect } from "react";
import "../../components/data.css"
import img1 from "../../assets/icon1.png";
import img2 from "../../assets/icon2.png";
import img5 from "../../assets/icon3.png";
import img6 from "../../assets/icon6.png";
import img7 from "../../assets/icon2.png";
import img8 from "../../assets/icon8.png";
import img9 from "../../assets/icon9.png";
import { useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFreeCodeCamp, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FaFreeCodeCamp, FaMoneyBillAlt } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import ChildCard from './../../components/Card/ChildCard';
import PrepLoader from './../../components/prep-loader/loader';
import Footer from './../../components/footer/Footer';

export default function AgiAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [accessoryModel, setAccessoryModel] = useState("");
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [sort, setSort] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");

  const categoriesList = [
    "Personal Assistant",
    "Coding",
    "Digital Workers",
    "Productivity",
    "AI Agents Builder",
    "Research",
    "Content Creation",
    " Data Analysis",

    "Customer Service",
    "Transition",
    "AI Agents Builder",

    "Coding",
    " WorkFlow",
    "Other",
  ];
  const industriesList = [
    "Government",
    "Fintech",
    "Retail",
    "Education",
    "Transportaion",
    "Healthcare",
    "Productivity",
    "Legal",
    "E-commerce",
    "Media",
    "Agriculture",
  ];
  // // State to track the number of likes
  // const [likes, setLikes] = useState(0);

  // // Function to handle the like button click
  // const handleLike = () => {
  //   setLikes(likes + 1);

  const [likes, setLikes] = useState(0);

  // This should be inside the component
  useEffect(() => {
    // Effect logic here
    console.log("Effect ran when component mounted or likes changed");
  }, [likes]); // Add the necessary dependencies

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes(likes + 1); // Example logic for incrementing likes
  };

  // Handle change functions for the filters
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleAccessoryModelChange = (e) => setAccessoryModel(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleIndustryChange = (e) => setIndustry(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  const handleCategorySearchChange = (e) => setCategorySearch(e.target.value);
  const handleIndustrySearchChange = (e) => setIndustrySearch(e.target.value);

  const handleCategoryCheckboxChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handleIndustryCheckboxChange = (industry) => {
    const updatedIndustries = selectedIndustries.includes(industry)
      ? selectedIndustries.filter((item) => item !== industry)
      : [...selectedIndustries, industry];
    setSelectedIndustries(updatedIndustries);
  };

  useEffect(() => {
    setLoading(true);

    const fetchAgents = async () => {
      try {
        const queryParams = [];

        if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
        if (accessoryModel)
          queryParams.push(
            `accessory_model=${encodeURIComponent(accessoryModel)}`
          );
        if (selectedCategories.length) {
          selectedCategories.forEach((category) => {
            queryParams.push(`category=${encodeURIComponent(category)}`);
          });
        }

        if (selectedIndustries.length) {
          selectedIndustries.forEach((industry) => {
            queryParams.push(`industry=${encodeURIComponent(industry)}`);
          });
        }

        if (sort) queryParams.push(`sort=${encodeURIComponent(sort)}`);

        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        const response = await fetch(
          `http://13.215.228.42:4001//api/agent_list${queryString}`
        );
        const data = await response.json();

        const images = [img1, img6, img2, img8, img5, img6, img7, img8, img9];
        const updatedData = data.agents.map((agent) => ({
          id: agent[0],
          name: agent[1],
          description: agent[2],
          category: agent[3]?.replace(/"/g, ""),
          industry: agent[4]?.replace(/"/g, ""),
          pricing_model: agent[5]?.replace(/"/g, ""),
          api_type: agent[6]?.replace(/"/g, ""),
          date: agent[7],
          url: agent[8],
          tagline: agent[9]?.replace(/"/g, ""),
          duration: agent[10],
          overview: agent[11],
          features: agent[12],
          use_cases: agent[13],
          author: agent[14],
          visibility: agent[15],
          tags: agent[16],
          logo: agent[18],

          preview_image: agent[17]?.replace(/"/g, ""),
          demo_video: agent[18]?.replace(/"/g, ""),
          img: images[agent[0] % images.length],
        }));

        setLoading(false);
        setAgents(updatedData);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, [search, accessoryModel, selectedCategories, selectedIndustries, sort]);

  const filteredCategories = categoriesList.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredIndustries = industriesList.filter((industry) =>
    industry.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const location = useLocation();

  return (
    <>
      <div className="w-12/12 bg-gray-50">
        <div
          className={`bg-slate-50 shadow-md rounded-lg  ${
            location.pathname == "/agnets-hub" ? "" : ""
          }`}
        >
          {/* // <Navbar /> */}
          <div
            className="bg-slate-100"
            style={{
              width: "100%",
              color: "black",
              display: "flex",
              flexDirection: "column", // Stack elements vertically
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center", // Center-align text content
            }}
          >
            <div>
              <h1
                className="explore  p-2"
                style={{
                  color: "black",
                }}
              >
                Explore the World of AI Agents
              </h1>
              <p
                className="list text-black"
                style={{
                  color: "black",
                }}
              >
                Enter To World Of Collected List Of 100+ AI Agents
              </p>
            </div>
            <input
              type="text"
              placeholder="Search for AI Agent here..."
              className="w-4/5 md:w-2/5 max-w-lg mb-5 p-2 text-md border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow duration-300 ease-in-out"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter-container bg-slate-100 border  rounded-lg shadow-md p-5">
            <div className="filter-section container bg-slate-50  rounded-md shadow-md  space-y-6 max-w-sm">
              <h3 className="text-lg font-bold text-gray-700 border-b pb-2">
                Refine Search
              </h3>

              <div className="categories space-y-3">
                <h4 className="text-md font-semibold text-gray-600">
                  Categories
                </h4>
                <input
                  type="text"
                  placeholder="Search categories"
                  className="filter-search w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={categorySearch}
                  onChange={handleCategorySearchChange}
                />

                <div className="checkbox-group overflow-y-auto h-48 border-t pt-2">
                  {filteredCategories.map((category, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer font-semibold hover:text-gray-800"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryCheckboxChange(category)}
                        className="accent-blue-500 font-bold"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="industries space-y-3">
                <h4 className="text-md font-semibold text-gray-600">
                  Industries
                </h4>
                <input
                  type="text"
                  placeholder="Search industries"
                  className="filter-search w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={industrySearch}
                  onChange={handleIndustrySearchChange}
                />

                <div className="checkbox-group overflow-y-auto h-48 border-t pt-2">
                  {filteredIndustries.map((industry, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer font-semibold hover:text-gray-800"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(industry)}
                        onChange={() => handleIndustryCheckboxChange(industry)}
                        className="accent-blue-500"
                      />
                      {industry}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="agents-section mt-6">
              <div className="agents-header flex justify-between items-center border-b pb-2">
                <div className="view-switch flex space-x-2">
                  {/* Add toggle buttons for Grid/List View */}
                </div>

                <div className="sort-dropdown flex items-center space-x-3">
                  <label
                    htmlFor="sort"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sort By:
                  </label>
                  <select
                    id="sort"
                    className="sort-select bg-gray-50 border border-gray-400 text-gray-700 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <PrepLoader />
                </div>
              ) : (
                <div className="agents-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {agents.map((agent) => (
                    <ChildCard
                      key={agent.id}
                      agent={agent}
                      navigate={navigate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
