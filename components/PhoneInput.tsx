'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';

// Phone number with a country code picker: a native <select> (accessible, good on mobile)
// sits invisibly over a compact "PT +351" label. The full number ("+351 912…") is sent in a
// hidden input named `name`, so forms can read it with FormData like any other field.
export function PhoneInput({
  id,
  name = 'phone',
  className = '',
  inputClassName = '',
  countryLabel = 'Country code',
  placeholder = '912 345 678',
  autoFocus,
}: {
  id?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  countryLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [iso, setIso] = useState('PT');
  const [number, setNumber] = useState('');
  const country = COUNTRIES.find(c => c.iso === iso) ?? COUNTRIES[0];
  const full = number.trim() ? `${country.dial} ${number.trim()}` : '';

  return (
    <div className={`flex items-stretch ${className}`}>
      <div className="relative flex shrink-0 items-center border-r border-black/10 dark:border-white/10">
        <span className="pointer-events-none flex items-center gap-1.5 pl-3.5 pr-2 text-[15px] text-[#1d1d1f] dark:text-white" aria-hidden="true">
          <span className="rounded-md bg-black/[0.06] dark:bg-white/10 px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-black/60 dark:text-white/70">{country.iso}</span>
          {country.dial}
          <ChevronDown className="h-3.5 w-3.5 text-black/40 dark:text-white/40" />
        </span>
        <select
          aria-label={countryLabel}
          value={iso}
          onChange={e => setIso(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {COUNTRIES.map(c => <option key={c.iso} value={c.iso}>{c.name} ({c.dial})</option>)}
        </select>
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        autoFocus={autoFocus}
        value={number}
        onChange={e => setNumber(e.target.value.replace(/[^0-9 ()-]/g, ''))}
        maxLength={24}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent outline-none ${inputClassName}`}
      />
      <input type="hidden" name={name} value={full} />
    </div>
  );
}
