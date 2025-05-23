import { Formula } from "./type";

export default async function getFormulaList(): Promise<Formula[]> {
  try {
    const res = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete",
    );
    return await res.json();
  } catch (error) {
    throw new Error("Something went wrong 🫤");
  }
}
