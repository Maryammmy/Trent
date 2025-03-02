import { PropertyNameInputs } from "../types";

export interface IPropertyInput {
  name: keyof PropertyNameInputs;
  label: string;
  type: string;
  placeholder: string;
}
export interface IPropertyTextArea {
  name: keyof PropertyNameInputs;
  label: string;
  placeholder: string;
}
