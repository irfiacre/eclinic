"use client";
import React, { useEffect, useState } from "react";
import PatientsTable from "@/src/components/tables/Patients";
import Loading from "@/src/components/LoadingComponent";
import { baseService } from "@/services/backend";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await baseService("patient-cases");
      if (result) setData(result.result);
      setLoading(false);
    })();
  }, []);

  return <div>{loading ? <Loading /> : <PatientsTable data={data} />}</div>;
};

export default Courses;
