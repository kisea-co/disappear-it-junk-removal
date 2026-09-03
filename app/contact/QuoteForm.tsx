"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./QuoteForm.module.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function dateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function prettyDate(value: string) {
  if (!value) return "Choose a preferred date";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function QuoteForm({
  reward,
  quoteType = "residential",
}: {
  reward: 0 | 25 | 50;
  quoteType?: "residential" | "commercial";
}) {
  const isCommercial = quoteType === "commercial";
  const [activeReward, setActiveReward] = useState<0 | 25 | 50>(reward);
  const [submittedReward, setSubmittedReward] = useState<0 | 25 | 50>(0);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const today = dateValue(new Date());
  const calendarDays = useMemo(() => {
    const firstWeekday = viewMonth.getDay();
    const totalDays = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0,
    ).getDate();
    return [
      ...Array(firstWeekday).fill(null),
      ...Array.from({ length: totalDays }, (_, index) => index + 1),
    ];
  }, [viewMonth]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          reward: activeReward ? String(activeReward) : "",
        }),
      });
      const result = await response.json();
      if (result.code === "REWARD_ALREADY_CLAIMED") {
        window.localStorage.setItem("trashketball-reward-claimed", "true");
        window.localStorage.removeItem("trashketball-reward");
        window.history.replaceState({}, "", window.location.pathname);
        setActiveReward(0);
      }
      if (!response.ok)
        throw new Error(result.error || "We could not send your request.");
      setSubmittedReward(activeReward);
      if (activeReward) {
        window.localStorage.setItem("trashketball-reward-claimed", "true");
        window.localStorage.removeItem("trashketball-reward");
        window.history.replaceState({}, "", window.location.pathname);
        setActiveReward(0);
      }
      form.reset();
      setSelectedDate("");
      setStatus("success");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We could not send your request.",
      );
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div
        role="status"
        style={{
          padding: "34px 30px",
          border: "1px solid #c9b36e",
          background: "#fff",
        }}
      >
        <div className="eyebrow dark">Request Received</div>
        <h2
          style={{
            fontSize: "clamp(2.7rem,5vw,4.3rem)",
            margin: "10px 0 16px",
          }}
        >
          YOUR QUOTE REQUEST
          <br />
          IS IN.
        </h2>
        <p style={{ margin: 0, color: "#5e584f" }}>
          Thank you! Disappear It will review the details and contact you
          shortly.
        </p>
        {submittedReward > 0 && (
          <p style={{ margin: "14px 0 0", fontWeight: 600, color: "#70571d" }}>
            Your one-time ${submittedReward} Trashketball reward was included
            and marked as claimed.
          </p>
        )}
        <button
          className="btn btn-dark"
          type="button"
          style={{ marginTop: "24px" }}
          onClick={() => setStatus("idle")}
        >
          Send Another Request
        </button>
      </div>
    );

  return (
    <form className={`quote-form ${styles.form}`} onSubmit={submit}>
      <input type="hidden" name="quoteType" value={quoteType} />
      <label
        style={{ position: "absolute", left: "-10000px" }}
        aria-hidden="true"
      >
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {activeReward > 0 && (
        <label className="full">
          One-time Trashketball reward
          <input value={`$${activeReward} off any load size`} readOnly />
        </label>
      )}
      <label>
        {isCommercial ? "Contact name" : "Name"}
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Your name"
        />
      </label>
      {isCommercial && (
        <>
          <label>
            Company / property name
            <input
              name="businessName"
              autoComplete="organization"
              required
              maxLength={160}
              placeholder="Business or property name"
            />
          </label>
          <label>
            Project type
            <select name="projectType" required defaultValue="">
              <option value="" disabled>Select a project type</option>
              <option>Apartment community / multifamily</option>
              <option>Property or unit cleanout</option>
              <option>Office or retail cleanout</option>
              <option>Real estate turnover</option>
              <option>Construction or light demolition debris</option>
              <option>Other commercial removal</option>
            </select>
          </label>
          <label>
            Service frequency
            <select name="frequency" required defaultValue="">
              <option value="" disabled>Select frequency</option>
              <option>One-time project</option>
              <option>Recurring service</option>
              <option>Not sure yet</option>
            </select>
          </label>
        </>
      )}
      <label>
        Phone
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={40}
          placeholder="(404) 555-0123"
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          placeholder="you@email.com"
        />
      </label>
      <label>
        {isCommercial ? "Service address / ZIP" : "Location / ZIP"}
        <input
          name="location"
          autoComplete="postal-code"
          required
          maxLength={160}
          placeholder="City or ZIP code"
        />
      </label>
      <label className="full">
        {isCommercial ? "Tell us about the project" : "What needs to be removed?"}
        <textarea
          name="junk"
          required
          maxLength={2500}
          placeholder={isCommercial
            ? "Describe the property or space, what needs to go, approximate volume, access conditions, stairs/elevators, and any deadline."
            : "Tell us what needs to go, where it is located, and roughly how much there is."}
        />
      </label>
      {isCommercial && (
        <label className="full">
          Site access or scheduling notes (optional)
          <textarea
            name="accessNotes"
            maxLength={1500}
            placeholder="Gate access, loading area, occupied units, COI requirements, preferred service windows, etc."
          />
        </label>
      )}
      <div className={`full ${styles.dateField}`}>
        <label id="pickup-date-label">Preferred pickup date</label>
        <input type="hidden" name="date" value={selectedDate} />
        <button
          className={styles.dateTrigger}
          type="button"
          onClick={() => setCalendarOpen((open) => !open)}
          aria-expanded={calendarOpen}
          aria-haspopup="dialog"
          aria-labelledby="pickup-date-label"
        >
          <span>
            <small>DATE</small>
            {prettyDate(selectedDate)}
          </span>
          <b aria-hidden="true">▾</b>
        </button>
        {calendarOpen && (
          <div
            className={styles.calendar}
            role="dialog"
            aria-label="Choose preferred pickup date"
          >
            <div className={styles.calendarHeading}>
              <button
                type="button"
                onClick={() =>
                  setViewMonth(
                    new Date(
                      viewMonth.getFullYear(),
                      viewMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
                aria-label="Previous month"
              >
                ←
              </button>
              <strong>
                {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </strong>
              <button
                type="button"
                onClick={() =>
                  setViewMonth(
                    new Date(
                      viewMonth.getFullYear(),
                      viewMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
                aria-label="Next month"
              >
                →
              </button>
            </div>
            <div className={styles.weekdays}>
              {WEEKDAYS.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className={styles.days}>
              {calendarDays.map((day, index) =>
                day === null ? (
                  <span key={`blank-${index}`} />
                ) : (
                  (() => {
                    const value = dateValue(
                      new Date(
                        viewMonth.getFullYear(),
                        viewMonth.getMonth(),
                        day,
                      ),
                    );
                    const disabled = value < today;
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={disabled}
                        className={
                          value === selectedDate ? styles.selected : ""
                        }
                        onClick={() => {
                          setSelectedDate(value);
                          setCalendarOpen(false);
                        }}
                        aria-label={prettyDate(value)}
                        aria-pressed={value === selectedDate}
                      >
                        {day}
                      </button>
                    );
                  })()
                ),
              )}
            </div>
            <div className={styles.calendarFoot}>
              <span>Preferred dates are subject to availability.</span>
              {selectedDate && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate("");
                    setCalendarOpen(false);
                  }}
                >
                  Clear date
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="full">
        <button
          className="btn btn-dark"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending"
            ? "Sending Request…"
            : isCommercial
              ? "Submit Commercial Request →"
              : "Submit Quote Request →"}
        </button>
        <p className="muted" style={{ marginBottom: 0 }}>
          Your request will be sent directly to Disappear It. We&apos;ll contact
          you to confirm job details, availability and pricing.
        </p>
        {status === "error" && (
          <p
            role="alert"
            style={{
              margin: "12px 0 0",
              padding: "11px 13px",
              background: "#f8ded8",
              borderLeft: "4px solid #9e2f1d",
              color: "#741f13",
            }}
          >
            {error} You can also call{" "}
            <a
              href="tel:+14048579200"
              style={{ textDecoration: "underline", fontWeight: 600 }}
            >
              (404) 857-9200
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
