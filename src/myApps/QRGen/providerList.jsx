import React from 'react'
import PhonePay from './svgs/phone-pay.png';
import PayTm from './svgs/pay_tm.png';
import GooglePay from './svgs/g_pay.png';
import Option from './options'


export const providerList = (setProvider) => {
  return (
    <>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Provider
          </label>
          <div className="flex space-x-4">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                provider === "ptyes" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setProvider("ptyes")}
            >
              <img src={PhonePay} alt="Phone Pay"  className="mr-2" style={{width:"28px",height:"28px"}} />
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                provider === "oksbi" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setProvider("oksbi")}
            >
              <img src={PayTm} alt="GPay"  className="mr-2" style={{width:"28px",height:"28px"}} />
            </button>
          </div>
    </>
  )
}
