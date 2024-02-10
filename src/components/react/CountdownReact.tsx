import { useEffect, useState } from "react";

const CountdownReact = () => {
    const targetDate = new Date("2024-05-11T13:00:00");

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = Number(targetDate) - Number(now);

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );

            return { days, hours, minutes };
        } else {
            return { days: 0, hours: 0, minutes: 0 };
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const units = [
        { label: "Tage", value: timeLeft.days },
        { label: "Stunden", value: timeLeft.hours },
        { label: "Minuten", value: timeLeft.minutes },
    ];

    return (
        <div className="mt-4 max-w-md mx-auto flex justify-around items-center">
            {units.map((unit, index) => (
                <div
                    key={index}
                    className="h-20 flex flex-col justify-around items-center"
                >
                    <span className="text-3xl countdown-item">
                        {unit.value}
                    </span>
                    <span className="font-yuliya text-3xl">{unit.label}</span>
                </div>
            ))}
        </div>
    );
};

export default CountdownReact;
