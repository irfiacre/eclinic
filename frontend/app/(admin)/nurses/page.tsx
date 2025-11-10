"use client";
import React, { useEffect, useState } from "react";
import PatientsTable from "@/src/components/tables/Patients";
import Loading from "@/src/components/LoadingComponent";
import UsersTable from "@/src/components/tables/UsersTable";
import { baseService } from "@/services/backend";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const initialFindApplications = async () => {
    setLoading(true);
    const result = await baseService("staff");
    if (result) setData(result.result);
    setLoading(false);
  };

  useEffect(() => {
    initialFindApplications();
  }, []);

  return <div>{loading ? <Loading /> : <UsersTable data={data} refreshData={initialFindApplications} />}</div>;
};

export default Courses;
