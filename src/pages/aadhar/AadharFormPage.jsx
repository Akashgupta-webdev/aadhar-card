import { useContext, useEffect, useState } from "react";
import AadharCardPage from "./AadharCardPage";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import { uploadAadhaarImage } from "../../lib/uploadAadharImage";
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

export default function Homepage() {
  const { user } = useContext(UserContext);
  const [renderFormComponent, setRenderFormComponent] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [aadharNo, setAadharNo] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetLocality, setStreetLocality] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const [localLanguage, setLocalLanguage] = useState("");
  const [localLanguageName, setLocalLanguageName] = useState("");
  const [localLanguageAddress, setLocalLanguageAddress] = useState("");
  const [localLanguageGender, setLocalLanguageGender] = useState("");
  const [localLanguageDob, setLocalLanguageDob] = useState("");
  const [localLanguageAdr, setLocalLanguageAdr] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const imageURL = await uploadAadhaarImage(imageFile, user.id);

      const newAdhaarCardInfo = {
        user_id: user.id,
        aadhaar_no: aadharNo,
        name: name,
        complete_address: completeAddress,
        dob: dob,
        gender: gender,
        local_language_name: localLanguageName,
        local_language_address: localLanguageAddress,
        local_language_gender: localLanguageGender,
        local_language_address_label: localLanguageAdr,
        local_language_dob_label: localLanguageDob,
        image_url: imageURL,
      };

      const { data, error } = await supabase
        .from("adhaar_store")
        .insert([newAdhaarCardInfo]);

      if (error) {
        console.error("Error creating aadhar card:", error);
        alert("Error in creating aadhar card!");
        return;
      } else {
        navigate("/aadhar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setCompleteAddress(
      `C/O: ${fatherName && fatherName + ", "}${houseNo && houseNo + ", "}${
        streetLocality && streetLocality + ", "
      }${postOffice && postOffice + ", "}${state && state + ", "}${
        city && city + ", "
      }${pincode && pincode}`
    );
  }, [fatherName, houseNo, streetLocality, postOffice, state, city, pincode]);

  useEffect(() => {
    const translateFn = async () => {
      const translateAddress = await fetchTranslate(
        localLanguage,
        completeAddress
      );
      const translateName = await fetchTranslate(localLanguage, name);
      const translateAdr = await fetchTranslate(localLanguage, "address");
      const translateGender = await fetchTranslate(localLanguage, gender);
      const translateDob = await fetchTranslate(localLanguage, "date of birth");

      setLocalLanguageAddress(translateAddress);
      setLocalLanguageName(translateName);
      setLocalLanguageAdr(translateAdr);
      setLocalLanguageDob(translateDob);
      setLocalLanguageGender(translateGender);
    };

    if (localLanguage !== "") {
      translateFn();
    }
  }, [localLanguage]);

  const FormComponent = (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Aadhaar Information Form
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
                    htmlFor="aadharno"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Aadhar Card No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAadharNo(e.target.value)}
                    value={aadharNo}
                    id="aadharno"
                    name="aadharno"
                    maxLength="12"
                    placeholder="Enter 12-digit Aadhaar No"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
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
              </div>
            </div>

            {/* Address Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Address Details
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="houseno"
                    className="block text-sm font-medium text-gray-700"
                  >
                    House No{" "}
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setHouseNo(e.target.value)}
                    value={houseNo}
                    id="houseno"
                    name="houseno"
                    placeholder="House No"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="streetlocality"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setStreetLocality(e.target.value)}
                    value={streetLocality}
                    id="streetlocality"
                    name="streetlocality"
                    placeholder="Gali, Locality, Panchayat"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="vtcandpost"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Post Office <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPostOffice(e.target.value)}
                    value={postOffice}
                    id="vtcandpost"
                    name="vtcandpost"
                    placeholder="Post Office"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    id="state"
                    name="state"
                    placeholder="State"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    id="city"
                    name="city"
                    placeholder="City"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                    id="pincode"
                    name="pincode"
                    placeholder="Pin Code"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="txtSource"
                  className="block text-sm font-medium text-gray-700"
                >
                  Complete Address
                </label>
                <textarea
                  id="txtSource"
                  value={completeAddress}
                  name="address"
                  rows="3"
                  placeholder="Auto-filled address"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Details
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
                    htmlFor="genderlocal"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender (Local)
                  </label>
                  <input
                    value={localLanguageGender}
                    type="text"
                    id="genderlocal"
                    name="genderlocal"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="dobregional"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DOB (Local)
                  </label>
                  <input
                    value={localLanguageDob}
                    type="text"
                    id="dobregional"
                    name="dobregional"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="addrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address (Local)
                  </label>
                  <input
                    value={localLanguageAdr}
                    type="text"
                    id="addrl"
                    name="addrl"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Document Upload
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="imgInp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="imgInp"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="imgInp"
                            name="imagefile"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 flex justify-center">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-48 w-auto rounded-md border border-gray-200 object-contain"
                    />
                  ) : (
                    <div className="h-48 w-full flex items-center justify-center bg-gray-100 rounded-md border border-gray-200 text-gray-400">
                      Image Preview
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Local Language Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Local Language Details
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="language"
                    onChange={(e) => {
                      setLocalLanguage(e.target.value);
                    }}
                    value={localLanguage}
                    name="language"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="hi">Hindi</option>
                    <option value="pa">Punjabi</option>
                    <option value="gu">Gujarati</option>
                    <option value="mr">Marathi</option>
                    <option value="ta">Tamil</option>
                    <option value="kn">Kannada</option>
                    <option value="bn">Bengali</option>
                    <option value="te">Telugu</option>
                    <option value="or">Oriya</option>
                    <option value="sd">Sindhi</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="name_regional"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name (Local) <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={localLanguageName}
                    onChange={(e) => setLocalLanguageName(e.target.value)}
                    type="text"
                    id="name_regional"
                    name="namelocal"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="txtTarget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address (Local) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={localLanguageAddress}
                  onChange={(e) => setLocalLanguageAddress(e.target.value)}
                  id="txtTarget"
                  name="addresslocal"
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
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
        </div>
      </div>
    </div>
  );

  return renderFormComponent ? (
    FormComponent
  ) : (
    <AadharCardPage
      previewImage={previewImage}
      aadharNo={aadharNo}
      name={name}
      fatherName={fatherName}
      houseNo={houseNo}
      streetLocality={streetLocality}
      postOffice={postOffice}
      state={state}
      city={city}
      pincode={pincode}
      completeAddress={completeAddress}
      dob={dob}
      gender={gender}
      localLanguageName={localLanguageName}
      localLanguageAddress={localLanguageAddress}
      localLanguageGender={localLanguageGender}
      localLanguageAdr={localLanguageAdr}
      localLanguageDob={localLanguageDob}
    />
  );
}
