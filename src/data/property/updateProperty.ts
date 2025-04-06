import {
  IPropertyInput,
  IPropertyTextArea,
} from "@/interfaces/property/updateProperty";

export const propertyInputsData: IPropertyInput[] = [
  {
    name: "city_en",
    label: "city_in_english",
    type: "text",
    placeholder: "city_for_property_placeholder_en",
  },
  {
    name: "city_ar",
    label: "city_in_arabic",
    type: "text",
    placeholder: "city_for_property_placeholder_ar",
  },
  {
    name: "compound_en",
    label: "compound_in_english",
    type: "text",
    placeholder: "compound_name_for_property_placeholder_en",
  },
  {
    name: "compound_ar",
    label: "compound_in_arabic",
    type: "text",
    placeholder: "compound_name_for_property_placeholder_ar",
  },
  {
    name: "address_en",
    label: "address_in_english",
    type: "text",
    placeholder: "address_placeholder_en",
  },
  {
    name: "address_ar",
    label: "address_in_arabic",
    type: "text",
    placeholder: "address_placeholder_ar",
  },
  {
    name: "floor_en",
    label: "floor_in_english",
    type: "text",
    placeholder: "floor_placeholder_en",
  },
  {
    name: "floor_ar",
    label: "floor_in_arabic",
    type: "text",
    placeholder: "floor_placeholder_ar",
  },
  {
    name: "maps_url",
    label: "google_maps_url",
    type: "text",
    placeholder: "enter_google_maps_url_placeholder",
  },
  {
    name: "beds_count",
    label: "beds_count",
    type: "text",
    placeholder: "enter_beds",
  },
  {
    name: "bathrooms_count",
    label: "bathrooms_count",
    type: "text",
    placeholder: "enter_bathroom",
  },
  {
    name: "guest_count",
    label: "guest_count",
    type: "text",
    placeholder: "enter_guest_limit",
  },
  {
    name: "sqft",
    label: "property_sqft",
    type: "text",
    placeholder: "enter_property_sqft_placeholder",
  },
  {
    name: "title_en",
    label: "title_in_english",
    type: "text",
    placeholder: "title_for_property_placeholder_en",
  },
  {
    name: "title_ar",
    label: "title_in_arabic",
    type: "text",
    placeholder: "title_for_property_placeholder_ar",
  },
  {
    name: "min_days",
    label: "min_days",
    type: "text",
    placeholder: "min_days_placeholder",
  },
  {
    name: "max_days",
    label: "max_days",
    type: "text",
    placeholder: "max_days_placeholder",
  },
  {
    name: "price",
    label: "price",
    type: "text",
    placeholder: "enter_price_placeholder",
  },
  {
    name: "security_deposit",
    label: "security_deposit",
    type: "text",
    placeholder: "enter_security_deposit_placeholder",
  },
];
export const propertyTextAreasData: IPropertyTextArea[] = [
  {
    name: "description_en",
    label: "desc_in_english",
    placeholder: "desc_for_property_placeholder_en",
  },
  {
    name: "description_ar",
    label: "desc_in_arabic",
    placeholder: "desc_for_property_placeholder_ar",
  },
  {
    name: "guest_rules_en",
    label: "guest_rules_in_english",
    placeholder: "guest_rules_placeholder_en",
  },
  {
    name: "guest_rules_ar",
    label: "guest_rules_in_arabic",
    placeholder: "guest_rules_placeholder_ar",
  },
];
