import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import QuestionnairesTable from "@/components/organisms/QuestionnairesTable/index";
import LineChart from "@/components/organisms/LineChart/index";
import PieChart from "@/components/organisms/PieChart";

export default function Home() {
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Paper elevation={3} sx={{ p: 5 }}>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3} sx={{ p: 5 }}>
              <PieChart />
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ p: 5, marginTop: 5 }}>
          <QuestionnairesTable />
        </Paper>
      </Container>
    </>
  );
}
