import { useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";

const fetchTranslate = async (lang, text) => {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(
            text
        )}`;

        const response = await fetch(url);

        const responseText = await response.json();

        return responseText[0][0][0];
    } catch (error) {
        console.error(error);
    }
};

function generateRegistrationNo(prefix = 'B') {
    // 1. Get current date/time components
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0');

    // 2. Generate a random numeric suffix (e.g., 7 digits)
    const randomSuffix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');

    // 3. Combine parts
    return `${prefix}${timestamp}${randomSuffix}`;
}

export default function BirthCertificateFormPage() {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [aadhaarNo, setAadhaarNo] = useState("");
    const [dob, setDob] = useState(new Date());
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [motherName, setMotherName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherAadhaarNo, setMotherAadhaarNo] = useState("");
    const [fatherAadhaarNo, setFatherAadhaarNo] = useState("");
    const [parentAddressAtBirthTime, setParentAddressAtBirthTime] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [registrationDate, setRegistrationDate] = useState(new Date());
    const [remarks, setRemarks] = useState();
    const [government, setGoverment] = useState("");
    const [hospital, setHospital] = useState("");
    const [registerFor, setRegisterFor] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const [
                translateGender,
                translatePlaceOfBirth,
                translateParentAddressAtBirthTime,
                translatePermanentAddress,
                translateGovernment,
                translateHospital,
                translateRegisterFor
            ] = await convertIntoHindi();

            const birthCertificate = {
                user_id: user.id,
                name: name,
                gender: gender,
                aadhaarNo: aadhaarNo,
                dob: dob,
                placeOfBirth: placeOfBirth,
                motherName: motherName,
                fatherName: fatherName,
                motherAadhaarNo: motherAadhaarNo,
                fatherAadhaarNo: fatherAadhaarNo,
                parentAddressAtBirthTime: parentAddressAtBirthTime,
                permanentAddress: permanentAddress,
                registrationNo: generateRegistrationNo(),
                registrationDate: registrationDate,
                remarks: remarks,
                government: government,
                hospital: hospital,
                genderHindi: translateGender,
                placeOfBirthHindi: translatePlaceOfBirth,
                parentAddressAtBirthTimeHindi: translateParentAddressAtBirthTime,
                permanentAddressHindi: translatePermanentAddress,
                governmentHindi: translateGovernment,
                hospitalHindi: translateHospital,
                registerFor: registerFor,
                registerForHindi: translateRegisterFor
            };

            const { data, error } = await supabase
                .from("birth_certificate")
                .insert([birthCertificate]);

            if (error) {
                console.error("Error creating birth certificate:", error);
                alert("Error in creating birth certificate!");
                return;
            } else {
                navigate("/birth-certificate");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const convertIntoHindi = async () => {
        const [
            translateGender,
            translatePlaceOfBirth,
            translateParentAddressAtBirthTime,
            translatePermanentAddress,
            translateGovernment,
            translateHospital,
            translateRegisterFor
        ] = await Promise.all([
            fetchTranslate("hi", gender),
            fetchTranslate("hi", placeOfBirth),
            fetchTranslate("hi", parentAddressAtBirthTime),
            fetchTranslate("hi", permanentAddress),
            fetchTranslate("hi", government),
            fetchTranslate("hi", hospital),
            fetchTranslate("hi", registerFor),
        ]);

        return [
            translateGender,
            translatePlaceOfBirth,
            translateParentAddressAtBirthTime,
            translatePermanentAddress,
            translateGovernment,
            translateHospital,
            translateRegisterFor
        ]
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Birth Certificate Form
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Please fill in your details accurately
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        id="name"
                                        name="name"
                                        placeholder="Example: Raju Kumar"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                        value={gender}
                                        id="gender"
                                        name="gender"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="dobadhar"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Date of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        onChange={(e) => setDob(e.target.value)}
                                        value={dob}
                                        type="date"
                                        id="dobadhar"
                                        name="dobadhar"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="placeOfBirth"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Place of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="placeOfBirth"
                                        value={placeOfBirth}
                                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                                        name="placeOfBirth"
                                        rows="3"
                                        placeholder="Address..."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="mothername"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mother's Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setMotherName(e.target.value)}
                                        value={motherName}
                                        id="mothername"
                                        name="mothername"
                                        placeholder="Example: Anjali Singh"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="fathername"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Father's Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFatherName(e.target.value)}
                                        value={fatherName}
                                        id="fathername"
                                        name="fathername"
                                        placeholder="Example: Shyam Singh"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="motheraadharno"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mother Aadhaar No. <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setMotherAadhaarNo(e.target.value)}
                                        value={motherAadhaarNo}
                                        id="motheraadharno"
                                        name="motheraadharno"
                                        maxLength="12"
                                        placeholder="Enter 12-digit Aadhaar No"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="fatheraadhaarno"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Father Aadhaar No. <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFatherAadhaarNo(e.target.value)}
                                        value={fatherAadhaarNo}
                                        id="fatheraadhaarno"
                                        name="fatheraadhaarno"
                                        maxLength="12"
                                        placeholder="Enter 12-digit Aadhaar No"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="parentaddressatbirthtime"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Parent Address At Birth Time <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="parentaddressatbirthtime"
                                        value={parentAddressAtBirthTime}
                                        onChange={(e) => setParentAddressAtBirthTime(e.target.value)}
                                        name="parentaddressatbirthtime"
                                        rows="3"
                                        placeholder="Address..."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                                    />
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="permanentaddressofparent"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Parents Permanent Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="permanentaddressofparent"
                                        value={permanentAddress}
                                        onChange={(e) => setPermanentAddress(e.target.value)}
                                        name="permanentaddressofparent"
                                        rows="3"
                                        placeholder="Address..."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="dateofregistration"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Date of Registration <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        onChange={(e) => setRegistrationDate(e.target.value)}
                                        value={registrationDate}
                                        type="date"
                                        id="dateofregistration"
                                        name="dateofregistration"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="remarks"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Remarks <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="remarks"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        name="remarks"
                                        rows="3"
                                        placeholder="Remarks..."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                                    />
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="government"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Select Government <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            setGoverment(e.target.value);
                                        }}
                                        value={government}
                                        id="government"
                                        name="government"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Government</option>
                                        <option value="Government Of Bihar">Government Of Bihar</option>
                                        <option value="Goverment Of Uttar Pradesh">Goverment Of Uttar Pradesh</option>
                                    </select>
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="hospital"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Select Hospital <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            setHospital(e.target.value);
                                        }}
                                        value={hospital}
                                        id="hospital"
                                        name="hospital"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Hospital</option>
                                        <option value="DISTRICT MAHILA HOSPITAL">DISTRICT MAHILA HOSPITAL</option>
                                        <option value="GRAM PANCHAYAT AJGRA OF TAHSIL LALGANJ">GRAM PANCHAYAT AJGRA OF TAHSIL LALGANJ</option>
                                        <option value="GRAM PANCHAYAT GAZI MAHUAVAN OF TAHSIL LALGANJ">GRAM PANCHAYAT GAZI MAHUAVAN OF TAHSIL LALGANJ</option>
                                        <option value="GRAM PANCHAYAT TELIYAHI OF TAHSIL LALGANJ">GRAM PANCHAYAT TELIYAHI OF TAHSIL LALGANJ</option>
                                    </select>
                                </div>

                                <div className="mt-4 col-span-2">
                                    <label
                                        htmlFor="registerFor"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Register For <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            setRegisterFor(e.target.value);
                                        }}
                                        value={registerFor}
                                        id="registerFor"
                                        name="registerFor"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select Register For:</option>
                                        <option value="DISTRICT MAHILA HOSPITAL, PRATAPGARH OF TAHSIL/BLOCK PRATAPGARH OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA">DISTRICT MAHILA HOSPITAL, PRATAPGARH OF TAHSIL/BLOCK PRATAPGARH OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA</option>
                                        <option value="GRAM PANCHAYAT AJGRA OF TAHSIL LALGANJ / BLOCK LAXMANPUR OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA">GRAM PANCHAYAT AJGRA OF TAHSIL LALGANJ / BLOCK LAXMANPUR OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA</option>
                                        <option value="GRAM PANCHAYAT GAZI MAHUAVAN OF TAHSIL LALGANJ / BLOCK LAXMANPUR OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA">GRAM PANCHAYAT GAZI MAHUAVAN OF TAHSIL LALGANJ / BLOCK LAXMANPUR OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA</option>
                                        <option value="GRAM PANCHAYAT TELIYAHI OF TAHSIL LALGANJ / BLOCK LAXMANPUR OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA">GRAM PANCHAYAT TELIYAHI OF TAHSIL LALGANJ / BLOCK LAXMANPUR OF DISTRICT PRATAPGARH OF STATE/UNION TERRITORY OF UTTAR PRADESH, INDIA</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        {/* Submit Section */}
                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                            <a
                                href="https://www.google.com/intl/sa/inputtools/try/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Open Google Input Tools
                            </a>
                            <button
                                type="submit"
                                name="savedataauto"
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit Form
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </div >
    );


}
