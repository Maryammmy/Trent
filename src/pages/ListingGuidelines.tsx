import { useListingGuidelinesAPI } from "@/services/conditionService";

function ListingGuidelines() {
  const { data } = useListingGuidelinesAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.listing_guidelines,
      }}
    />
  );
}

export default ListingGuidelines;
