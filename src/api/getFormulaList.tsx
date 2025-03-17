import {Formula} from "./type.ts";

export default async function getFormulaList(): Promise<Formula[]> {
    try {
        const res = await fetch(
            "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
        );
        const data: Formula[] = await res.json();
        return data;
    } catch (error) {
        throw new Error("Something went wrong 🫤");
    }
}