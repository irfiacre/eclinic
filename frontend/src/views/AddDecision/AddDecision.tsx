import BaseButton from "@/src/components/buttons/BaseButton";
import React, { useState } from "react";

const AddQuestion = ({
  patient,
  loading,
  handleAddDecision,
}: {
  patient: any;
  loading: boolean;
  handleAddDecision: (data: any) => void;
}) => {
  const [text, setText] = useState<string>("");

  const submitDecision = () => {
    handleAddDecision(text);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-center py-5 text-textLightColor font-medium">
          Add Decision/Prescription
        </h1>
        <div className="flex flex-col items-center justify-center gap-5 p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add decision..."
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-vertical min-h-[70px]"
            rows={3}
          />
          <BaseButton
            handleSubmit={submitDecision}
            additionalStyles="rounded-full px-12 py-3 bg-primary/90 hover:bg-primary text-white"
            loading={loading}
          >
            Send
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
