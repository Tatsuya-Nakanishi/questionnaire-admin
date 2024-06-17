"use client";

import { Stack, TextField, Typography } from "@mui/material";
import BasicButton from "@/components/atoms/BasicButton/index";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session?.user);

  // if (session) {
  //   router.push("/dashboard"); // ログイン後のリダイレクト先
  // }

  const handleSubmit = async () => {
    try {
      // console.log(email);
      // console.log(password);
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      }).then((res) => {
        if (res?.error) {
          // console.log(res.error);
        } else {
          router.push("/dashboard");
        }
      });
      // signOut();
    } catch (err) {
      // console.log(err);
    }
    // console.log("サブミット");
  };

  return (
    <Stack
      height="100vh" // 「100lvh」を「100vh」に修正
      justifyContent="center"
      alignItems="center"
      gap="32px"
    >
      <Typography
        className="text-xl" // MUIのクラス名を直接使用する場合はsxプロパティを推奨
        id="login_heading"
        variant="h5" // テキストサイズの設定
      >
        ログインフォーム
      </Typography>
      <Stack
        component="form"
        width={560}
        gap="24px"
        aria-labelledby="login_heading"
      >
        <TextField
          label="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <BasicButton onClick={handleSubmit}>ログイン</BasicButton>
      </Stack>
    </Stack>
  );
}
