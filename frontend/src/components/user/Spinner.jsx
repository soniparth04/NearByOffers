import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bell } from "lucide-react";
import arrow from "../../assets/spinner/arrow.png";
import playbutton from "../../assets/spinner/playbutton.png";

Chart.register(ArcElement, ChartDataLabels);

const Spinner = () => {
    const { ownerId, shopName } = useParams();
    const [segments, setSegments] = useState([]);
    const [currentOffer, setCurrentOffer] = useState("Spin the wheel!");
    const [showCoupon, setShowCoupon] = useState(false);
    const [wonOffer, setWonOffer] = useState("");
    const wheelRef = useRef(null);
    const navigate = useNavigate();

    const chartRef = useRef(null); // Chart reference

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/spinner/${ownerId}`, { withCredentials: true })
            .then(response => {
                setSegments(response.data.coupons);
                setCanSpin(response.data.canSpin); // 🔹 Set spinner active/inactive
                setTimeout(() => {
                    if (chartRef.current) {
                        chartRef.current.update();
                    }
                }, 500);
            })
            .catch(error => console.error("Error fetching spinner data", error));
    }, [ownerId, shopName]);


    const handleViewOffers = () => {
        navigate(`/user-offers/${shopName}/${ownerId}`);
    };

    const segmentLabels = segments.map(segment => segment.label);
    const segmentColors = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#8E44AD", "#FF33A1"];

    const data = {
        labels: segmentLabels,
        datasets: [{
            backgroundColor: segmentColors.slice(0, segmentLabels.length),
            data: Array(segmentLabels.length).fill(1),
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
                color: "#000",
                font: { size: 10 },
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return label.length > 14 ? label.substring(0, 15) + "..." : label;
                },
                anchor: "center",
                align: "center",
                rotation: (context) => {
                    let angle = context.chart.getDatasetMeta(0).data[context.dataIndex].startAngle +
                        context.chart.getDatasetMeta(0).data[context.dataIndex].endAngle;
                    angle = (angle / 2) * (180 / Math.PI);
                    return angle > 90 && angle < 270 ? angle + 180 : angle;
                },
                textAlign: "center",
            }
        }
    };


    const [canSpin, setCanSpin] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);

    // // Check cooldown on mount
    // useEffect(() => {
    //     const checkCooldown = async () => {
    //         try {
    //             const response = await fetch("http://localhost:5000/api/user/spin", {
    //                 method: "POST",
    //                 credentials: "include"
    //             });

    //             const data = await response.json();
    //             if (data.cooldown) {
    //                 setCanSpin(false);
    //                 startCountdown(data.timeLeftMs);
    //             }
    //         } catch (err) {
    //             console.error("Cooldown check failed:", err);
    //         }
    //     };
    //     checkCooldown();
    // }, []);

    const startCountdown = (initialTimeLeftMs) => {
        let timeLeftMs = initialTimeLeftMs;

        const interval = setInterval(() => {
            timeLeftMs -= 1000;
            setTimeLeft(Math.ceil(timeLeftMs / 1000));

            if (timeLeftMs <= 0) {
                clearInterval(interval);
                setCanSpin(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    };


    const handleSpin = async () => {
        try {
            // // 1. Check if spinning is allowed
            // const checkResponse = await fetch('http://localhost:5000/api/user/spin', {
            //     method: 'POST',
            //     credentials: 'include'
            // });

            // const checkData = await checkResponse.json();

            // if (checkResponse.status === 403) {
            //     const secondsLeft = Math.ceil(checkData.timeLeftMs / 1000);
            //     alert(`Please wait ${secondsLeft} seconds`);
            //     return;
            // }

            if (segments.length === 0) return alert("No offers available!");

            // 2. Start spin animation
            const totalSegments = segmentLabels.length;
            const segmentAngle = 360 / totalSegments;
            const randomSegmentIndex = Math.floor(Math.random() * totalSegments);
            const randomOffset = Math.random() * segmentAngle;
            const winningAngle = (randomSegmentIndex * segmentAngle) + randomOffset + 1800;

            let startAngle = 0;
            const duration = Math.floor(Math.random() * (8000 - 4000 + 1)) + 4000;
            const startTime = Date.now();

            const animateSpin = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easing = 1 - Math.pow(1 - progress, 3);
                const currentAngle = startAngle + easing * (winningAngle - startAngle);

                if (wheelRef.current) {
                    wheelRef.current.style.transform = `rotate(${currentAngle}deg)`;
                }

                if (progress < 1) {
                    requestAnimationFrame(animateSpin);
                } else {
                    // 3. When animation completes:
                    const finalAngle = (winningAngle % 360);
                    const correctedIndex = Math.floor((360 - finalAngle) / segmentAngle) % totalSegments;
                    const selectedOffer = segmentLabels[correctedIndex];

                    setWonOffer(selectedOffer);
                    setShowCoupon(true);

                    // 4. Only NOW confirm the spin
                    // fetch('http://localhost:5000/api/user/confirm-spin', {
                    //     method: 'POST',
                    //     credentials: 'include'
                    // }).then(() => {
                    //     setCanSpin(false);
                    //     startCountdown(60 * 1000); // Start 1 minute countdown
                    // });

                    claimOffer(selectedOffer);
                }
            };

            requestAnimationFrame(animateSpin);

        } catch (error) {
            console.error("Spin error:", error);
            alert("Failed to spin. Please try again.");
        }
    };

    // const claimOffer = async (offerLabel) => {
    //     try {
    //         if (!ownerId) {
    //             alert("Owner ID is missing. Please use the correct link.");
    //             return;
    //         }

    //         const response = await axios.post(
    //             `http://localhost:5000/api/user/claim-offer/${ownerId}`,
    //             { offerLabel },
    //             { withCredentials: true }
    //         );

    //     } catch (error) {
    //         console.error("Error claiming offer:", error);
    //         alert("Failed to claim the offer. Please try again.");
    //     }
    // };

    return (
        <div>
            {segments.length < 6 ? (
                <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow text-center text-lg">
                    Spinner is deactivated by shop owner.
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-indigo-800">
                    <button onClick={handleViewOffers} className="absolute top-5 right-5 text-white text-3xl">
                        <Bell size={28} />
                    </button>
                    <div className="text-3xl md:text-5xl font-bold text-gray-900 mb-[40px]">
                        {currentOffer}
                    </div>
                    <div className="relative w-72 h-72 flex items-center justify-center">
                        <img src={arrow} className="rotate-180 h-16 absolute top-[-30px] z-10" />
                        <div ref={wheelRef} className="relative w-full h-full">
                            <Pie ref={chartRef} data={data} options={options} />

                        </div>
                        <button

                            className="absolute w-16 h-16  font-bold uppercase rounded-full shadow-lg transition"
                        >
                            <img src={playbutton} />
                        </button>
                    </div>
                    {showCoupon && (
                        <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-bold">Congratulations!</h3>
                            <p className="text-gray-700">You won: {wonOffer}!</p>
                        </div>
                    )}

                    {!canSpin && (
                        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg shadow">
                            Spinner is inactive. Minimum 6 offers are required to activate it.
                        </div>
                    )}

                    <button
                        onClick={handleSpin}
                        disabled={!canSpin}
                        className={`${canSpin
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-400 cursor-not-allowed'
                            } text-white text-2xl font-bold px-8 py-3 rounded-full mt-10`}
                    >
                        {canSpin ? 'SPIN' : 'Not Enough Offers'}
                    </button>

                </div>
            )}
        </div>
    );
};

export default Spinner;
