import * as React from "react";
import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";
import { config } from "@/config";
import { CompaniesFilters } from "@/components/dashboard/integrations/integrations-filters";
import AnswersTable from "@/components/organisms/AnswersTable/index";
import { AnswerType } from "@/types/types";

export const metadata = {
  title: `Integrations | Dashboard | ${config.site.name}`,
} satisfies Metadata;

async function fetchAnswers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answers`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const questionnaires: AnswerType[] = await res.json();
  return questionnaires;
}

export default async function Page() {
  const answers: AnswerType[] = await fetchAnswers();
  console.log(answers);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">解答一覧</Typography>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
            <Button
              color="inherit"
              startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
            >
              {answers[0].questionnaireTitle}
            </Button>
            <Button
              color="inherit"
              startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <CompaniesFilters />
      <Grid container spacing={3}>
        <AnswersTable answers={answers} />
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
