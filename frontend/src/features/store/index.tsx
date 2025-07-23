import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Clock, Phone } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import StoreUpdateForm from "./_components/StoreUpdateForm";
import StoreQRCode from "./_components/StoreQRCode";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getStoreDetail } from "./_reducer/storeActions";

const StoreDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.store);
  //   const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    dispatch(getStoreDetail(id as string));
  }, [id]);

  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    // If the hour is less than 12, append "AM", else append "PM"
    const suffix = date.getUTCHours() < 12 ? "AM" : "PM";

    // If the hour is greater than 12, subtract 12 to convert to 12-hour format
    const formattedTime =
      date.toLocaleTimeString("en-US", options) + " " + suffix;

    return formattedTime;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (store)
    return (
      <div className={`w-full flex gap-3 mt-6`}>
        <div className="max-w-[320px] w-full flex justify-center items-center overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <img src={store.img_url} alt={store.name} className={``} />
          </AspectRatio>
        </div>
        <div className={`flex flex-col`}>
          <div
            className={`pt-0 pb-3 w-full flex flex-row justify-between items-center`}
          >
            <span className={`text-4xl`}>{store.name}</span>
            <StoreUpdateForm initialValue={store} />
          </div>
          <div className={`flex flex-col gap-2 mt-0 opacity-75`}>
            <p className={`flex gap-2`}>
              <MapPin />
              {store.address}
            </p>
            <p className={`flex gap-2`}>
              <Clock />
              {formatTime(store.open_time)} - {formatTime(store.close_time)}
            </p>
            <p className={`flex gap-2`}>
              <Phone />
              039.843.5344
            </p>
          </div>
          <StoreQRCode store={store} />
        </div>
      </div>
    );
};

export default StoreDetailPage;
