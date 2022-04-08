import { writable } from "svelte/store";
import { persist, localStorage } from "@macfja/svelte-persistent-store";

export const values = persist(writable([]), localStorage(), "values");
