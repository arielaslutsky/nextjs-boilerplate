"use client";

import "@/styles.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/app/common";

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    fetch(BASE_URL + `/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        router.push("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-end">
      <Button variant="link" onClick={logout}>
        Log out
      </Button>
    </div>
  );
};

export default LogoutButton;
