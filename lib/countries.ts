// Dial codes for the contact form's phone field: Portugal first, then the markets we talk to
// most, then the rest alphabetically.

export type Country = { iso: string; name: string; dial: string };

const LIST: Country[] = [
  { iso: 'PT', name: 'Portugal', dial: '+351' },
  { iso: 'ES', name: 'España', dial: '+34' },
  { iso: 'GB', name: 'United Kingdom', dial: '+44' },
  { iso: 'BR', name: 'Brasil', dial: '+55' },
  { iso: 'AO', name: 'Angola', dial: '+244' },
  { iso: 'MZ', name: 'Moçambique', dial: '+258' },
  { iso: 'CV', name: 'Cabo Verde', dial: '+238' },
  { iso: 'US', name: 'United States', dial: '+1' },
  { iso: 'FR', name: 'France', dial: '+33' },
  { iso: 'DE', name: 'Deutschland', dial: '+49' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { iso: 'AR', name: 'Argentina', dial: '+54' },
  { iso: 'AT', name: 'Österreich', dial: '+43' },
  { iso: 'AU', name: 'Australia', dial: '+61' },
  { iso: 'BE', name: 'Belgique', dial: '+32' },
  { iso: 'CA', name: 'Canada', dial: '+1' },
  { iso: 'CH', name: 'Schweiz', dial: '+41' },
  { iso: 'CL', name: 'Chile', dial: '+56' },
  { iso: 'CO', name: 'Colombia', dial: '+57' },
  { iso: 'CZ', name: 'Česko', dial: '+420' },
  { iso: 'DK', name: 'Danmark', dial: '+45' },
  { iso: 'FI', name: 'Suomi', dial: '+358' },
  { iso: 'GR', name: 'Ελλάδα', dial: '+30' },
  { iso: 'GW', name: 'Guiné-Bissau', dial: '+245' },
  { iso: 'IE', name: 'Ireland', dial: '+353' },
  { iso: 'IN', name: 'India', dial: '+91' },
  { iso: 'IT', name: 'Italia', dial: '+39' },
  { iso: 'LU', name: 'Luxembourg', dial: '+352' },
  { iso: 'MA', name: 'Maroc', dial: '+212' },
  { iso: 'MX', name: 'México', dial: '+52' },
  { iso: 'NL', name: 'Nederland', dial: '+31' },
  { iso: 'NO', name: 'Norge', dial: '+47' },
  { iso: 'PL', name: 'Polska', dial: '+48' },
  { iso: 'RO', name: 'România', dial: '+40' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'SE', name: 'Sverige', dial: '+46' },
  { iso: 'ST', name: 'São Tomé e Príncipe', dial: '+239' },
  { iso: 'TL', name: 'Timor-Leste', dial: '+670' },
  { iso: 'ZA', name: 'South Africa', dial: '+27' },
];

export const COUNTRIES = LIST;
