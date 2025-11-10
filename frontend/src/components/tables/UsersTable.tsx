"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import SearchableInput from "../inputs/SearchInput";
import Link from "next/link";
import BaseModal from "../models/BaseModal";
import { DEFAULT_PASSWORD } from "@/constants/fixtures";
import CreateNurse, { NurseState } from "@/src/views/forms/CreateNurse";
import { toast } from "react-toastify";
import { baseService } from "@/services/backend";
import { Icon } from "@iconify/react/dist/iconify.js";

const NursesTable = ({
  data,
  refreshData,
}: {
  data: Array<any>;
  refreshData: () => void;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sendConfirmationEmail = async (email: string) => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        subject: "Congratulations you've been added to eClinic",
        message: `
        <p>Warm welcome to eClinic platform, we are excited to have you ;)</p>
        <div>
        <h3>You've been added as a "Nurse":</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${DEFAULT_PASSWORD}</p>
        </div>
        `,
        title: "Congratulations you've been added to eClinic",
      }),
    });

    const result = await res.json();

    if (result.success) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    updateTableData(
      data.filter((item) =>
        searchText.trim() === ""
          ? item
          : item.firstName
              .toLowerCase()
              .includes(searchText.trim().toLowerCase())
      )
    );
  }, [data, searchText]);

  const handleSidebarSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    refreshData();
  };

  const handleAddNurse = async (nurse: NurseState) => {
    setLoading(true);
    nurse.password = DEFAULT_PASSWORD;
    const result = await baseService("staff", nurse, "POST");

    if (result?.result) {
      toast.success("Nurse Added Successfully", {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
        onClose: async () => {
          sendConfirmationEmail(nurse.email);
        },
      });
    }
    setLoading(false);
  };

  const handleDeleteNurse = async (nurse: any) => {
    setLoading(true);
    const result = await baseService(`nurse/${nurse.id}`, {}, "DELETE");
    if (!result) {
      toast.success("Nurse Deleted Successfully", {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <BaseCard className="px-10 py-5">
      <SearchableInput
        inputID="sidebarSearch"
        value={searchText}
        onInputChange={handleSidebarSearch}
        inputClassName="rounded-md"
      />
      <div>
        {openModal && (
          <BaseModal
            title="Add New Nurse"
            onClose={handleCloseModal}
            containerStyle="w-4/5 p-10"
          >
            <div>
              <CreateNurse onFormSubmit={handleAddNurse} loading={loading} />
            </div>
          </BaseModal>
        )}
        <div className="py-5 text-textLightColor flex flex-row justify-between items-center">
          <div className="py-2.5 text-primary text-xl">Nurses</div>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="h-12 text-white bg-primary hover:bg-primaryDark focus:outline-none font-medium rounded-lg text-md text-center px-4"
          >
            Add Nurse
          </button>
        </div>
      </div>

      <hr />
      <div>
        {tableData.map((item) => (
          <div key={`${item.id}`}>
            <div className="flex flex-row justify-between items-center py-2.5 px-1.5 gap-3.5 cursor-pointer hover:bg-primary_3">
              <div className="text-sm">
                <span className="text-textLightColor font-light">
                  {item.firstName}
                </span>{" "}
                <span className="text-textLightColor font-light">
                  {item.lastName}
                </span>
              </div>
              <div>
                <span
                  className={`font-light ${
                    item.speciality === "general"
                      ? "text-successGreen"
                      : item.status === "Rejected"
                      ? "text-red-600"
                      : "text-textLightColor"
                  }`}
                >
                  {item.speciality}
                </span>
              </div>
              <div>
                <span className="text-textLightColor font-light">
                  {item.telephone}
                </span>
              </div>
              <div>
                <span className="text-textLightColor font-light">
                  {item.email}
                </span>
              </div>
              <div>
                <button
                  className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                  type="button"
                  onClick={() => handleDeleteNurse(item)}
                >
                  <Icon icon="mdi:delete" fontSize={20} />
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </BaseCard>
  );
};

export default NursesTable;
