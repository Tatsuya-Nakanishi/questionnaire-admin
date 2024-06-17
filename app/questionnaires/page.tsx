import * as React from "react";
import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";
import { QuestionnaireType } from "@/types/types";
import QuestionnaireItemCard from "@/components/organisms/QuestionnaireItemCard/index";

import { config } from "@/config";
import { CompaniesFilters } from "@/components/dashboard/integrations/integrations-filters";

export const metadata = {
  title: `Integrations | Dashboard | ${config.site.name}`,
} satisfies Metadata;

async function fetchQuestionnaires() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questionnaires`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const questionnaires: QuestionnaireType[] = await res.json();
  return questionnaires;
}

export default async function Page() {
  const questionnaires = await fetchQuestionnaires();
  console.log(questionnaires[0].genreName);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">アンケート一覧</Typography>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
            <Button
              color="inherit"
              startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Import
            </Button>
            <Button
              color="inherit"
              startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            新規作成
          </Button>
        </div>
      </Stack>
      <CompaniesFilters />
      <Grid container spacing={3}>
        {questionnaires.map((questionnaire) => (
          <Grid key={questionnaire.id} lg={4} md={6} xs={12}>
            <QuestionnaireItemCard questionnaire={questionnaire} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
