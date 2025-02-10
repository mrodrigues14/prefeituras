"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); 
  }, [router]);

  return (
    <div className="d-flex vh-100 w-100 justify-content-center align-items-center"
      style={{ backgroundColor: "rgb(18, 7, 139)" }}>
    </div>
  );
}
