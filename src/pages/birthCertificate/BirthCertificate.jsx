import GovLogo from "../../../public/images/gov-up-logo.jpg"
import Form5 from "../../../public/images/form-5-logo.png"
import QRCode from "../../../public/images/qr-code.png"
import Signature from "../../../public/images/signature.png"
import SatyamevJayteyLogo from "../../../public/images/satyamev-jaytey-logo-2.png"
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Printer } from "lucide-react";

const BirthCertificate = () => {
  const { id } = useParams();
  const [birthCertificateData, setBirthCertificateData] = useState({
    name: "",
    gender: "",
    aadhaarNo: "",
    dob: format(new Date(), "dd/MM/yyyy"),
    placeOfBirth: "",
    motherName: "",
    fatherName: "",
    motherAadhaarNo: "",
    fatherAadhaarNo: "",
    parentAddressAtBirthTime: "",
    permanentAddress: "",
    registrationNo: "",
    registrationDate: "",
    remarks: "",
    government: "",
    hospital: "",
    registerFor: "",
    genderHindi: "",
    placeOfBirthHindi: "",
    parentAddressAtBirthTimeHindi: "",
    permanentAddressHindi: "",
    governmentHindi: "",
    hospitalHindi: "",
    registerForHindi: "",
  });

  useEffect(() => {
    const fetchBirthCertificateData = async () => {
      try {
        const { data, error } = await supabase
          .from("birth_certificate")
          .select("*")
          .eq("id", id);

        if (error) throw error;

        if (data) {
          setBirthCertificateData({
            name: data[0].name,
            gender: data[0].gender,
            aadhaarNo: data[0].aadhaarNo,
            dob: format(new Date(data[0].dob), "dd-MM-yyyy"),
            placeOfBirth: data[0].placeOfBirth,
            motherName: data[0].motherName,
            fatherName: data[0].fatherName,
            motherAadhaarNo: data[0].motherAadhaarNo,
            fatherAadhaarNo: data[0].fatherAadhaarNo,
            parentAddressAtBirthTime: data[0].parentAddressAtBirthTime,
            permanentAddress: data[0].permanentAddress,
            registrationNo: data[0].registrationNo,
            registrationDate: format(new Date(data[0].registrationDate), "dd-MM-yyyy"),
            remarks: data[0].remarks,
            government: data[0].government,
            hospital: data[0].hospital,
            registerFor: data[0].registerFor,
            genderHindi: data[0].genderHindi,
            placeOfBirthHindi: data[0].placeOfBirthHindi,
            parentAddressAtBirthTimeHindi: data[0].parentAddressAtBirthTimeHindi,
            permanentAddressHindi: data[0].permanentAddressHindi,
            governmentHindi: data[0].governmentHindi,
            hospitalHindi: data[0].hospitalHindi,
            registerForHindi: data[0].registerForHindi,
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBirthCertificateData();
  }, []);

  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <>
      <div>
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
      </div>

      <div className="min-h-screen bg-gray-100 flex justify-center py-10 font-time" >
        <div className="w-[794px] bg-white border-[2px] border-gray-300 p-1">

          {/* INNER BORDER */}
          <div className="border-[2px] border-gray-300 px-2.5 py-6 text-[13px] text-black leading-tight" ref={contentRef}>

            {/* HEADER LOGOS */}
            {/* <div className="grid grid-cols-3 items-start"> */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[100px] items-center pt-10">
                <p className="text-[11px]">क्रमांक 1</p>
                <p className="text-[11px]">S. No.1</p>
                <img src={GovLogo} className="w-16 mt-1" />
              </div>

              <div className="text-center">
                <img
                  src={SatyamevJayteyLogo}
                  className="w-6 mx-auto mb-1"
                />
                <div className="space-y-1.5">

                  <p className="text-blue-800 text-xs mt-4">{birthCertificateData.governmentHindi}</p>
                  <p className="font-bold uppercase text-blue-800">
                    {birthCertificateData.government}
                  </p>
                  <p className=" text-blue-800">
                    योजना एवं विकास विभाग
                  </p>
                  <p className="font-semibold uppercase text-blue-800">
                    DEPARTMENT OF PLANNING AND DEVELOPMENT
                  </p>
                  <p className=" text-blue-800">
                    {birthCertificateData.hospitalHindi}
                  </p>
                  <p className="font-semibold uppercase text-blue-800">
                    {birthCertificateData.hospital}
                  </p>
                </div>
              </div>

              <div className="pt-10 flex justify-end pr-2">
                <div className="flex flex-col">
                  <p className="text-[11px] pl-3">प्रपत्र 5</p>
                  <p className="text-[11px] pl-2.5">FORM5</p>
                  <img src={Form5} className="w-16 mt-1" />
                </div>
              </div>
            </div>

            {/* TITLE */}
            <div className="text-center mt-7">
              <p className="text-green-800">जन्म प्रमाण-पत्र</p>
              <p className="font-bold text-green-800 uppercase">
                BIRTH CERTIFICATE
              </p>
            </div>

            {/* ACT TEXT */}
            <p className="mt-4 text-[11px] [word-spacing:2px] text-justify font-medium">
              (जन्म और मृत्यु रजिस्ट्रेशन अधिनियम, 1969 की धारा 12/17 तथा {birthCertificateData.governmentHindi} जन्म और
              मृत्यु रजिस्ट्रेशन नियम 1999 के नियम 8/13 के अंतर्गत जारी किया गया)
            </p>
            <p className="mt-2 text-[12px] uppercase text-justify font-medium">
              (ISSUED UNDER SECTION 12/17 OF THE REGISTRATION OF BIRTHS AND DEATHS ACT,
              1969 AND RULE 8/13 OF THE {birthCertificateData.government} REGISTRATION OF BIRTHS & DEATHS RULES 1999)
            </p>

            {/* CERTIFICATION TEXT */}
            <p className="mt-2 text-[11px] [word-spacing:2px] text-justify font-medium">
              यह प्रमाणित किया जाता है कि निम्नलिखित सूचना जन्म के मूल लेख से ली गई है
              जो कि {birthCertificateData.registerForHindi}।
            </p>
            <p className="mt-2 text-[12px] uppercase text-justify font-medium ">
              THIS IS TO CERTIFY THAT THE FOLLOWING INFORMATION HAS BEEN TAKEN FROM THE
              ORIGINAL RECORD OF BIRTH WHICH IS THE REGISTER FOR {birthCertificateData.registerFor}.
            </p>

            {/* DETAILS GRID */}
            <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-5 text-xs">
              <div className="flex items-center gap-1 text-[11px]">
                <p>
                  <span className="font-semibold">
                    नाम
                  </span>
                  <span className="font-extrabold">
                    &nbsp;/ NAME:
                  </span>
                </p>
                <p className="mt-0.5 text-[11px]">{birthCertificateData.name}</p>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <p className="font-semibold">
                  <span className="font-semibold text-[11px]">
                    लिंग
                  </span>
                  <span className="font-bold">
                    &nbsp;/ SEX:
                  </span>
                </p>
                <p className="mt-0.5">{birthCertificateData.gender} / {birthCertificateData.genderHindi}</p>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <p >
                  <span className="font-semibold text-[11px]">
                    ई आईडी
                  </span>
                  <span className="font-bold">
                    &nbsp;/ EID:
                  </span>
                </p>
                <p className="mt-0.5">{birthCertificateData.aadhaarNo}</p>
              </div>

              <div />

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    जन्म तिथि
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ DATE OF BIRTH:
                  </span>
                </p>
                <p>{birthCertificateData.dob}</p>
                <p>TWENTY-THIRD-JULY-TWO THOUSAND SEVEN</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    जन्म स्थान
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ PLACE OF BIRTH:
                  </span>
                </p>
                <p>SADAR HOSPITAL AURANGABAD, AURANGABAD (NAGAR PARISHAD), AURANGABAD, BIHAR</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    माता का नाम
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ NAME OF MOTHER:
                  </span>
                </p>
                <p>{birthCertificateData.motherName}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    पिता का नाम
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ NAME OF FATHER:
                  </span>
                </p>
                <p>{birthCertificateData.fatherName}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    माता का आधार नंबर
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ AADHAAR NUMBER OF MOTHER:
                  </span>
                </p>
                <p>XXXX-XXXX-{birthCertificateData.motherAadhaarNo.slice(8, 12)}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    पिता का आधार नंबर
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ AADHAAR NUMBER OF FATHER:
                  </span>
                </p>
                <p>XXXX-XXXX-{birthCertificateData.fatherAadhaarNo.slice(8, 12)}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    बच्चे के जन्म के समय माता-पिता का पता
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ ADDRESS OF PARENTS AT THE TIME OF BIRTH OF THE CHILD:
                  </span>
                </p>
                <p>{birthCertificateData.parentAddressAtBirthTime} / {birthCertificateData.parentAddressAtBirthTimeHindi}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    माता-पिता का स्थायी पता
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ PERMANENT ADDRESS OF PARENTS:
                  </span>
                </p>
                <p>{birthCertificateData.permanentAddress} / {birthCertificateData.permanentAddressHindi}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    पंजीकरण संख्या
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ REGISTRATION NUMBER:
                  </span>
                </p>
                <p>{birthCertificateData.registrationNo}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    पंजीकरण की तिथि
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ DATE OF REGISTRATION:
                  </span>
                </p>
                <p>{birthCertificateData.registrationDate}</p>
              </div>

              <div className="flex flex-col gap-1 text-[11px]">
                <p>
                  <span className="font-semibold text-[10px]">
                    टिप्पणी (यदि कोई हो)
                  </span>
                  <span className="font-semibold">
                    &nbsp;/ REMARKS (IF ANY):
                  </span>
                </p>
                <p>{birthCertificateData.remarks}</p>
              </div>


            </div>

            {/* FOOTER */}
            <div className="mt-8 grid grid-cols-2">
              <div className="pt-6">
                <p className="text-[11px] font-semibold">
                  Updated On : 06-01-2026 01:08:44
                </p>
                <img src={QRCode} className="w-20 mt-2" />
                <p className="text-[11px] mt-1">
                  This QR code can be used to check the authenticity of the certificate
                </p>
              </div>

              <div className="text-center space-y-1">
                <img
                  src={Signature}
                  className="w-20 mx-auto mb-1"
                />
                <p className="text-[10px] font-semibold">
                  प्राधिकारी के हस्ताक्षर / SIGNATURE OF ISSUING AUTHORITY
                </p>
                <p className="text-[10px] text-blue-700">
                  रजिस्ट्रार (जन्म एवं मृत्यु)
                </p>
                <p className="text-[10px] text-blue-700">
                  Registrar (BIRTH & DEATH)
                </p>
                <p className="text-[10px] text-blue-700">
                  {birthCertificateData.hospitalHindi}
                </p>
                <p className="text-[10px] text-blue-700">
                  {birthCertificateData.hospital}
                </p>
              </div>
            </div>

            {/* FOOT NOTE */}
            <p className="mt-6 text-center text-[11px] font-semibold">
              “प्रत्येक जन्म एवं मृत्यु का पंजीकरण सुनिश्चित करें /
              ENSURE REGISTRATION OF EVERY BIRTH AND DEATH”
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthCertificate;
