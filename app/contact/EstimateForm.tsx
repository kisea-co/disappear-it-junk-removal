"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./EstimateForm.module.css";

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const TARGET_PHOTO_BYTES = 280 * 1024;
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

function isAllowedPhoto(file: File) {
  return (
    ALLOWED_PHOTO_TYPES.has(file.type) ||
    /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)
  );
}

function loadPhoto(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const preview = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(preview);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(preview);
      reject(new Error(`${file.name} could not be prepared. Please choose a different image.`));
    };
    image.src = preview;
  });
}

function canvasBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("Photo compression failed.")),
      "image/jpeg",
      quality,
    ),
  );
}

function blobBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error("Photo encoding failed."));
    reader.readAsDataURL(blob);
  });
}

async function preparePhoto(file: File, index: number) {
  const image = await loadPhoto(file);
  const scale = Math.min(1, 1280 / Math.max(image.naturalWidth, image.naturalHeight));
  let canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Photo compression is unavailable in this browser.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  let quality = 0.78;
  let compressed = await canvasBlob(canvas, quality);
  while (compressed.size > TARGET_PHOTO_BYTES && quality > 0.38) {
    quality -= 0.08;
    compressed = await canvasBlob(canvas, quality);
  }
  while (
    compressed.size > TARGET_PHOTO_BYTES &&
    Math.max(canvas.width, canvas.height) > 700
  ) {
    const smaller = document.createElement("canvas");
    smaller.width = Math.max(1, Math.round(canvas.width * 0.82));
    smaller.height = Math.max(1, Math.round(canvas.height * 0.82));
    const smallerContext = smaller.getContext("2d");
    if (!smallerContext) throw new Error("Photo compression is unavailable in this browser.");
    smallerContext.drawImage(canvas, 0, 0, smaller.width, smaller.height);
    canvas = smaller;
    compressed = await canvasBlob(canvas, 0.5);
  }
  if (compressed.size > TARGET_PHOTO_BYTES)
    throw new Error(`${file.name} could not be compressed enough to send. Please choose a different photo.`);

  return {
    filename: `estimate-photo-${index + 1}.jpg`,
    content: await blobBase64(compressed),
  };
}

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

export default function EstimateForm({
  reward,
  estimateType = "residential",
}: {
  reward: 0 | 25 | 50;
  estimateType?: "residential" | "commercial";
}) {
  const isCommercial = estimateType === "commercial";
  const [activeReward, setActiveReward] = useState<0 | 25 | 50>(reward);
  const [submittedReward, setSubmittedReward] = useState<0 | 25 | 50>(0);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const photoInput = useRef<HTMLInputElement>(null);
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
  const photoPreviews = useMemo(
    () => photos.map((photo) => URL.createObjectURL(photo)),
    [photos],
  );

  useEffect(
    () => () => photoPreviews.forEach((preview) => URL.revokeObjectURL(preview)),
    [photoPreviews],
  );

  function selectPhotos(event: ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(event.target.files || []);
    const combined = [...photos, ...incoming];
    if (combined.length > MAX_PHOTOS) {
      setError(`You can upload up to ${MAX_PHOTOS} photos.`);
      event.target.value = "";
      return;
    }
    const invalid = incoming.find(
      (file) => !isAllowedPhoto(file) || file.size > MAX_PHOTO_BYTES,
    );
    if (invalid) {
      setError(
        `${invalid.name} must be a JPG, PNG, WebP, or HEIC image no larger than 10 MB.`,
      );
      event.target.value = "";
      return;
    }
    setError("");
    setPhotos(combined);
    event.target.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    setUploadProgress(0);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const photoAttachments: Array<{ filename: string; content: string }> = [];
      for (let index = 0; index < photos.length; index += 1) {
        const photo = photos[index];
        setUploadProgress(index + 1);
        photoAttachments.push(await preparePhoto(photo, index));
      }
      setUploadProgress(photos.length + 1);

      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          photoAttachments,
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
      setPhotos([]);
      setUploadProgress(0);
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
          YOUR ESTIMATE REQUEST
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
    <form className={`estimate-form ${styles.form}`} onSubmit={submit}>
      <input type="hidden" name="estimateType" value={estimateType} />
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
          <input value={activeReward === 50 ? "$50 off a half load or larger" : "$25 off any load size"} readOnly />
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
      <div className={`full ${styles.uploadField}`}>
        <div className={styles.uploadHeading}>
          <div>
            <strong>Show us what needs to disappear</strong>
            <span>
              Upload clear photos of the items, the full area, and any stairs or
              tight entryways. Photos help us provide a faster, more accurate
              estimate.
            </span>
          </div>
          <small>{photos.length}/{MAX_PHOTOS}</small>
        </div>
        <input
          ref={photoInput}
          className={styles.fileInput}
          id="estimate-photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          onChange={selectPhotos}
        />
        <button
          className={styles.uploadButton}
          type="button"
          onClick={() => photoInput.current?.click()}
          disabled={photos.length >= MAX_PHOTOS || status === "sending"}
        >
          {photos.length ? "Add More Photos" : "Choose Photos"}
        </button>
        <span className={styles.uploadNote}>
          Optional · Up to 8 photos · 10 MB each · JPG, PNG, WebP, or HEIC
        </span>
        {photos.length > 0 && (
          <div className={styles.photoGrid} aria-label="Selected photos">
            {photos.map((photo, index) => (
              <div
                className={styles.photoPreview}
                key={`${photo.name}-${photo.lastModified}-${index}`}
              >
                <img src={photoPreviews[index]} alt={`Selected upload ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  aria-label={`Remove ${photo.name}`}
                  disabled={status === "sending"}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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
            ? photos.length && uploadProgress <= photos.length
              ? `Uploading Photo ${uploadProgress} of ${photos.length}…`
              : "Sending Request…"
            : isCommercial
              ? "Submit Commercial Estimate →"
              : "Submit Estimate Request →"}
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
              href="tel:+14708701067"
              style={{ textDecoration: "underline", fontWeight: 600 }}
            >
              (470) 870-1067
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
