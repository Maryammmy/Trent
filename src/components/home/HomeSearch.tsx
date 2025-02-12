import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { useAppDispatch } from "../../store/hooks";
import { setIsSearchOpen } from "../../store/features/homeSearch/homeSearchSlice";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";
import SearchComponent from "./SearchComponent";

function HomeSearch() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={() => dispatch(setIsSearchOpen(true))}
        className="flex lg:hidden bg-white items-center gap-2 w-[250px] md:w-[500px] rounded-full py-2 px-5 border shadow hover:shadow-lg"
      >
        <Search />
        <p className="text-primary font-medium">{t("placeholder_search")}</p>
        {/* <Input
          type="search"
          className="w-full outline-none bg-transparent placeholder:text-primary placeholder:font-medium"
          placeholder={t("placeholder_search")}
        /> */}
      </Button>
      {/* <div className="hidden lg:block">
        <div className="flex text-sm items-end  justify-between bg-white rounded-lg w-[1000px] py-3 px-5 border shadow hover:shadow-lg">
          {homeSearch.map((item, index) => {
            const title = t(item.title);
            const text = t(item.text);

            return (
              <Button
                ref={title === t("destination") ? destinationButtonRef : null}
                onClick={() =>
                  title === t("destination") && handleDestinationToggle()
                }
                key={index}
                className={`px-2 font-medium  flex flex-col`}
              >
                <h2 className="pb-2 text-dark">{title}</h2>
                <div>
                  {text === t("add_guests") ? (
                    <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 h-10 rounded-md">
                      <p className="w-[90px] text-start">
                        {counter === 0
                          ? t("add_guests")
                          : counter === 1
                          ? `${counter} ${t("guest")}`
                          : `${counter} ${t("guests")}`}
                      </p>
                      <Counter
                        counter={counter}
                        increaseCounter={() => updateCounter(1)}
                        decreaseCounter={() => updateCounter(-1)}
                      />
                    </div>
                  ) : title === t("check_in") ? (
                    <DatePicker
                      showShortcuts={true}
                      useRange={true}
                      dateValue={startDateValue}
                      handleValueChange={handleStartValueChange}
                      className="h-10 bg-gray-100"
                    />
                  ) : title === t("check_out") ? (
                    <DatePicker
                      showShortcuts={true}
                      useRange={true}
                      dateValue={endDateValue}
                      handleValueChange={handleEndValueChange}
                      className="h-10 bg-gray-100"
                    />
                  ) : (
                    <p className=" bg-gray-100 px-4 h-10 rounded-md flex items-center">
                      {text}
                    </p>
                  )}
                </div>
              </Button>
            );
          })}
          <Button className="text-white font-medium bg-primary px-4 h-10 rounded-md">
            <span>{t("search")}</span>
          </Button>
        </div>
        <div className="relative" ref={destinationCardRef}>
          {isDestinationOpen && <DestinationCard />}
        </div>
      </div> */}
      <SearchComponent />
      <SearchModal />
    </>
  );
}

export default HomeSearch;
