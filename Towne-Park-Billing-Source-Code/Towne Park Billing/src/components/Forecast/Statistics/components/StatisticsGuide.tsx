import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface StatisticsGuideProps {
    isGuideOpen: boolean;
    toggleGuide: () => void;
    error: string | null;
}

export const StatisticsGuide: React.FC<StatisticsGuideProps> = ({
    isGuideOpen,
    toggleGuide,
    error
}) => {
    return (
        <>
            <Button variant="outline" onClick={toggleGuide} className="flex items-center gap-2 mb-2" data-qa-id="button-toggle-guide">
                <Info className="h-4 w-4" />
                {isGuideOpen ? "Hide Guide" : "Show Guide"}
                {isGuideOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {isGuideOpen && (
                <div className="space-y-4 p-4 border rounded-md bg-muted/20 mb-6">
                    <div>
                        <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                        <p>
                            This page allows you to enter and manage forecast data for your customer sites. You can view budget
                            values, enter forecast values, and compare with actual recorded values.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-1">Site Selection</h4>
                            <p className="text-sm text-muted-foreground">
                                Select a customer site from the dropdown to load its specific configuration and statistics.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Period Selection</h4>
                            <p className="text-sm text-muted-foreground">
                                Choose a month to view and edit data for all days in that month. Past periods are read-only.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Occupancy Input Type</h4>
                            <p className="text-sm text-muted-foreground">
                                Select whether to enter occupancy as a percentage or as the number of occupied rooms.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Budget vs Forecast Toggle</h4>
                            <p className="text-sm text-muted-foreground">
                                Use the "Show Budget" / "Show Forecast" button to toggle between viewing budget values and your forecast
                                entries.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Modified Values</h4>
                            <p className="text-sm text-muted-foreground">
                                Values that you've changed from the budget are highlighted in{" "}
                                <span className="text-blue-500 font-medium">blue</span>.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Actual Values</h4>
                            <p className="text-sm text-muted-foreground">
                                Historical actual values appear in <span className="text-orange-500 font-medium">orange</span> below
                                each input field for comparison.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Calculated Fields</h4>
                            <p className="text-sm text-muted-foreground">
                                Self Overnight, Valet Overnight, Occupancy/Rooms, and Revenue are calculated automatically based on your
                                inputs.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-1">Saving Data</h4>
                            <p className="text-sm text-muted-foreground">
                                Click the "Save Statistics" button to save your forecast data. This button is disabled for past periods.
                                <br />
                                <span className="text-blue-700 font-semibold">
                                    Editing and saving is only available in the <b>Daily</b> time period. Other views are read-only.
                                </span>
                            </p>
                        </div>
                    </div>

                    <Alert>
                        <AlertDescription>
                            <strong>Pro Tip:</strong> For the most accurate forecasts, start by reviewing the actual values (orange)
                            and budget values, then adjust your forecast accordingly.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    );
}; 