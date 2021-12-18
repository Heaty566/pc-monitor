import * as React from "react";

interface PCCardProps {
        pcId: string;
        cpuName: string;
        usageRam: number;
        usageCpu: number;
        platformName: string;
}

const PCCard: React.FunctionComponent<PCCardProps> = ({ pcId, cpuName, platformName, usageCpu, usageRam }) => {
        const borderColor =
                usageRam < 0.6 && usageCpu < 0.6 ? "border-green-500" : usageRam < 0.8 && usageCpu < 0.8 ? "border-yellow-500" : "border-red-500";

        return (
                <li className={`col-span-1 bg-white rounded-lg shadow-lg border-2 ${borderColor}  p-4 divide-y divide-gray-200`}>
                        <div className="w-full flex items-center justify-between p-2 space-x-6">
                                <div className="flex-1 truncate space-y-2">
                                        <div className="flex items-center space-x-3">
                                                <h3 className="text-gray-900 text-sm font-medium truncate">{pcId}</h3>
                                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                        active
                                                </span>
                                        </div>
                                        <div className="">
                                                <h3 className="font-semibold">CPU</h3>
                                                <p className="text-gray-700 text-sm font-medium truncate">{cpuName}</p>
                                        </div>
                                        <div className="">
                                                <h3 className="font-semibold">Platform</h3>
                                                <p className="text-gray-700 text-sm font-medium truncate">{platformName}</p>
                                        </div>
                                        <div className="">
                                                <h3 className="font-semibold">Ram Load</h3>
                                                <p className="text-gray-700 text-sm font-medium truncate">
                                                        {(usageRam * 100).toLocaleString(undefined, {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                        })}
                                                        %
                                                </p>
                                        </div>
                                        <div className="">
                                                <h3 className="font-semibold">CPU Load</h3>
                                                <p className="text-gray-700 text-sm font-medium truncate">
                                                        {" "}
                                                        {(usageCpu * 100).toLocaleString(undefined, {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                        })}
                                                        %
                                                </p>
                                        </div>
                                </div>
                        </div>
                </li>
        );
};

export default PCCard;
