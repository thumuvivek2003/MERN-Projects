import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Phone } from "lucide-react";
import { providerList } from "./providerList";

const UPIQRGenerator = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [includeAmount, setIncludeAmount] = useState(false);
  const [provider, setProvider] = useState("ybl");
  const [qrValue, setQRValue] = useState("");

  const handleIncludeAmount = () => {
    setIncludeAmount(!includeAmount);
  };

  const handleGenerate = () => {
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const upiString = `upi://pay?pa=${mobileNumber}@${provider}${
      includeAmount && amount ? `&am=${amount}` : ""
    }`;
    setQRValue(upiString);
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md mb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          UPI QR Generator
        </h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <input
            id="mobile"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter 10 digit mobile number"
            value={mobileNumber}
            onChange={(e) =>
              setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              checked={includeAmount}
              onChange={handleIncludeAmount}
              id="includeAmount"
              type="checkbox"
              className="peer sr-only"
            />
            <label for="includeAmount" className="hidden"></label>
            <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
          </label>
          <label className="ml-3 text-gray-700 font-medium cursor-pointer" for="includeAmount">
            Include Amount
          </label>
        </div>

        {includeAmount && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4">
          <providerList setProvider={setProvider}/>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleGenerate}
        >
          Generate QR Code
        </button>

        {qrValue && (
          <div className="mt-6 flex flex-col items-center">
            <QRCode value={qrValue} size={200} />

          </div>
        )}
      </div>
    </>
  );
};

export default UPIQRGenerator;
