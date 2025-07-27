"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [kw, setKw] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?keyword=${encodeURIComponent(kw)}`);
  };

  return (
    <form
      onSubmit={submit}
      className="flex gap-2 w-full max-w-md mx-auto my-8 px-2"
    >
      <div className="relative flex-1">
        <Input
          className="w-full pr-8"
          placeholder="キーワード検索..."
          value={kw}
          onChange={(e) => setKw(e.target.value)}
        />
        {kw && (
          <button
            type="button"
            onClick={() => setKw("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
          >
            ×
          </button>
        )}
      </div>
      <Button className="h-8 px-4 bg-accent text-xs rounded-lg">検索</Button>
    </form>
  );
}
