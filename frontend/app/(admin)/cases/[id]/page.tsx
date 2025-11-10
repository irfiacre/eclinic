"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import BaseCard from "@/src/components/cards/BaseCard";
import { useParams } from "next/navigation";
import Loading from "@/src/components/LoadingComponent";
import AddDecision from "@/src/views/AddDecision/AddDecision";
import BaseButton from "@/src/components/buttons/BaseButton";
import { baseService } from "@/services/backend";
import BaseModal from "@/src/components/models/BaseModal";
import BaseInput from "@/src/components/inputs/BaseInput";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import { handleGetAgentOutput } from "@/agents/assessment";
import { buildRecommendationPrompt } from "@/agents/prompts";
import { extractInformationFromToken } from "@/util/helpers";

const CourseDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [patientCase, setPatientCase] = useState<any>({});
  const [measurements, setMeasurements] = useState({
    temperature: "",
    bloodPressure: "",
    weight: "",
    height: "",
    respirations: "",
  });
  const [addingQuestions, setAddingQuestions] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [doingAction, setDoingAction] = useState<boolean>(false);
  const [aiRecommendation, setAiRecommendation] = useState<string>("");

  const getPatientCaseData = async () => {
    setLoading(true);
    const result = await baseService(`patient-cases/${params.id}`);
    if (result?.result) {
      setPatientCase(result.result);
      if (result.result.patientMeasurement) {
        setMeasurements(result.result?.patientMeasurement);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getPatientCaseData();
    })();
  }, [params.id]);

  const handleAddDecision = async (decision: any) => {
    setAddingQuestions(true);
    const information: any = await extractInformationFromToken();    
    const result = await baseService(
      `patient-cases/${params.id}`,
      {
        decision,
        status: "served",
        priority: "safe",
        assignedNurse: information.nurse,
      },
      "PATCH"
    );
    if (result?.result) {
      toast.success("Decision Added Successfully", {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 5000,
        onClose: async () => await getPatientCaseData(),
      });
    }
    setAddingQuestions(false);
  };

  const handleOnChange = async (e: any) => {
    e.preventDefault();
    setMeasurements((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitMeasurements = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setDoingAction(true);
    const result = await baseService(
      "measurements",
      {
        patientCase,
        ...measurements,
      },
      "POST"
    );
    if (result?.result) {
      toast.success(
        `Measurements ${
          patientCase?.patientMeasurement ? "Updated" : "Added"
        } Successfully`,
        {
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 5000,
          onClose: async () => await getPatientCaseData(),
        }
      );
      setOpenModal(false);
    }
    setDoingAction(false);
  };

  const handleGetAIRecommendation = async () => {
    setDoingAction(true);
    const prompt = buildRecommendationPrompt({
      measurement: { ...patientCase?.patientMeasurement },
      information: { ...patientCase?.patientInformation },
    });

    const result: any = await handleGetAgentOutput(
      prompt,
      "Provide a recommendation"
    );
    setAiRecommendation(result.result);
    setDoingAction(false);
  };

  return (
    <div>
      <div className="flex flex-row gap-5 max-md:flex-col">
        {openModal && (
          <BaseModal
            title="Add Patient Measurements"
            onClose={() => setOpenModal(false)}
            containerStyle="w-4/5 p-10"
          >
            <form className="space-y-2" onSubmit={handleSubmitMeasurements}>
              <BaseInput
                label="Temperature"
                required={true}
                type="number"
                id="temperature"
                onChange={handleOnChange}
                value={measurements.temperature}
              />
              <BaseInput
                label="Blood Pressure"
                required={true}
                type="number"
                id="bloodPressure"
                onChange={handleOnChange}
                value={measurements.bloodPressure}
              />
              <BaseInput
                label="Weight (KG)"
                required={true}
                type="number"
                id="weight"
                onChange={handleOnChange}
                value={measurements.weight}
              />
              <BaseInput
                label="Height (CM)"
                required={true}
                type="number"
                id="height"
                onChange={handleOnChange}
                value={measurements.height}
              />
              <BaseInput
                label="Respiration Rate"
                required={true}
                type="number"
                id="respirations"
                onChange={handleOnChange}
                value={measurements.respirations}
              />
              <br />
              <BaseButton loading={doingAction}> Submit </BaseButton>
            </form>
          </BaseModal>
        )}
        <BaseCard className="px-10 py-10 w-full">
          {loading ? (
            <Loading />
          ) : (
            <div className="text-textDarkColor">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-xl font-semibold max-md:text-base">
                  {`${patientCase?.patient?.firstName} ${patientCase?.patient?.lastName}`}
                </h1>
                <div className="text-black">
                  <BaseButton
                    additionalStyles="bg-wild text-black rounded-xl p-2 max-md:text-sm max-md:p-3"
                    handleSubmit={() => setOpenModal(true)}
                  >
                    {patientCase?.patientMeasurement ? "Edit" : "Add"} Measurent
                  </BaseButton>
                </div>
              </div>

              <div className="py-3">
                <hr />
                <br />
                <div className="space-y-5">
                  <div>
                    <span className="font-medium text-textLightColor">
                      National ID:
                    </span>{" "}
                    {patientCase?.patient?.nationalId}
                  </div>
                  <div>
                    <span className="font-medium text-textLightColor">
                      Condition:
                    </span>
                    <span
                      className={`text-white font-medium ${
                        patientCase?.priority === "critical"
                          ? "bg-red-500"
                          : patientCase?.priority === "moderate"
                          ? "bg-orange-500"
                          : patientCase?.priority === "safe"
                          ? "bg-successGreen"
                          : "bg-accent"
                      } ml-3 py-1 px-5 rounded-full`}
                    >
                      {patientCase?.priority}
                    </span>
                  </div>

                  <div className="flex flex-row items-center justify-between max-md:flex-col">
                    <div className="w-full space-y-2.5">
                      <h1 className="font-medium text-textLightColor">
                        Patient Measurements
                      </h1>
                      <div className="pl-2 space-y-2.5">
                        <p>
                          <span className="font-medium">Blood Pressure: </span>
                          {patientCase?.patientMeasurement?.temperature ||
                            "Not Provided Yet"}
                        </p>
                        <p>
                          <span className="font-medium">Temperature: </span>
                          {patientCase?.patientMeasurement?.bloodPressure ||
                            "Not Provided Yet"}
                        </p>
                        <p>
                          <span className="font-medium">Height: </span>
                          {patientCase?.patientMeasurement?.weight ||
                            "Not Provided Yet"}
                        </p>
                        <p>
                          <span className="font-medium">Weight: </span>
                          {patientCase?.patientMeasurement?.height ||
                            "Not Provided Yet"}
                        </p>
                        <p>
                          <span className="font-medium">Respirations: </span>
                          {patientCase?.patientMeasurement?.respirations ||
                            "Not Provided Yet"}
                        </p>
                      </div>
                    </div>
                    <div className="w-full space-y-2.5">
                      <h1 className="font-medium text-textLightColor">
                        Patient Provided Information
                      </h1>
                      <div className="pl-2 space-y-2.5">
                        <p>
                          <span className="font-medium">Chronic Disease: </span>
                          {patientCase?.patientInformation?.chronicDisease}
                        </p>
                        <p>
                          <span className="font-medium">Days: </span>
                          {patientCase?.patientInformation?.days}
                        </p>
                        <p>
                          <span className="font-medium">Pain Scale: </span>
                          {patientCase?.patientInformation?.painScale}
                        </p>
                        <p>
                          <span className="font-medium">Pain Location: </span>
                          {patientCase?.patientInformation?.painLocation}
                        </p>
                        <p>
                          <span className="font-medium">
                            Patient&apos;s Note:{" "}
                          </span>
                          {patientCase?.patientInformation?.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <hr />
              </div>
              {aiRecommendation && (
                <div>
                  <Markdown>{aiRecommendation}</Markdown>
                </div>
              )}
              <BaseButton
                additionalStyles="text-white flex flex-row items-center justify-center"
                handleSubmit={handleGetAIRecommendation}
                disabled={!patientCase?.patientMeasurement?.temperature}
                loading={doingAction}
              >
                Get AI Recommendation
                <Icon icon="mingcute:ai-fill" className="ml-2" fontSize={24} />
              </BaseButton>
            </div>
          )}
        </BaseCard>
        <BaseCard className="w-2/4 max-md:w-full">
          <AddDecision
            patient={patientCase}
            loading={addingQuestions}
            handleAddDecision={handleAddDecision}
          />
        </BaseCard>
      </div>
    </div>
  );
};

export default CourseDetails;
