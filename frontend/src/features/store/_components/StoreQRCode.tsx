import { useRef } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TStore } from "@/features/store/Store.type";

const StoreQRCode = ({ store }: { store: TStore }) => {
  const inputEl = useRef(null);

  const downloadImage = () => {
    if (!inputEl.current) return;
    toPng(inputEl.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-store-qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-3">
          Tải mã QR cửa hàng
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div
          ref={inputEl}
          className={`max-w-[200px] bg-white rounded-xl w-full h-full flex flex-col justify-center items-center mx-auto px-1 py-3 border-2`}
        >
          <DialogHeader className="mb-6 flex justify-center items-center">
            <DialogTitle>Checkout our menu</DialogTitle>
            <DialogDescription>Quét mã QR để gọi món</DialogDescription>
          </DialogHeader>
          <QRCode
            value={`https://digimenu-frontend-customer.vercel.app/store/${store.id}`}
          />
        </div>
        <Button onClick={downloadImage}>Download Image</Button>
      </DialogContent>
    </Dialog>
  );
};

export default StoreQRCode;
