import { Button, Stack, TextField, Typography } from "@mui/material";

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
        <Button className="text-xl text-red" variant="contained">
          ログイン
        </Button>
      </Stack>
    </Stack>
  );
}
