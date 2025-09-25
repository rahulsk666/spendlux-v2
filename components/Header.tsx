import { fetchProfile } from "@/lib/profileActions";

import HeaderClient from "@/components/HeaderClient";

export default async function Header() {
  const user = await fetchProfile();

  return (
    <div>
      <div className="grid grid-cols-3 text-white">
        <HeaderClient user={user} />
      </div>
    </div>
  );
}
