import type { Audience } from "./audience-cookie";

export type PersonaChosenDetail = {
  audience: Audience;
  source: "landing";
};

export function trackPersonaChosen(audience: Audience): void {
  const detail: PersonaChosenDetail = { audience, source: "landing" };
  window.dispatchEvent(new CustomEvent("persona_chosen", { detail }));
}
