const AadharComponent = ({
    previewImage,
    aadharNo,
    name,
    fatherName,
    houseNo,
    streetLocality,
    postOffice,
    state,
    city,
    pincode,
    completeAddress,
    dob,
    gender,
    localLanguageName,
    localLanguageAddress,
    localLanguageGender,
    localLanguageAdr,
    localLanguageDob
}) => {
    return (
        <div className="font-['Arimo'] font-medium">
            {/* Main PDF Container */}
            <div className="w-[680px] h-[845px] border-2 border-black mx-auto my-[10%]">
                <div className="flex">
                    {/* Left Section */}
                    <div className="w-[48.7%] border-r-2 border-black">
                        {/* Top Section */}
                        <div className="h-[500px]">
                            <img
                                src="images/image--001.jpg"
                                className="w-full"
                                alt="Aadhaar Header"
                            />
                            <p className="text-xs text-center mt-1">
                                नामांकन क्रम / Enrollment No: {aadharNo.slice(0, 4) + " " + aadharNo.slice(4, 8) + " " + aadharNo.slice(8, 12)}
                            </p>

                            <div className="flex">
                                <div className="w-[15%] mt-[42px]">
                                    <div className="clear-both"></div>
                                </div>

                                <div className="w-[146%] pl-[8%]">
                                    <ul className="p-0 mt-1">
                                        <li className="text-[10px] leading-[11px] list-none">
                                            To
                                        </li>
                                        <li className="text-[10px] leading-[11px] list-none">
                                            {localLanguageName}
                                        </li>
                                        <li className="text-[10px] leading-[11px] list-none">
                                            {name}
                                        </li>
                                        <li className="text-[10px] leading-[11px] list-none">
                                            {completeAddress}
                                        </li>
                                    </ul>
                                    <div className="clear-both"></div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <div className="w-[26%] bg-[url('images/q.jpg')] bg-no-repeat bg-[length:50px] mt-[100px] pl-[50px] bg-center">
                                    <div className="absolute mt-[-60px]">
                                        <h5 className="m-0 font-normal text-xs">
                                            Signature Valid
                                        </h5>
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
                                src="images/image--002.jpg"
                                className="w-full"
                                alt="Aadhaar"
                            />
                            <h3 className="m-0 mb-1 text-center">
                                <span className="border-b-0 font-bold">
                                    {aadharNo.slice(0, 4) + " " + aadharNo.slice(4, 8) + " " + aadharNo.slice(8, 12)}
                                </span>
                            </h3>
                            <img
                                src="images/image--003.jpg"
                                className="w-full"
                                alt="Image"
                            />
                        </div>

                        {/* Bottom Section */}
                        <div>
                            <img
                                src="images/image--008.jpg"
                                className="h-[8px] w-full"
                                alt="Cut Line"
                            />
                            <div className="h-[178px] relative mt-[-11px]">
                                <img
                                    src="images/image--009.jpg"
                                    className="w-full mt-1 pt-1"
                                    alt="Image"
                                />
                                <div className="flex mt-2.5">
                                    <div className="w-[30%] px-[15px] pl-[24px]">
                                        <img
                                            src={previewImage}
                                            alt="Uploaded Image"
                                        />
                                    </div>
                                    <div className="w-[68%]">
                                        <ul className="m-0 mb-0">
                                            <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                                                {localLanguageName}
                                            </li>
                                            <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                                                {name}
                                            </li>
                                            <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                                                {" "}
                                                {localLanguageDob} / DOB : {dob}
                                            </li>
                                            <li className="text-[10px] leading-[11px] mb-[3.5px] list-none">
                                                {localLanguageGender}/{gender}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h3 className="m-0 text-center">
                                <span className="border-b-0 font-bold">
                                    {aadharNo.slice(0, 4) + " " + aadharNo.slice(4, 8) + " " + aadharNo.slice(8, 12)}
                                </span>
                            </h3>
                            <img
                                src="images/image--010.jpg"
                                className="h-[23px] w-full"
                                alt="Image"
                            />
                        </div>
                    </div>

                    {/* Center Vertical Line */}
                    <div className="float-left">
                        <img
                            src="images/image--004.jpg"
                            className="h-[841px] w-[10px]"
                            alt="Vertical Cut"
                        />
                        <div className="clear-both"></div>
                    </div>

                    {/* Right Section */}
                    <div className="w-[48.8%] border-l-2 border-black">
                        {/* Top Section */}
                        <div className="h-[500px]">
                            <img
                                src="images/image--005.jpg"
                                className="w-full"
                                alt="Image"
                            />
                            <img
                                src="images/image--006.jpg"
                                className="w-full"
                                alt="Image"
                            />
                        </div>

                        {/* Middle Section */}
                        <div className="h-[110px]"></div>

                        {/* Bottom Section */}
                        <div>
                            <img
                                src="images/image--008.jpg"
                                className="h-[8px] w-full"
                                alt="Cut Line"
                            />
                            <div className="h-[178px] relative mt-[-11px]">
                                <img
                                    src="images/image--013.jpg"
                                    className="w-[332px] pl-[1px]"
                                    alt="Image"
                                />
                                <div className="flex">
                                    <div className="w-[64%] float-left max-h-[112px] mt-2">
                                        <ul className="p-0 m-0 ml-[10px] mb-[8px]">
                                            <li className="text-[10px] leading-[12px] list-none">
                                                <span className="font-bold">
                                                    {localLanguageAdr}
                                                    :
                                                </span>
                                            </li>
                                            <li className="text-[10px] leading-[12px] list-none">
                                                {localLanguageAddress}
                                            </li>
                                        </ul>
                                        <ul className="p-0 m-0 ml-[10px] mb-[8px]">
                                            <li className="text-[10px] leading-[12px] list-none">
                                                <span className="font-bold">
                                                    Address:
                                                </span>
                                            </li>
                                            <li className="text-[10px] leading-[12px] list-none">
                                                {completeAddress}
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
                                    {aadharNo.slice(0, 4) + " " + aadharNo.slice(4, 8) + " " + aadharNo.slice(8, 12)}
                                </span>
                            </h3>
                            <img
                                src="images/image--015.jpg"
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

export default AadharComponent;
