import { routes } from "@/authConfig";
import OtherExpenses from "@/components/Forecast/OtherExpenses/OtherExpenses";
import OtherRevenue from "@/components/Forecast/OtherRevenue/OtherRevenue";
import ParkingRateForm from "@/components/Forecast/ParkingRates/ParkingRates";
import PayrollForecast from "@/components/Forecast/Payroll/PayrollForecast";
import SidebarContainer from "@/components/Forecast/SidebarContainer";
import React, { useRef } from "react";
import SiteStatisticsForm from "@/components/Forecast/Statistics/Statistics";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useCustomer } from "@/contexts/CustomerContext";
import { Customer, TimeRangeType } from "@/lib/models/Statistics";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const PARKING_RATE_GUIDE_STORAGE_KEY = 'isParkingRateGuideExpanded';
const STATISTICS_GUIDE_STORAGE_KEY = 'isStatisticsGuideOpen';
const PAYROLL_GUIDE_STORAGE_KEY = 'isPayrollGuideOpen';
const OTHER_REVENUE_GUIDE_STORAGE_KEY = 'isOtherRevenueGuideOpen';

export const Forecasts = () => {
    const { userRoles } = useAuth();
    const { selectedCustomer, setSelectedCustomerById } = useCustomer();
    
    const [activeTab, setActiveTab] = useState<string>("statistics");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSite, setSelectedSite] = useState<string>("");
    const [totalRooms, setTotalRooms] = useState<number | undefined>(undefined);

    const [startingMonth, setStartingMonth] = useState<string>(new Date().toISOString().slice(0, 7));
    const [timePeriod, setTimePeriod] = useState<TimeRangeType>(TimeRangeType.DAILY);
    const [comparison, setComparison] = useState<string>("Budget");

    // Track statistics loading state for sidebar disabling
    const [isStatisticsLoading, setIsStatisticsLoading] = useState(false);
    const [isParkingRatesLoading, setIsParkingRatesLoading] = useState(false);
    const [isPayrollLoading, setIsPayrollLoading] = useState(false);
    const [isOtherRevenueLoading, setIsOtherRevenueLoading] = useState(false);
    const [isOtherExpensesLoading, setIsOtherExpensesLoading] = useState(false);

    const [isParkingRateGuideExpanded, setIsParkingRateGuideExpandedState] = useState<boolean>(() => {
        const savedState = localStorage.getItem(PARKING_RATE_GUIDE_STORAGE_KEY);
        return savedState === null ? true : savedState === 'true';
    });

    const [isStatisticsGuideOpen, setIsStatisticsGuideOpenState] = useState<boolean>(() => {
        const savedState = localStorage.getItem(STATISTICS_GUIDE_STORAGE_KEY);
        return savedState === null ? true : savedState === 'true';
    });

    const [isOtherRevenueGuideOpen, setIsOtherRevenueGuideOpenState] = useState<boolean>(() => {
        const savedState = localStorage.getItem(OTHER_REVENUE_GUIDE_STORAGE_KEY);
        return savedState === null ? true : savedState === 'true';
    });

    const [isOtherExpensesGuideOpen, setIsOtherExpensesGuideOpenState] = useState<boolean>(() => {
        const savedState = localStorage.getItem("isOtherExpensesGuideOpen");
        return savedState === null ? true : savedState === 'true';
    });

    const [isPayrollGuideOpen, setIsPayrollGuideOpenState] = useState<boolean>(() => {
        const savedState = localStorage.getItem(PAYROLL_GUIDE_STORAGE_KEY);
        return savedState === null ? true : savedState === 'true';
    });

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const navigate = useNavigate();

    const setIsParkingRateGuideExpanded = (value: boolean) => {
        setIsParkingRateGuideExpandedState(value);
        localStorage.setItem(PARKING_RATE_GUIDE_STORAGE_KEY, value.toString());
    };

    const setIsStatisticsGuideOpen = (value: boolean) => {
        setIsStatisticsGuideOpenState(value);
        localStorage.setItem(STATISTICS_GUIDE_STORAGE_KEY, value.toString());
    };

    const setIsOtherRevenueGuideOpen = (value: boolean) => {
        setIsOtherRevenueGuideOpenState(value);
        localStorage.setItem(OTHER_REVENUE_GUIDE_STORAGE_KEY, value.toString());
    };

    const setIsPayrollGuideOpen = (value: boolean) => {
        setIsPayrollGuideOpenState(value);
        localStorage.setItem(PAYROLL_GUIDE_STORAGE_KEY, value.toString());
    };

    const setIsOtherExpensesGuideOpen = (value: boolean) => {
        setIsOtherExpensesGuideOpenState(value);
        localStorage.setItem("isOtherExpensesGuideOpen", value.toString());
    };

    const [statisticsDirty, setStatisticsDirty] = useState(false);

    // Ref for SiteStatisticsForm
    const statisticsRef = useRef<{ save: () => Promise<void> }>(null);
    // Ref for ParkingRateForm
    const parkingRatesRef = useRef<{ save: () => Promise<void> }>(null);
    // Ref for PayrollForecast
    const payrollRef = useRef<{ save: () => Promise<void> }>(null);
    // Ref for OtherRevenue
    const otherRevenueRef = useRef<{ save: () => Promise<void> }>(null);
    // Ref for OtherExpenses
    const otherExpensesRef = useRef<{ save: () => Promise<void> }>(null);

    // Global save state
    const [isGlobalSaving, setIsGlobalSaving] = useState(false);

    // Toast for notifications
    const { toast, dismiss } = useToast();

    // Global Save handler
    const handleGlobalSave = async () => {
        setIsGlobalSaving(true);

        // Track per-tab toasts and timeouts
        const tabSaves: {
            name: string;
            promise: Promise<void>;
            clearDirty: () => void;
        }[] = [];

        // Helper to show saving toast for a tab
        const showSavingToast = (tabName: string) => {
            const toastObj = toast({
                title: `Saving ${tabName}...`,
                description: "Your changes are being saved. Please wait.",
                variant: "default",
                duration: 10000,
            });
            return toastObj?.id;
        };

        // Helper to show success/failure toast for a tab
        const showResultToast = (tabName: string, success: boolean) => {
            toast({
                title: success ? `${tabName} saved successfully` : `Save failed for ${tabName}`,
                description: success
                    ? `All changes for ${tabName} have been saved.`
                    : `Some changes for ${tabName} could not be saved. Please try again.`,
                variant: success ? "default" : "destructive",
            });
        };

        // Add each dirty tab to the tabSaves array
        if (statisticsDirty && statisticsRef.current) {
            tabSaves.push({
                name: "Statistics",
                promise: statisticsRef.current.save(),
                clearDirty: () => setStatisticsDirty(false),
            });
        }
        if (parkingRatesDirty && parkingRatesRef.current) {
            tabSaves.push({
                name: "Parking Rates",
                promise: parkingRatesRef.current.save(),
                clearDirty: () => setParkingRatesDirty(false),
            });
        }
        if (payrollDirty && payrollRef.current) {
            tabSaves.push({
                name: "Payroll",
                promise: payrollRef.current.save(),
                clearDirty: () => setPayrollDirty(false),
            });
        }
        if (otherRevenueDirty && otherRevenueRef.current) {
            tabSaves.push({
                name: "Other Revenue",
                promise: otherRevenueRef.current.save(),
                clearDirty: () => setOtherRevenueDirty(false),
            });
        }
        if (otherExpensesDirty && otherExpensesRef.current) {
            tabSaves.push({
                name: "Other Expenses",
                promise: otherExpensesRef.current.save(),
                clearDirty: () => setOtherExpensesDirty(false),
            });
        }

        // Show saving toast for each tab
        const savingToastIds = tabSaves.map(tab => showSavingToast(tab.name));

        // Wait for all saves, but handle each tab's toast individually
        await Promise.all(
            tabSaves.map(async (tab, idx) => {
                try {
                    await tab.promise;
                    tab.clearDirty();
                    showResultToast(tab.name, true);
                } catch (err) {
                    showResultToast(tab.name, false);
                } finally {
                    if (savingToastIds[idx]) dismiss(savingToastIds[idx]);
                }
            })
        );

        setIsGlobalSaving(false);
    };
    const [parkingRatesDirty, setParkingRatesDirty] = useState(false);
    const [otherRevenueDirty, setOtherRevenueDirty] = useState(false);
    const [otherExpensesDirty, setOtherExpensesDirty] = useState(false);
    const [payrollDirty, setPayrollDirty] = useState(false);
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [pendingSidebarChange, setPendingSidebarChange] = useState<{ type: 'site' | 'period', value: string } | null>(null);

    // New: Modal for navigating to Other Revenue with unsaved changes
    const [showOtherRevenueUnsavedModal, setShowOtherRevenueUnsavedModal] = useState(false);
    const [pendingTabChange, setPendingTabChange] = useState<string | null>(null);

    const handleSiteChange = (site: string) => {
        // If save is in progress, allow site switch without showing unsaved changes dialog
        if (isGlobalSaving) {
            setSelectedSite(site);
            setSelectedCustomerById(site);
            return;
        }
        
        if (statisticsDirty || parkingRatesDirty || otherRevenueDirty || payrollDirty) {
            setPendingSidebarChange({ type: 'site', value: site });
            setShowUnsavedModal(true);
        } else {
            setSelectedSite(site);
            setSelectedCustomerById(site);
        }
    };

    const handlePeriodChange = (period: string) => {
        // If save is in progress, allow period switch without showing unsaved changes dialog
        if (isGlobalSaving) {
            setStartingMonth(period);
            return;
        }
        
        if (statisticsDirty || parkingRatesDirty || otherRevenueDirty || payrollDirty) {
            setPendingSidebarChange({ type: 'period', value: period });
            setShowUnsavedModal(true);
        } else {
            setStartingMonth(period);
        }
    };

    const handleConfirmSidebarChange = () => {
        if (pendingSidebarChange) {
            if (pendingSidebarChange.type === 'site') {
                setSelectedSite(pendingSidebarChange.value);
                setSelectedCustomerById(pendingSidebarChange.value);
            } else if (pendingSidebarChange.type === 'period') {
                setStartingMonth(pendingSidebarChange.value);
            }
        }
        // Reset all dirty flags when proceeding without saving
        setStatisticsDirty(false);
        setParkingRatesDirty(false);
        setOtherRevenueDirty(false);
        setOtherExpensesDirty(false);
        setPayrollDirty(false);
        setShowUnsavedModal(false);
        setPendingSidebarChange(null);
    };

    const handleCancelSidebarChange = () => {
        setShowUnsavedModal(false);
        setPendingSidebarChange(null);
    };

    useEffect(() => {
        if (selectedCustomer && selectedCustomer.customerSiteId !== selectedSite) {
            setSelectedSite(selectedCustomer.customerSiteId);
        }
    }, [selectedCustomer, selectedSite]);

    useEffect(() => {
    if (userRoles.length > 0 && 
        !(userRoles.includes('accountManager') || userRoles.includes('districtManager'))) {
        navigate(routes.customersList);
    }
}, [userRoles, navigate]);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get("tab");
        if (tab === "parking-rates") {
            setActiveTab("parking-rates");
        } else if (tab === "payroll") {
            setActiveTab("payroll");
        } else {
            setActiveTab("statistics");
        }
    }, []);

    useEffect(() => {
        async function fetchCustomers() {
            setIsLoadingCustomers(true);
            setError(null);
            try {
                const claimsHeader = JSON.stringify(userRoles);
                const response = await fetch("/api/customers", {
                    headers: {
                        "x-client-roles": claimsHeader,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching customers: ${response.status}`);
                }

                const data = await response.json();
                const sortedCustomers: Customer[] = data.sort((a: Customer, b: Customer) => a.siteNumber.localeCompare(b.siteNumber));
                setCustomers(sortedCustomers);
            } catch (err) {
                console.error('Failed to fetch customers:', err);
                setError('Failed to load customers. Please try again later.');
            } finally {
                setIsLoadingCustomers(false);
            }
        }

        fetchCustomers();
    }, [userRoles]);

    // Custom tab change handler for Other Revenue warning
    const handleTabChange = (value: string) => {
        // Only show warning when navigating TO otherRevenue and there are unsaved changes in any tab except otherRevenue itself
        if (
            value === "otherRevenue" &&
            (statisticsDirty || parkingRatesDirty || payrollDirty || otherExpensesDirty)
        ) {
            setShowOtherRevenueUnsavedModal(true);
            setPendingTabChange(value);
            return;
        }
        setActiveTab(value);

        if (value === "otherRevenue") {
            setTimePeriod(TimeRangeType.MONTHLY);
        }

        const url = new URL(window.location.href);
        url.searchParams.set("tab", value);
        window.history.pushState({}, "", url);
    };

    // Handler for confirming navigation to Other Revenue (lose changes)
    const handleConfirmOtherRevenueTabChange = () => {
        if (pendingTabChange) {
            setActiveTab(pendingTabChange);
            if (pendingTabChange === "otherRevenue") {
                setTimePeriod(TimeRangeType.MONTHLY);
            }
            const url = new URL(window.location.href);
            url.searchParams.set("tab", pendingTabChange);
            window.history.pushState({}, "", url);
        }
        setShowOtherRevenueUnsavedModal(false);
        setPendingTabChange(null);
        // Clear dirty flags for all except otherRevenue
        setStatisticsDirty(false);
        setParkingRatesDirty(false);
        setPayrollDirty(false);
        setOtherExpensesDirty(false);
    };

    // Handler for cancelling navigation to Other Revenue
    const handleCancelOtherRevenueTabChange = () => {
        setShowOtherRevenueUnsavedModal(false);
        setPendingTabChange(null);
    };

    // Loader state for Save and Continue in Other Revenue modal
    const [isOtherRevenueSaveLoading, setIsOtherRevenueSaveLoading] = useState(false);

    // Handler for saving before navigating to Other Revenue
    const handleSaveAndGoToOtherRevenue = async () => {
        setIsOtherRevenueSaveLoading(true);
        let savingToastId: string | undefined;
        let savingTimeout: NodeJS.Timeout | undefined;

        // Show "Saving..." toast immediately
        const savingToast = toast({
            title: "Saving...",
            description: "Your changes are being saved. Please wait.",
            variant: "default",
            duration: 10000,
        });
        savingToastId = savingToast?.id;

        try {
            // Save all dirty tabs except otherRevenue
            const savePromises: Promise<void>[] = [];
            if (statisticsDirty && statisticsRef.current) savePromises.push(statisticsRef.current.save());
            if (parkingRatesDirty && parkingRatesRef.current) savePromises.push(parkingRatesRef.current.save());
            if (payrollDirty && payrollRef.current) savePromises.push(payrollRef.current.save());
            if (otherExpensesDirty && otherExpensesRef.current) savePromises.push(otherExpensesRef.current.save());
            await Promise.all(savePromises);
            setStatisticsDirty(false);
            setParkingRatesDirty(false);
            setPayrollDirty(false);
            setOtherExpensesDirty(false);
            // Success toast
            toast({
                title: "Saved successfully",
                description: "All changes have been saved.",
                variant: "default",
            });
            // Now navigate
            handleConfirmOtherRevenueTabChange();
        } catch (err) {
            toast({
                title: "Save failed",
                description: "Some changes could not be saved. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsOtherRevenueSaveLoading(false);
            if (savingTimeout) clearTimeout(savingTimeout);
            if (savingToastId) dismiss(savingToastId);
        }
    };

    const handleTotalRoomsChange = (rooms: number) => {
        setTotalRooms(rooms);
    };

    const canAccessForecast = userRoles.includes('accountManager') || userRoles.includes('districtManager');

    return (
        <div className="p-4 flex flex-col md:flex-row gap-6 w-full">
            <SidebarContainer
                customers={customers}
                isLoadingCustomers={isLoadingCustomers}
                error={error}
                selectedSite={selectedSite}
                setSelectedSite={handleSiteChange}
                totalRooms={totalRooms}
                startingMonth={startingMonth}
                setStartingMonth={handlePeriodChange}
                timePeriod={timePeriod}
                setTimePeriod={setTimePeriod}
                comparison={comparison}
                setComparison={setComparison}
                activeTab={activeTab}
                isExpanded={isSidebarExpanded}
                onExpandedChange={setIsSidebarExpanded}
                isSidebarDisabled={
                    (activeTab === "statistics" && isStatisticsLoading) ||
                    (activeTab === "parking-rates" && isParkingRatesLoading) ||
                    (activeTab === "payroll" && isPayrollLoading) ||
                    (activeTab === "otherRevenue" && isOtherRevenueLoading)
                }
            />
            <div className="transition-all duration-300 ease-in-out grow overflow-x-hidden">
                {canAccessForecast && (
                    <>
                        <Tabs value={activeTab} onValueChange={handleTabChange} data-qa-id="tabs-forecasts">
                            <TabsList data-qa-id="tabsList-forecasts">
                                <TabsTrigger value="statistics" data-qa-id="tab-statistics">Statistics</TabsTrigger>
                                <TabsTrigger value="parking-rates" data-qa-id="tab-parkingRates">Rates</TabsTrigger>
                                <TabsTrigger value="payroll" data-qa-id="tab-payroll">Payroll</TabsTrigger>
                                <TabsTrigger value="otherRevenue" data-qa-id="tab-otherRevenue">Other Revenue</TabsTrigger>
                                <TabsTrigger value="otherExpenses" data-qa-id="tab-otherExpenses">Other Expenses</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        {/* Global Save Button */}
                        <div className="flex justify-end mb-4">
                            <Button
                                onClick={handleGlobalSave}
                                disabled={
                                    isGlobalSaving ||
                                    !(
                                        statisticsDirty ||
                                        parkingRatesDirty ||
                                        payrollDirty ||
                                        otherRevenueDirty ||
                                        otherExpensesDirty
                                    )
                                }
                                variant="default"
                                data-qa-id="button-global-save"
                            >
                                {isGlobalSaving ? "Saving..." : "Save All"}
                            </Button>
                        </div>
                        {/* (Removed: Still saving notification under dialog) */}
                        <div style={{ display: activeTab === 'statistics' ? 'block' : 'none' }}>
                            <SiteStatisticsForm
                                ref={statisticsRef}
                                customers={customers}
                                isLoadingCustomers={isLoadingCustomers}
                                error={error}
                                selectedSite={selectedSite}
                                setSelectedSite={handleSiteChange}
                                onTotalRoomsChange={handleTotalRoomsChange}
                                startingMonth={startingMonth}
                                timePeriod={timePeriod}
                                isGuideOpen={isStatisticsGuideOpen}
                                setIsGuideOpen={setIsStatisticsGuideOpen}
                                hasUnsavedChanges={statisticsDirty}
                                setHasUnsavedChanges={setStatisticsDirty}
                                onLoadingChange={setIsStatisticsLoading}
                            />
                        </div>
                        <div style={{ display: activeTab === 'parking-rates' ? 'block' : 'none' }}>
                            <ParkingRateForm
                                ref={parkingRatesRef}
                                customers={customers}
                                error={error}
                                isParkingRateGuideExpanded={isParkingRateGuideExpanded}
                                setIsParkingRateGuideExpanded={setIsParkingRateGuideExpanded}
                                selectedSite={selectedSite}
                                startingMonth={startingMonth}
                                hasUnsavedChanges={parkingRatesDirty}
                                setHasUnsavedChanges={setParkingRatesDirty}
                                onLoadingChange={setIsParkingRatesLoading}
                            />
                        </div>
                        <div style={{ display: activeTab === 'payroll' ? 'block' : 'none' }}>
                            <PayrollForecast
                                ref={payrollRef}
                                customers={customers}
                                error={error}
                                selectedSite={selectedSite}
                                startingMonth={startingMonth}
                                isGuideOpen={isPayrollGuideOpen}
                                setIsGuideOpen={setIsPayrollGuideOpen}
                                hasUnsavedChanges={payrollDirty}
                                setHasUnsavedChanges={setPayrollDirty}
                                onLoadingChange={setIsPayrollLoading}
                            />
                        </div>
                        <div style={{ display: activeTab === 'otherRevenue' ? 'block' : 'none' }}>
                            <OtherRevenue
                                ref={otherRevenueRef}
                                customers={customers}
                                selectedSite={selectedSite}
                                startingMonth={startingMonth}
                                comparisonType={comparison}
                                isGuideOpen={isOtherRevenueGuideOpen}
                                setIsGuideOpen={setIsOtherRevenueGuideOpen}
                                hasUnsavedChanges={otherRevenueDirty}
                                setHasUnsavedChanges={setOtherRevenueDirty}
                                onLoadingChange={setIsOtherRevenueLoading}
                            />
                        </div>
                        <div style={{ display: activeTab === 'otherExpenses' ? 'block' : 'none' }}>
                            <OtherExpenses
                                ref={otherExpensesRef}
                                customers={customers}
                                selectedSite={selectedSite}
                                startingMonth={startingMonth}
                                comparisonType={comparison}
                                isGuideOpen={isOtherExpensesGuideOpen}
                                setIsGuideOpen={setIsOtherExpensesGuideOpen}
                                hasUnsavedChanges={otherExpensesDirty}
                                setHasUnsavedChanges={setOtherExpensesDirty}
                                onLoadingChange={setIsOtherExpensesLoading}
                            />
                        </div>
                        <Dialog open={showUnsavedModal} onOpenChange={setShowUnsavedModal}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>You have unsaved changes</DialogTitle>
                                    <DialogDescription>
                                        Your changes will be lost if you continue. Do you want to proceed?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={handleCancelSidebarChange}>Cancel</Button>
                                    <Button onClick={handleConfirmSidebarChange}>Continue</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/* Modal for navigating to Other Revenue with unsaved changes */}
                        <Dialog open={showOtherRevenueUnsavedModal} onOpenChange={setShowOtherRevenueUnsavedModal}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Unsaved Changes Detected</DialogTitle>
                                    <DialogDescription>
                                        You have unsaved changes in another tab. If you proceed to Other Revenue, your updates will be lost. Would you like to save your changes before continuing?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={handleCancelOtherRevenueTabChange}>Cancel</Button>
                                    <Button variant="secondary" onClick={handleConfirmOtherRevenueTabChange}>Proceed Without Saving</Button>
                                    <Button onClick={handleSaveAndGoToOtherRevenue} disabled={isOtherRevenueSaveLoading}>
                                        {isOtherRevenueSaveLoading ? "Saving..." : "Save and Continue"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
};
