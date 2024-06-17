import React from "react";
import { QuestionnaireType } from "@/types/types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Clock as ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";

type PropType = {
  questionnaire: QuestionnaireType;
};

export default function Component({ questionnaire }: PropType) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Avatar src={"/assets/q&a.png"} variant="square" />
            <Chip
              label={questionnaire.isPublic ? "公開済" : "非公開"}
              color={questionnaire.isPublic ? "primary" : "default"}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            />
          </Box>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {questionnaire.title}
            </Typography>
            <Typography align="center" variant="body1">
              カテゴリ：{questionnaire.genreName}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "space-between", p: 2 }}
      >
        <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
          <ClockIcon fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            最終更新日： {dayjs(questionnaire.updatedAt).format("MMM D, YYYY")}
          </Typography>
        </Stack>
        <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
          <Typography color="text.secondary" display="inline" variant="body2">
            回答数：{questionnaire.answerCount} 件
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
