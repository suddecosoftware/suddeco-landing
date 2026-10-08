// Capture only the campaign fields supported by the registration intake.
// Read on submission: no tracking request, cookie or cross-page storage.
export function getDemoCampaign(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const campaign: Record<string, string> = {};
  for (const key of ["utm_source", "utm_campaign", "utm_content"]) {
    const value = params.get(key)?.trim().slice(0, 128);
    if (value) campaign[key] = value;
  }
  return campaign;
}
