import "@/styles.css";
import LoginForm from "./components/LoginForm";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
