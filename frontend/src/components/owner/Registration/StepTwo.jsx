import TimePicker12Hour from "./TimePicker";

const StepTwo = ({formData, setFormData, handleChange ,  nextStep ,  showBusinessHours, setShowBusinessHours, showOpeningDays, setShowOpeningDays, selectedDays, setSelectedDays,  handleOpenLocation, address, prevStep }) => {

    return (
          <div className="flex items-center justify-center min-h-screen w-full mb-4">
                    <div className="w-full max-w-sm px-2 space-y-5">
                        <div className="text-center mb-8 mt-20">
                            <h1 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">Great! You’re Almost There!
                            </h1>
                            <p className="text-gray-600 text-l">Let’s complete your business profile.
                            </p>
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100 ${formData.category === "" ? "text-gray-500" : "text-black"
                                    }`}
                                required
                            >
                                <option value="" className="text-gray-500">Select Category</option>
                                <option value="Restaurant" className="text-black">Restaurant</option>
                                <option value="Salon" className="text-black">Salon</option>
                                <option value="Retail" className="text-black">Retail</option>
                                <option value="Cafe" className="text-black">Cafe</option>
                                <option value="Gym" className="text-black">Gym</option>
                                <option value="Spa" className="text-black">Spa</option>
                                <option value="Electronics" className="text-black">Electronics</option>
                                <option value="Fashion" className="text-black">Fashion</option>
                                <option value="Grocery" className="text-black">Grocery</option>
                                <option value="Bakery" className="text-black">Bakery</option>
                                <option value="Pharmacy" className="text-black">Pharmacy</option>
                                <option value="Other" className="text-black">Other</option>
                            </select>
                        </div>
                        <div>
                            {!showBusinessHours ? (
                                <div
                                    onClick={() => setShowBusinessHours(true)}
                                    className="flex border items-center justify-between  px-4 py-3 rounded cursor-pointer"
                                >
                                    <span className={formData.openingHours && formData.closingHours ? "text-black-500" : "text-gray-500"}>
                                        {formData.openingHours && formData.closingHours
                                            ? `${formData.openingHours} - ${formData.closingHours}`
                                            : "Business Hours"}
                                    </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <label className="block mb-1 font-medium">Opening Time</label>
                                        <TimePicker12Hour
                                            value={formData.openingHours}
                                            onChange={(val) => setFormData({ ...formData, openingHours: val })}
                                        />
                                    </div>


                                    <div className="flex items-center gap-4">
                                        <label className="min-w-[100px] text-sm">Closing Time</label>
                                        <TimePicker12Hour
                                            value={formData.closingHours}
                                            onChange={(val) => setFormData({ ...formData, closingHours: val })}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-1 text-sm rounded hover:bg-blue-600"
                                        onClick={() => setShowBusinessHours(false)}
                                    >
                                        Done
                                    </button>

                                </div>
                            )}

                        </div>
                        <div >
                            {!showOpeningDays ? (
                                <div
                                    onClick={() => setShowOpeningDays(true)}
                                    className="flex border items-center justify-between px-4 py-3 rounded cursor-pointer"
                                >
                                    <span className={formData.openingDays.length > 0 ? "text-black-600" : "text-gray-500"}>
                                        {formData.openingDays.length > 0
                                            ? formData.openingDays.join(", ")
                                            : "Select Opening Days"}
                                    </span>
                                </div>

                            ) : (
                                <div className="space-y-2">
                                    <div className="flex gap-2 flex-wrap ml-8">
                                        {["Su", "M", "Tu", "We", "Th", "Fri", "Sa"].map((day, index) => {
                                            const isSelected = selectedDays.includes(day);
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDays(prev =>
                                                            isSelected
                                                                ? prev.filter(d => d !== day)
                                                                : [...prev, day]
                                                        );
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            openingDays: isSelected
                                                                ? prev.openingDays.filter(d => d !== day)
                                                                : [...prev.openingDays, day]
                                                        }));
                                                    }}
                                                    className={`w-10 ml-2 h-10 rounded-full border-2 text-sm font-semibold transition
                                ${isSelected
                                                            ? "bg-blue-500 text-white border-blue-500"
                                                            : "bg-transparent text-black-500 border-black-500"
                                                        }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowOpeningDays(false)}
                                        className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="addressline" placeholder="Shop address" value={formData.addressline} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>

                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input
                                type="text"
                                value={address}
                                placeholder="pin location from Google Map"
                                readOnly
                                onClick={handleOpenLocation}
                                className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
                            />
                        </div>

                        <div className="flex justify-between gap-2">
                            <button type="button" onClick={prevStep} className="w-full bg-gray-300 py-2 rounded">Back</button>
                            <button type="button" onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded">Next</button>
                        </div>
                    </div>
                </div>
    )
}

export default StepTwo;