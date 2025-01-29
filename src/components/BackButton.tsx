"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="position-absolute top-0 start-0 m-3">
      <button className="btn btn-outline-secondary" onClick={() => router.back()}>
      <i className="bi bi-arrow-left"></i>      </button>
    </div>
  );
}
