import React, { useState } from "react";
import * as socketIo from "socket.io-client";
import PCCard from "./PCCard";

interface PCDto {
        pcId: string;
        cpuName: string;
        usageRam: number;
        usageCpu: number;
        platformName: string;
}

const clientIo = socketIo.connect(`${process.env.REACT_APP_SERVER_URL}/pc-monitor`, { path: "/socket.io" });
function App() {
        const [pcList, setPCList] = useState<Record<string, PCDto>>({});

        const handleOnGetData = (data: Record<string, PCDto>) => {
                setPCList(data);
        };

        React.useEffect(() => {
                clientIo.on("data", handleOnGetData);

                return () => {
                        clientIo.off("data", handleOnGetData);
                };
        }, []);

        return (
                <div className="App min-h-screen flex justify-center items-center p-4">
                        <div className="space-y-4">
                                <div className="font-bold">Current Time: {new Date().toLocaleString()}</div>
                                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {Object.keys(pcList).map((item) => {
                                                const pc = pcList[item];

                                                return (
                                                        <PCCard
                                                                key={pc.pcId}
                                                                cpuName={pc.cpuName}
                                                                pcId={pc.pcId}
                                                                usageCpu={pc.usageCpu}
                                                                usageRam={pc.usageRam}
                                                                platformName={pc.platformName}
                                                        />
                                                );
                                        })}
                                </ul>
                        </div>
                </div>
        );
}

export default App;
