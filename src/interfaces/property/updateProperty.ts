import { PropertyInputs, PropertyTextArea } from "@/types";

export interface IPropertyInput {
  name: keyof PropertyInputs;
  label: string;
  type: string;
  placeholder: string;
}
export interface IPropertyTextArea {
  name: keyof PropertyTextArea;
  label: string;
  placeholder: string;
}
export interface ISelectedImage {
  file: File;
  url: string;
}
