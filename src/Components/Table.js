import React, { useState, useEffect } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Pagination from "react-js-pagination";

const Table = ({ data, searchTerm }) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortType, setSortType] = useState("acc");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sliceData, setSliceData] = useState([]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onHandleSort = (type) => {
    const mockData = [...data];

    if (type === "acc") {
      const resSort = mockData.sort((a, b) => {
        return b.TotalConfirmed - a.TotalConfirmed;
      });
      setSortedData(resSort);
    } else if (type === "des") {
      const resSort = mockData.sort((a, b) => {
        return a.TotalConfirmed - b.TotalConfirmed;
      });
      setSortedData(resSort);
    }

    setSortType(type);
  };

  const onHandlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    let start = (page - 1) * itemsPerPage;
    let end = page * itemsPerPage;
    console.log(start, end);
    const mockData = [...sortedData];

    const res = mockData.slice(start, end);
    setSliceData(res);
    // console.log(res);
  }, [page]);

  useEffect(() => {
    if (data.length) {
      setSortedData(data);
    }
  }, [data]);

  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={sortedData.length}
        pageRangeDisplayed={5}
        onChange={onHandlePageChange}
      />

      <table className="table ">
        <thead className="table-success">
          <tr>
            <th scope="col">Country</th>
            <th className="text-center" scope="col">
              <span>Total Confirmed</span>

              {sortType === "acc" ? (
                <span role="button" onClick={() => onHandleSort("des")}>
                  <FiChevronUp />
                </span>
              ) : (
                <span role="button" onClick={() => onHandleSort("acc")}>
                  <FiChevronDown />
                </span>
              )}
            </th>
            <th scope="col" className="text-center">
              Total Deaths
            </th>
            <th scope="col" className="text-center">
              Total Recovered
            </th>
          </tr>
        </thead>
        <tbody>
          {sliceData.length > 0 &&
            sliceData.map((item) => {
              return (
                <tr>
                  <td>{item.Country}</td>
                  <td className="text-center">
                    {numberWithCommas(item.TotalConfirmed)}
                  </td>
                  <td className="text-center">
                    {numberWithCommas(item.TotalDeaths)}
                  </td>
                  <td className="text-center">
                    {numberWithCommas(item.TotalRecovered)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
