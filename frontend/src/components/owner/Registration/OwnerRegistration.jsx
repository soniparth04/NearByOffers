import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const OwnerRegistration = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        shopName: "",
        password: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        latitude: "",
        longitude: "",
        category: "",
        openingHours: "",
        closingHours: "",
        addressline: "",
        openingDays: []
    });

    const [shopImage, setShopImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showBusinessHours, setShowBusinessHours] = useState(false);
    const [showOpeningDays, setShowOpeningDays] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState(localStorage.getItem("selectedAddress") || "");

    const handleOpenLocation = () => {
        localStorage.setItem("ownerFormData", JSON.stringify(formData));
        navigate('/select-location');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        // Step 1 validation
        const step1Missing = [];
        if (!formData.name) step1Missing.push("Name");
        if (!formData.phone) step1Missing.push("Phone");
        if (!formData.email) step1Missing.push("Email");
        if (!formData.password) step1Missing.push("Password");

        if (step1Missing.length > 0) {
            setLoading(false);
            setError(`missing in step 1: ${step1Missing.join(", ")}`);
            return;
        }

        // Step 2 validation
        const step2Missing = [];
        if (!formData.shopName) step2Missing.push("Shop Name");
        if (!formData.category) step2Missing.push("Category");
        if (!formData.openingHours) step2Missing.push("Opening Hours");
        if (!formData.closingHours) step2Missing.push("Closing Hours");
        if (!formData.openingDays) step2Missing.push("Opening Days");
        if (!formData.addressline) step2Missing.push("Shop Address");
        if (!address) step2Missing.push("Location Address");

        if (step2Missing.length > 0) {
            setLoading(false);
            setError(`Missing in step 2: ${step2Missing.join(", ")}`);
            return;
        }

        // Step 3 validation
        const step3Missing = [];
        if (!shopImage) step3Missing.push("Shop Image");
        if (!profileImage) step3Missing.push("Profile Image");

        if (step3Missing.length > 0) {
            setLoading(false);
            setError(`Missing in step 3: ${step3Missing.join(", ")}`);
            return;
        }

        // All steps valid → submit
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            data.append("address", address);
            if (shopImage) data.append("shopImage", shopImage);
            if (profileImage) data.append("profileImage", profileImage);

            const response = await axios.post(
                "http://localhost:5000/api/owner/owner-registration",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            );

            setError("");
            setSuccess("Owner registered successfully!");
            localStorage.removeItem("selectedAddressDetails");
            localStorage.removeItem("ownerFormData");
            console.log("success registration");
            setTimeout(() => navigate("/shop-owner-dashboard"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.log(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const storedForm = JSON.parse(localStorage.getItem("ownerFormData"));
        const storedDetails = JSON.parse(localStorage.getItem("selectedAddressDetails"));
        const locationSelected = localStorage.getItem("locationSelected");
        if (storedForm) {
            setFormData(prev => ({
                ...prev,
                ...storedForm
            }));
        }

        if (storedDetails) {
            setAddress(storedDetails.address || "");
            setFormData(prev => ({
                ...prev,
                city: storedDetails.city || "",
                state: storedDetails.state || "",
                country: storedDetails.country || "",
                pinCode: storedDetails.pinCode || "",
                latitude: storedDetails.latitude || "",
                longitude: storedDetails.longitude || ""
            }));
        }

        if (locationSelected === "true") {
            setStep(2);
            localStorage.removeItem("locationSelected");
        }
    }, []);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);


    return (
        <div className="flex flex-col items-center w-full bg-gradient-to-b from-blue-50 to-white min-h-screen px-2 sm:px-2 md:px-2 lg:px-2">


            {step === 1 && (
                <StepOne formData={formData} handleChange={handleChange} nextStep={nextStep} />

            )}
            {step === 2 && (
                <StepTwo formData={formData} setFormData={setFormData} handleChange={handleChange} nextStep={nextStep} showBusinessHours={showBusinessHours}
                    setShowBusinessHours={setShowBusinessHours} showOpeningDays={showOpeningDays} setShowOpeningDays={setShowOpeningDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} handleOpenLocation={handleOpenLocation} address={address} prevStep={prevStep} />
            )}
            {step === 3 && (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    {(error || success) && (
                        <div className={`mt-6 w-full max-w-md text-center px-4 py-3 rounded-md font-medium 
      ${error ? "bg-red-100 text-red-700 border border-red-300" : "bg-green-100 text-green-700 border border-green-300"}`}>
                            {error || success}
                        </div>
                    )}

                    <StepThree
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                        setShopImage={setShopImage}
                        setProfileImage={setProfileImage}
                        loading={loading}
                    />
                </div>

            )}

        </div>
    );
};




export default OwnerRegistration;
