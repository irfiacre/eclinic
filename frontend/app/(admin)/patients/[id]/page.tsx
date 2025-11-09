"use client";
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Icon } from "@iconify/react/dist/iconify.js";
import BaseCard from "@/src/components/cards/BaseCard";
import { useParams } from "next/navigation";
import Loading from "@/src/components/LoadingComponent";
import PatientComponent from "@/src/components/PatientComponent";
import { QuestionInterface } from "@/agents/assessment";
import ReportTemplate from "@/src/components/report/Template";
import AddQuestion from "@/src/views/addQuestion/AddQuestion";
import BaseButton from "@/src/components/buttons/BaseButton";
import { baseService } from "@/services/backend";

const CourseDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<any>({});
  const [generating, setGenerating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addingQuestions, setAddingQuestions] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await baseService(`users/${params.id}`);
      if (result) setPatient(result.result);
      setLoading(false);
    })();
  }, [params.id]);

  const handleAddDecision = async (questions: any) => {
    setAddingQuestions(true);
    console.log("Delete code");

    setAddingQuestions(false);
  };

  console.log("=====", patient);

  return (
    <div>
      <div className="flex flex-row gap-5 max-md:flex-col">
        <BaseCard className="px-10 py-10 w-full">
          {loading && !patient.id ? (
            <Loading />
          ) : (
            <div className="text-textDarkColor">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-xl font-semibold max-md:text-base">
                  {`${patient?.firstName} ${patient?.lastName}`}
                </h1>
                <div>
                  {!patient?.patientMeasurement && (
                    <BaseButton additionalStyles="bg-wild text-black rounded-xl p-2 max-md:text-sm max-md:p-3">
                      Add Measurent
                    </BaseButton>
                  )}
                </div>
              </div>

              <div className="py-3">
                <hr />
                <br />
                <div className="space-y-5">
                  <div>
                    <span>National ID: {patient?.nationalId}</span>
                  </div>
                  <div>
                    <span>Condition:</span>
                    <span
                      className={`text-white font-medium ${
                        patient?.patientOnQueue?.priority === "critical"
                          ? "bg-red-500"
                          : patient?.patientOnQueue.priority === "moderate"
                          ? "bg-orange-500"
                          : "bg-accent"
                      } ml-3 py-1 px-5 rounded-full`}
                    >
                      {patient?.patientOnQueue.priority}
                    </span>
                  </div>

                  <div className="w-full space-y-2.5">
                    <h1 className="font-medium text-textLightColor">Patient Provided Information</h1>
                    <div className="pl-2 space-y-2.5">
                      <p>
                      Chronic Disease:{" "}
                      {patient?.patientInformation?.chronicDisease}
                    </p>
                    <p>Days: {patient?.patientInformation?.days}</p>
                    <p>Pain Scale: {patient?.patientInformation?.painScale}</p>
                    <p>
                      Pain Location: {patient?.patientInformation?.painLocation}
                    </p>
                    <p>
                      Patient&apos;s Note: {patient?.patientInformation?.note}
                    </p>
                    </div>
                    
                  </div>
                  <div className="w-full space-y-2.5">
                    <h1 className="font-medium text-textLightColor">Patient Measurements</h1>
                    <div className="pl-2 space-y-2.5">
                      <p>
                      Put measurements
                    </p>
                    </div>
                    
                  </div>
                </div>
                <br />
                <hr />
              </div>
            </div>
          )}
        </BaseCard>
        <BaseCard className="w-2/4 max-md:w-full">
          <AddQuestion
            patient={patient}
            loading={addingQuestions}
            handleAddDecision={handleAddDecision}
          />
        </BaseCard>
      </div>
    </div>
  );
};

export default CourseDetails;
