"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const [kw, setKw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?keyword=${encodeURIComponent(kw)}`);
  };

  return (
    <form
      onSubmit={submit}
      className="flex gap-2 max-w-lg mx-auto my-10 items-center"
    >
      <Input
        className="flex-1"
        placeholder="キーワード検索..."
        value={kw}
        onChange={(e) => setKw(e.target.value)}
      />
      <Button type="submit">検索</Button>
    </form>
  );
}
