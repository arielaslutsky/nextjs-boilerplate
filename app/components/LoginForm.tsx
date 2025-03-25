"use client";

import { BASE_URL } from "@/common";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles.css";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "./ui/card";
import { Input } from "./ui/input";

type User = {
  name: string;
  email: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [error, setError] = useState<string>("");

  const login = async () => {
    try {
      const url = BASE_URL + "/auth/login";
      const response = await fetch(url, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        router.push("/dogs");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setError(searchParams.get("sessionExpired") ? "Session Expired" : "");
  }, []);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                value={user.name}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    name: e.target.value
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value
                  }))
                }
              />
            </div>
          </div>
          {error != "" && (
            <div className="error-box">
              <p className="error-message">
                Your session has expired. Please log in again.
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() =>
            setUser({
              name: "",
              email: ""
            })
          }
        >
          Cancel
        </Button>
        <Button onClick={login}>Log In</Button>
      </CardFooter>
    </Card>
  );
}
