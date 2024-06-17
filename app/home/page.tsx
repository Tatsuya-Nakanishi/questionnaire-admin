import { Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import LineChart from "@/components/organisms/LineChart/index";
import PieChart from "@/components/organisms/PieChart";
import AnswersTable from "@/components/organisms/AnswersTable/index";
import { AnswerType } from "@/types/types";
import {
  RatioResultType,
  AnswersCountByDateResultType,
} from "@/api/home/route";

type HomeDataType = {
  answers: AnswerType[];
  ratio: RatioResultType[];
  answersCountByDate: AnswersCountByDateResultType[];
  totalQuestionnaires: number;
};

async function fetchHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
    // next: { revalidate: 30 },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: HomeDataType = await res.json();
  return data;
}

export default async function Page() {
  const homeData = await fetchHomeData();

  return (
    <>
      <Container>
        <Paper elevation={3} sx={{ p: 5, mt: 10 }}>
          <LineChart answersCountByDate={homeData.answersCountByDate} />
        </Paper>
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid item xs={7}>
            <Paper elevation={3} sx={{ p: 5, marginTop: 5 }}>
              <AnswersTable
                answers={homeData.answers}
                isDisplayAnswersLink={true}
              />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3} sx={{ p: 5 }}>
              <PieChart
                ratio={homeData.ratio}
                totalQuestionnaires={homeData.totalQuestionnaires}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
