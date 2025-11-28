import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Cpu, Printer } from "lucide-react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Loader } from "../components/Loader";
import AadhaarHeader from "../../public/images/image--001.jpg";
import Aadhaar from "../../public/images/image--002.jpg";
import Image from "../../public/images/image--003.jpg";
import CutLine from "../../public/images/image--008.jpg";
import Image2 from "../../public/images/image--009.jpg";
import Image3 from "../../public/images/image--010.jpg";
import VerticalCut from "../../public/images/image--004.jpg";
import Image4 from "../../public/images/image--005.jpg";
import Image5 from "../../public/images/image--006.jpg";
import Image6 from "../../public/images/image--013.jpg";
import Image7 from "../../public/images/image--015.jpg";

const AadharCardPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [adhaarData, setAdhaarData] = useState({
    previewImage: "",
    aadharNo: "",
    name: "",
    completeAddress: "",
    dob: format(new Date(), "dd/MM/yyyy"),
    gender: "",
    localLanguageName: "",
    localLanguageAddress: "",
    localLanguageGender: "",
    localLanguageAdr: "",
    localLanguageDob: "",
  });

  useEffect(() => {
    const fetchAadharDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("adhaar_store")
          .select("*")
          .eq("id", id);

        if (error) throw error;

        if (data) {
          setAdhaarData({
            ...adhaarData,
            previewImage: data[0].image_url,
            aadharNo: data[0].aadhaar_no,
            name: data[0].name,
            completeAddress: data[0].complete_address,
            dob: format(data[0].dob, "dd/MM/yyyy"),
            gender: data[0].gender,
            localLanguageName: data[0].local_language_name,
            localLanguageAddress: data[0].local_language_address,
            localLanguageGender: data[0].local_language_gender,
            localLanguageAdr: data[0].local_language_address_label,
            localLanguageDob: data[0].local_language_dob_label,
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAadharDetails();
  }, []);

  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  // if (loading) {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center gap-2.5">
  //       <Loader size="lg" />
  //       <div className="flex items-center">
  //         <span className="text-xl font-semibold text-slate-800">
  //           Cyberworld
  //         </span>
  //         <Cpu className="w-12 -translate-x-1 text-slate-800" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="font-['Arimo'] font-medium">
      <div className="flex justify-end mt-4 mr-4">
        <Button className="cursor-pointer" onClick={() => handlePrint()}>
          <Printer />
          <span>Print</span>
        </Button>
      </div>
      <div className="w-[450px] mx-auto mt-4 bg-red-400 px-2 py-1.5 rounded-md flex items-center gap-1.5">
        <AlertTriangle className="text-white size-5" />
        <p className="text-white text-sm text-center">
          Below document should not used for authorize system!
        </p>
      </div>
      {/* Main PDF Container */}
      <div
        ref={contentRef}
        className="w-[680px] h-[845px] border-2 border-black mx-auto my-[10%]"
      >
        <div className="flex">
          {/* Left Section */}
          <div className="w-[48.7%] border-r-2 border-black">
            {/* Top Section */}
            <div className="h-[500px]">
              <img
                src={AadhaarHeader}
                className="w-full"
                alt="Aadhaar Header"
              />
              <p className="text-xs text-center mt-1">
                नामांकन क्रम / Enrollment No:{" "}
                {adhaarData.aadharNo.slice(0, 4) +
                  " " +
                  adhaarData.aadharNo.slice(4, 8) +
                  " " +
                  adhaarData.aadharNo.slice(8, 12)}
              </p>

              <div className="flex">
                <div className="w-[15%] mt-[42px]">
                  <div className="clear-both"></div>
                </div>

                <div className="w-[146%] pl-[8%]">
                  <ul className="p-0 mt-1">
                    <li className="text-[10px] leading-[11px] list-none">To</li>
                    <li className="text-[10px] leading-[11px] list-none">
                      {adhaarData.localLanguageName}
                    </li>
                    <li className="text-[10px] leading-[11px] list-none">
                      {adhaarData.name}
                    </li>
                    <li className="text-[10px] leading-[11px] list-none">
                      {adhaarData.completeAddress}
                    </li>
                  </ul>
                  <div className="clear-both"></div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <div className="w-[26%] bg-[url('images/q.jpg')] bg-no-repeat bg-[length:50px] mt-[100px] pl-[50px] bg-center">
                  <div className="absolute mt-[-60px]">
                    <h5 className="m-0 font-normal text-xs">Signature Valid</h5>
                    <ul className="p-0 m-0">
                      <li className="text-[7px] leading-[8px] list-none">
                        Digitally signed by DS
                      </li>
                      <li className="text-[7px] leading-[8px] list-none">
                        UNIQUE IDENTIFICATION
                      </li>
                      <li className="text-[7px] leading-[8px] list-none">
                        AUTHORITY OF INDIA 03
                      </li>
                      <li className="text-[7px] leading-[8px] list-none">
                        Date: 24/07/2025 IST
                      </li>
                    </ul>
                  </div>
                  <div className="clear-both"></div>
                </div>

                <div className="w-[52%] text-right pl-[20px]">
                  <img
                    src="https://qrcode.tec-it.com/API/QRCode?data=%3C%3Fxml+version%3D%221.0%22+encoding%3D%22UTF-8%22%3F%3E%3CPrintLetterBarcodeData+uid%3D%224239+5687+2547%22+name%3D%22Adesh+Singh%22+gender%3D%22Male%22+dob%3D%2215%2F10%2F2003%22+co%3D%22Shyam+Singh%22+po%3D%22Madhuria%22+address%3D%22C%2FO+%3A+Shyam+Singh%2C+125%2C+Sashon%2C+Madhuria%2C+Prayagraj%2C+Uttar+Pradesh%2C+211011%22+pc%3D%22211011%22%2F%3E"
                    alt="QR Code"
                    className="w-[133px] pt-[32px]"
                  />
                  <div className="clear-both"></div>
                </div>
              </div>
            </div>

            {/* Middle Section */}
            <div className="h-[110px]">
              <img
                src={Aadhaar}
                className="w-full"
                alt="Aadhaar"
              />
              <h3 className="m-0 mb-1 text-center">
                <span className="border-b-0 font-bold">
                  {adhaarData.aadharNo.slice(0, 4) +
                    " " +
                    adhaarData.aadharNo.slice(4, 8) +
                    " " +
                    adhaarData.aadharNo.slice(8, 12)}
                </span>
              </h3>
              <img src={Image} className="w-full" alt="Image" />
            </div>

            {/* Bottom Section */}
            <div>
              <img
                src={CutLine}
                className="h-[8px] w-full"
                alt="Cut Line"
              />
              <div className="h-[178px] relative mt-[-11px]">
                <img
                  src={Image2}
                  className="w-full mt-1 pt-1"
                  alt="Image2"
                />
                <div className="flex mt-2.5">
                  <div className="w-[30%] px-[15px] pl-[24px]">
                    <img src={adhaarData.previewImage} alt="Uploaded Image" />
                  </div>
                  <div className="w-[68%]">
                    <ul className="m-0 mb-0">
                      <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                        {adhaarData.localLanguageName}
                      </li>
                      <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                        {adhaarData.name}
                      </li>
                      <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                        {" "}
                        {adhaarData.localLanguageDob} / DOB :{" "}
                        {adhaarData.dob}
                      </li>
                      <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                        {adhaarData.localLanguageGender}/{adhaarData.gender}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="m-0 text-center">
                <span className="border-b-0 font-bold">
                  {adhaarData.aadharNo.slice(0, 4) +
                    " " +
                    adhaarData.aadharNo.slice(4, 8) +
                    " " +
                    adhaarData.aadharNo.slice(8, 12)}
                </span>
              </h3>
              <img
                src={Image3}
                className="h-[23px] w-full"
                alt="Image3"
              />
            </div>
          </div>

          {/* Center Vertical Line */}
          <div className="float-left">
            <img
              src={VerticalCut}
              className="h-[841px] w-[10px]"
              alt="Vertical Cut"
            />
            <div className="clear-both"></div>
          </div>

          {/* Right Section */}
          <div className="w-[48.8%] border-l-2 border-black">
            {/* Top Section */}
            <div className="h-[500px]">
              <img src={Image4} className="w-full" alt="Image" />
              <img src={Image5} className="w-full" alt="Image" />
            </div>

            {/* Middle Section */}
            <div className="h-[110px]"></div>

            {/* Bottom Section */}
            <div>
              <img
                src={CutLine}
                className="h-[8px] w-full"
                alt="Cut Line"
              />
              <div className="h-[178px] relative mt-[-11px]">
                <img
                  src={Image6}
                  className="w-[332px] pl-[1px]"
                  alt="Image"
                />
                <div className="flex">
                  <div className="w-[64%] float-left max-h-[112px] mt-2">
                    <ul className="p-0 m-0 ml-[10px] mb-[8px]">
                      <li className="text-[10px] leading-[12px] list-none">
                        <span className="font-bold">
                          {adhaarData.localLanguageAdr}:
                        </span>
                      </li>
                      <li className="text-[10px] leading-[12px] list-none">
                        {adhaarData.localLanguageAddress}
                      </li>
                    </ul>
                    <ul className="p-0 m-0 ml-[10px] mb-[8px]">
                      <li className="text-[10px] leading-[12px] list-none">
                        <span className="font-bold">Address:</span>
                      </li>
                      <li className="text-[10px] leading-[12px] list-none">
                        {adhaarData.completeAddress}
                      </li>
                    </ul>
                  </div>
                  <div className="w-[31%] mt-3 mr-1 float-right">
                    <img
                      src="https://qrcode.tec-it.com/API/QRCode?data=%3C%3Fxml+version%3D%221.0%22+encoding%3D%22UTF-8%22%3F%3E%3CPrintLetterBarcodeData+uid%3D%224239+5687+2547%22+name%3D%22Adesh+Singh%22+gender%3D%22Male%22+dob%3D%2215%2F10%2F2003%22+co%3D%22Shyam+Singh%22+po%3D%22Madhuria%22+address%3D%22C%2FO+%3A+Shyam+Singh%2C+125%2C+Sashon%2C+Madhuria%2C+Prayagraj%2C+Uttar+Pradesh%2C+211011%22+pc%3D%22211011%22%2F%3E"
                      alt="QR Code"
                    />
                  </div>
                </div>
              </div>

              <h3 className="m-0 text-center">
                <span className="border-b-0 font-bold">
                  {adhaarData.aadharNo.slice(0, 4) +
                    " " +
                    adhaarData.aadharNo.slice(4, 8) +
                    " " +
                    adhaarData.aadharNo.slice(8, 12)}
                </span>
              </h3>
              <img
                src={Image7}
                className="h-[23px] w-full"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadharCardPage;
