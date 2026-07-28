import { redirect } from "next/navigation";

/** Legacy route — keep URL working by sending users to the real policy page. */
export default function Privacy() {
  redirect("/privacy-policy");
}
