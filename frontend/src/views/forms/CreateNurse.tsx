"use client";
import React, { useState } from "react";
import BaseInput from "../../components/inputs/BaseInput";
import BaseButton from "@/src/components/buttons/BaseButton";

export interface NurseState {
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
  telephone: string;
  password?: string;
  role?: string;
}

const CreateNurse = ({
  loading,
  onFormSubmit,
}: {
  loading: boolean;
  onFormSubmit: (obj: NurseState) => void;
}) => {
  const [state, setState] = useState<NurseState>({
    firstName: "",
    lastName: "",
    email: "",
    speciality: "general",
    telephone: "",
    role: "nurse",
  });

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setState((prevState: NurseState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    onFormSubmit(state);
  };

  return (
    <form className="w-full" onSubmit={handleSubmitForm}>
      <div>
        <div className="w-full flex flex-row gap-5 justify-between">
          <div className="w-full">
            <BaseInput
              required
              label="First Name"
              id="firstName"
              value={state.firstName}
              placeholder="First Name (Rwandan Name)"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <BaseInput
              required
              label="Last Name"
              id="lastName"
              value={state.lastName}
              placeholder="Last Name (Christian Name)"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-5 justify-between items-center">
          <div className="w-full">
            <BaseInput
              required
              label="Email"
              id="email"
              type="email"
              value={state.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full py-3.5">
            <label
              htmlFor="speciality"
              className="block mb-2 text-base font-medium"
            >
              Nurse Specialization
            </label>
            <select
              id="speciality"
              className="block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2"
              onChange={handleInputChange}
            >
              <option value="general">General</option>
            </select>
          </div>
        </div>

        <BaseInput
          required
          label="Telephone (Contact)"
          id="telephone"
          type="tel"
          value={state.telephone}
          placeholder="Ex: 078XXXXXXX"
          onChange={handleInputChange}
        />
        <div className="w-full py-3.5">
          <label
            htmlFor="speciality"
            className="block mb-2 text-base font-medium"
          >
            Role
          </label>
          <select
            id="speciality"
            className="block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2"
            onChange={handleInputChange}
          >
            <option value="nurse">Nurse</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div className="py-3.5">
        <BaseButton type="submit" loading={loading}>
          Submit
        </BaseButton>
      </div>
    </form>
  );
};

export default CreateNurse;
