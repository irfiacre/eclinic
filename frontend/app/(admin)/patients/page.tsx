"use client";
import React, { useEffect, useState } from "react";
import PatientsTable from "@/src/components/tables/Patients";
import Loading from "@/src/components/LoadingComponent";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const initialFindApplications = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    initialFindApplications();
  }, []);

  return <div>{loading ? <Loading /> : <PatientsTable data={data} />}</div>;
};

export default Courses;
