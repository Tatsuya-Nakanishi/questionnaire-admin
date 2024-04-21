import { Stack, TextField, Typography } from "@mui/material";
import BasicButton from "@/components/atoms/BasicButton";

export default function Component() {
  return (
    <Stack
      height="100lvh" // 「100lvh」を「100vh」に修正しています
      justifyContent="center"
      alignItems="center"
      gap="32px"
    >
      <Typography
        className="text-xl" // 正しいクラス名の指定方法
        id="login_heading"
      >
        ログインフォーム
      </Typography>
      <Stack
        component="form"
        width={560}
        gap="24px"
        aria-labelledby="login_heading"
      >
        <TextField label="メールアドレス" />
        <TextField label="パスワード" type="password" />
        <BasicButton>ログイン</BasicButton>
      </Stack>
    </Stack>
  );
}
