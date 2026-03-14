"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, Clock, RefreshCw, Truck, AlertTriangle } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

interface BorderCrossing {
  office: string;
  location: string;
  province: string;
  lastUpdated: string;
  commercialCanada: string;
  commercialUS: string;
  travellersCanada: string;
  travellersUS: string;
}

interface BorderData {
  crossings: BorderCrossing[];
  byProvince: Record<string, BorderCrossing[]>;
  sortedProvinces: string[];
  totalCrossings: number;
  fetchedAt: string;
}

function getWaitMinutes(value: string): number | null {
  if (!value) return null;
  const lower = value.toLowerCase().trim();
  if (lower === "no delay" || lower === "not applicable") return 0;
  if (lower === "--" || lower === "closed" || lower === "n/a" || lower === "") return null;
  // Try to extract minutes from strings like "15 minutes" or just "15"
  const match = value.match(/(\d+)/);
  if (match) return parseInt(match[1], 10);
  return null;
}

function getStatusColor(value: string): {
  bg: string;
  text: string;
  border: string;
  dot: string;
  label: string;
  labelPa: string;
} {
  const lower = value.toLowerCase().trim();

  if (lower === "no delay" || lower === "not applicable") {
    return {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/30",
      dot: "bg-green-500",
      label: lower === "not applicable" ? "N/A" : "No Delay",
      labelPa: lower === "not applicable" ? "ਲਾਗੂ ਨਹੀਂ" : "ਕੋਈ ਦੇਰੀ ਨਹੀਂ",
    };
  }

  if (lower === "--" || lower === "closed" || lower === "") {
    return {
      bg: "bg-gray-500/10",
      text: "text-gray-500",
      border: "border-gray-500/30",
      dot: "bg-gray-500",
      label: "Closed",
      labelPa: "ਬੰਦ",
    };
  }

  const minutes = getWaitMinutes(value);
  if (minutes !== null) {
    if (minutes <= 15) {
      return {
        bg: "bg-green-500/10",
        text: "text-green-400",
        border: "border-green-500/30",
        dot: "bg-green-500",
        label: value,
        labelPa: value,
      };
    }
    if (minutes <= 30) {
      return {
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        dot: "bg-yellow-500",
        label: value,
        labelPa: value,
      };
    }
    return {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
      dot: "bg-red-500",
      label: value,
      labelPa: value,
    };
  }

  // Default: show raw value with neutral styling
  return {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-500",
    label: value,
    labelPa: value,
  };
}

const provincePunjabi: Record<string, string> = {
  Ontario: "ਓਨਟਾਰੀਓ",
  Quebec: "ਕਿਊਬੈੱਕ",
  "British Columbia": "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ",
  Alberta: "ਅਲਬਰਟਾ",
  Manitoba: "ਮੈਨੀਟੋਬਾ",
  Saskatchewan: "ਸਸਕੈਚਵਨ",
  "New Brunswick": "ਨਿਊ ਬਰੰਜ਼ਵਿੱਕ",
  "Nova Scotia": "ਨੋਵਾ ਸਕੋਸ਼ੀਆ",
  "Prince Edward Island": "ਪ੍ਰਿੰਸ ਐਡਵਰਡ ਆਈਲੈਂਡ",
  "Newfoundland and Labrador": "ਨਿਊਫਾਊਂਡਲੈਂਡ",
};

export function BorderTimesContent() {
  const { t } = useLanguage();
  const [data, setData] = useState<BorderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/border-times");
      if (!res.ok) throw new Error("Failed to fetch border wait times");
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          {t({ en: "Home", pa: "ਹੋਮ" })}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">
          {t({ en: "Tools", pa: "ਟੂਲ" })}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">
          {t({ en: "Border Wait Times", pa: "ਬਾਰਡਰ ਉਡੀਕ ਸਮਾਂ" })}
        </span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      {/* Header */}
      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FACC15]/10">
          <Clock className="h-8 w-8 text-[#FACC15]" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {t({ en: "CBSA Border Wait Times", pa: "CBSA ਬਾਰਡਰ ਉਡੀਕ ਸਮਾਂ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "Live commercial and traveller wait times at Canada-US border crossings. Auto-refreshes every 5 minutes.",
            pa: "ਕੈਨੇਡਾ-ਅਮਰੀਕਾ ਬਾਰਡਰ ਕਰਾਸਿੰਗਾਂ ਤੇ ਲਾਈਵ ਕਮਰਸ਼ੀਅਲ ਤੇ ਯਾਤਰੀ ਉਡੀਕ ਸਮਾਂ।",
          })}
        </p>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-gray-400">{t({ en: "No delay / <15 min", pa: "ਕੋਈ ਦੇਰੀ ਨਹੀਂ / <15 ਮਿੰਟ" })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="text-gray-400">{t({ en: "15-30 min", pa: "15-30 ਮਿੰਟ" })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-gray-400">{t({ en: ">30 min", pa: ">30 ਮਿੰਟ" })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-500" />
          <span className="text-gray-400">{t({ en: "Closed / No data", pa: "ਬੰਦ / ਡਾਟਾ ਨਹੀਂ" })}</span>
        </div>
      </div>

      {/* Refresh bar */}
      <div className="mt-6 flex items-center justify-between rounded-lg border border-[#333] bg-[#1A1A1A] px-4 py-2">
        <div className="text-xs text-gray-500">
          {lastRefresh && (
            <>
              {t({ en: "Last refreshed:", pa: "ਆਖ਼ਰੀ ਰਿਫ੍ਰੈਸ਼:" })}{" "}
              {lastRefresh.toLocaleTimeString()}
            </>
          )}
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-[#FACC15] transition-colors hover:bg-[#FACC15]/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          {t({ en: "Refresh", pa: "ਰਿਫ੍ਰੈਸ਼" })}
        </button>
      </div>

      {/* Loading state */}
      {loading && !data && (
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-[#FACC15]" />
          <p className="text-gray-400">
            {t({ en: "Loading border wait times...", pa: "ਬਾਰਡਰ ਉਡੀਕ ਸਮਾਂ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ..." })}
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-red-400" />
          <p className="mt-2 text-red-400">{error}</p>
          <button
            onClick={fetchData}
            className="mt-3 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/30"
          >
            {t({ en: "Try Again", pa: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ" })}
          </button>
        </div>
      )}

      {/* Data */}
      {data && (
        <div className="mt-6 space-y-8">
          {data.sortedProvinces.map((province) => {
            const crossings = data.byProvince[province];
            if (!crossings || crossings.length === 0) return null;

            return (
              <div key={province}>
                <div className="mb-3 border-b border-[#333] pb-2">
                  <h2 className="text-lg font-bold text-white">{province}</h2>
                  <p className="font-gurmukhi text-sm text-[#FACC15]">
                    {provincePunjabi[province] || province}
                  </p>
                </div>

                <div className="space-y-3">
                  {crossings.map((crossing, idx) => {
                    const commercialStatus = getStatusColor(crossing.commercialCanada);
                    const travellersStatus = getStatusColor(crossing.travellersCanada);

                    return (
                      <div
                        key={`${crossing.office}-${idx}`}
                        className="rounded-xl border border-[#333] bg-[#1A1A1A] p-4 transition-all hover:border-[#FACC15]/30"
                      >
                        {/* Office name + location */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-white">
                              {crossing.office}
                            </h3>
                            <p className="mt-0.5 text-xs text-gray-500 truncate">
                              {crossing.location}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-xs text-gray-600">
                              {crossing.lastUpdated}
                            </p>
                          </div>
                        </div>

                        {/* Wait times */}
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          {/* Commercial */}
                          <div
                            className={`rounded-lg border ${commercialStatus.border} ${commercialStatus.bg} p-3`}
                          >
                            <div className="flex items-center gap-1.5">
                              <Truck className={`h-4 w-4 ${commercialStatus.text}`} />
                              <span className="text-xs font-medium text-gray-400">
                                {t({ en: "Commercial", pa: "ਕਮਰਸ਼ੀਅਲ" })}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5">
                              <div
                                className={`h-2 w-2 rounded-full ${commercialStatus.dot}`}
                              />
                              <span
                                className={`text-sm font-bold ${commercialStatus.text}`}
                              >
                                {t({
                                  en: commercialStatus.label,
                                  pa: commercialStatus.labelPa,
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Travellers */}
                          <div
                            className={`rounded-lg border ${travellersStatus.border} ${travellersStatus.bg} p-3`}
                          >
                            <div className="flex items-center gap-1.5">
                              <Clock className={`h-4 w-4 ${travellersStatus.text}`} />
                              <span className="text-xs font-medium text-gray-400">
                                {t({ en: "Travellers", pa: "ਯਾਤਰੀ" })}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5">
                              <div
                                className={`h-2 w-2 rounded-full ${travellersStatus.dot}`}
                              />
                              <span
                                className={`text-sm font-bold ${travellersStatus.text}`}
                              >
                                {t({
                                  en: travellersStatus.label,
                                  pa: travellersStatus.labelPa,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer info */}
      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Tool", pa: "ਇਸ ਟੂਲ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "Wait times are sourced directly from the Canada Border Services Agency (CBSA) and update automatically every 5 minutes. Times shown are for Canada-bound traffic. Commercial vehicle wait times are highlighted for truckers. Always verify with CBSA or your dispatcher before planning a crossing.",
            pa: "ਉਡੀਕ ਸਮਾਂ ਸਿੱਧਾ ਕੈਨੇਡਾ ਬਾਰਡਰ ਸਰਵਿਸਿਜ਼ ਏਜੰਸੀ (CBSA) ਤੋਂ ਆਉਂਦਾ ਹੈ ਤੇ ਹਰ 5 ਮਿੰਟਾਂ ਬਾਅਦ ਆਪਣੇ ਆਪ ਅੱਪਡੇਟ ਹੁੰਦਾ ਹੈ। ਕਰਾਸਿੰਗ ਪਲੈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਹਮੇਸ਼ਾ CBSA ਜਾਂ ਆਪਣੇ ਡਿਸਪੈਚਰ ਨਾਲ ਪੁਸ਼ਟੀ ਕਰੋ।",
          })}
        </p>
      </div>
    </div>
  );
}
