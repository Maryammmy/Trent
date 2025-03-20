import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface IHostingContext {
  selectedImages: File[];
  setSelectedImages: Dispatch<SetStateAction<File[]>>;
  selectedVideo: File;
  setSelectedVideo: Dispatch<SetStateAction<File>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const HostingContext = createContext({} as IHostingContext);
const HostingContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File>(new File([], ""));
  return (
    <HostingContext.Provider
      value={{
        selectedImages,
        setSelectedImages,
        selectedVideo,
        setSelectedVideo,
      }}
    >
      {children}
    </HostingContext.Provider>
  );
};

export default HostingContextProvider;
