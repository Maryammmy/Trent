import { useContentGuidelinesAPI } from "@/services/conditionService";

function ContentGuidelines() {
  const { data } = useContentGuidelinesAPI();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.data?.data?.guidelines,
      }}
    />
  );
}

export default ContentGuidelines;
