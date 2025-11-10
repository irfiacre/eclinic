/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import SearchableInput from "../inputs/SearchInput";
import Pagination from "./Pagination";
import Link from "next/link";
import { Icon } from "@iconify/react";

const PatientsTable = ({ data }: { data: Array<any> }) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModel, setOpenCourseModel] = useState<boolean>(false);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    id: "",
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    updateTableData(
      data.filter((item) =>
        searchText.trim() === ""
          ? item
          : item.title.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, [data, searchText]);

  const handleSidebarSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <BaseCard className="px-10 py-5">
      <SearchableInput
        inputID="sidebarSearch"
        value={searchText}
        onInputChange={handleSidebarSearch}
        inputClassName="rounded-md"
      />
      <div className="py-5 text-textLightColor text-base font-semibold flex flex-row justify-between items-center">
        <span>Total = {data.length}</span>
      </div>
      <div className="py-2.5 text-textLightColor text-base font-semibold flex flex-row align-middle items-center px-1.5 gap-3.5 cursor-pointer bg-backgroundColor">
        <span className="w-full">Name</span>
        <span className="w-full">Priority</span>
        <span className="w-full">Status</span>
        <span className="w-full">Patient Note</span>
      </div>
      <hr />
      <div>
        {tableData.map((item) => (
          <div key={item.id}>
            <div className="flex flex-row align-middle items-center py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
              <div className="w-full">
                <Link
                  href={`/cases/${item.id}`}
                  className="flex gap-2 items-center"
                >
                  <span>{`${item.patient.firstName} ${item.patient.lastName}`}</span>
                </Link>
              </div>
              <div className="text-sm w-full">
                <Link href={`/cases/${item.id}`}>
                  <span
                    className={`text-white font-medium ${
                      item.priority === "critical"
                        ? "bg-red-500"
                        : item.priority === "moderate"
                        ? "bg-orange-500"
                        : item.priority === "safe"
                        ? "bg-successGreen"
                        : "bg-accent"
                    } py-2 px-5 rounded-full`}
                  >
                    {item.priority}
                  </span>
                </Link>
              </div>
              <div className="w-full">
                <Link
                  href={`/cases/${item.id}`}
                  className="flex gap-2 items-center"
                >
                  <span>{item.status}</span>
                </Link>
              </div>
              <div className="w-full">
                <Link
                  href={`/cases/${item.id}`}
                  className="flex gap-2 items-center"
                >
                  <span>{item.patientInformation.note}</span>
                </Link>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="w-full py-10">
        <Pagination prevPage={1} currentPage={1} nextPage={1} totalPages={1} />
      </div>
    </BaseCard>
  );
};

export default PatientsTable;
