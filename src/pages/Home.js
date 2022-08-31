import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Components/Table";
import Search from "../Components/Search";
import TopBar from "../Components/TopBar";

const Home = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filterCountriesData, setFilterCountriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getList = async () => {
    const response = await axios.get("https://api.covid19api.com/summary");
    setCountriesData(response.data.Countries);
    setFilterCountriesData(response.data.Countries);
  };

  const onHandleSearch = () => {
    const response = countriesData.filter((item) => {
      return item.Country.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilterCountriesData(response);
  };

  useEffect(() => {
    onHandleSearch();
  }, [searchTerm]);

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="shadow p-3 bg-white">
      <TopBar />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table data={filterCountriesData} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
