"use client";

import { useEffect, useState } from "react";
import { home } from "@/lib/world";

const RAD = Math.PI / 180;

function haversine(aLat: number, aLon: number, bLat: number, bLon: number) {
  const dLat = (bLat - aLat) * RAD;
  const dLon = (bLon - aLon) * RAD;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aLat * RAD) * Math.cos(bLat * RAD) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(h)));
}

function quip(km: number) {
  if (km < 5) return "either we're neighbours or this api is guessing";
  if (km < 50) return "close enough to just show up";
  if (km < 500) return "a long drive, or a short flight";
  if (km < 2000) return "still the same time zone-ish, relatively";
  if (km < 6000) return "far enough that a call needs planning";
  return "basically the other side of the planet";
}

export default function Distance() {
  const [km, setKm] = useState<number | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("geo lookup failed"))))
      .then((data) => {
        if (cancelled || typeof data?.latitude !== "number") return;
        setKm(haversine(data.latitude, data.longitude, home.lat, home.lon));
        setPlace([data.city, data.country_name].filter(Boolean).join(", ") || null);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="distance-card">
      {km !== null ? (
        <>
          <p className="distance-number">{km.toLocaleString("en-IN")} km</p>
          <p className="distance-sub">
            from {place ? place.toLowerCase() : "wherever you are"} to my desk in {home.name.toLowerCase()}
          </p>
          <p className="hand distance-quip">{quip(km)}</p>
        </>
      ) : failed ? (
        <p className="distance-sub">couldn&apos;t place you on the map. hi anyway.</p>
      ) : (
        <p className="distance-sub">asking your browser nicely…</p>
      )}
    </div>
  );
}
