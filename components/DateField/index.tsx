"use client";
import { useState, useRef } from "react";
import styles from "./styles.module.css";

interface DateFieldProps {
  label?: string;
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

export default function DateField({
  label = "Select Date",
  value,
  onChange,
  placeholder = "DD-MM-YYYY",
  minDate,
  maxDate,
  className,
}: DateFieldProps) {
  const [selectedDate, setSelectedDate] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="label">{label}</label>}
      <div className="relative">
        <input
          type="date"
          ref={inputRef}
          value={selectedDate}
          onChange={handleChange}
          placeholder={placeholder}
          min={minDate}
          max={maxDate}
          className={styles.inputField}
        />
      </div>
    </div>
  );
}
