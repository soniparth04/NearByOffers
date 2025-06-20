const StepThree = ({prevStep , handleSubmit,  setShopImage, setProfileImage, loading}) => {
    return (
        <div >
            <div className="space-y-4">
                <div className="text-center mb-8 mt-20">
                    <h1 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">
                        Just One Last Step!
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Upload images to finish setting up your store.
                    </p>
                </div>

                <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                    <label className="block text-sm font-medium mb-1">Profile Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setShopImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Shop Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                </div>
                <button type="button" onClick={prevStep} className="w-full bg-gray-300 py-2 rounded">Back</button>

                 <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full flex justify-center items-center bg-blue-500 text-white py-2 rounded transition ${
                        loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Registering...
                        </>
                    ) : (
                        'Register'
                    )}
                </button>
            </div>
        </div>
    )
}
export default StepThree;