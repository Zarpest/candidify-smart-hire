
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateStage } from "@/types";
import { BarChart } from "lucide-react";
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StageChartProps {
  data: {
    stage: CandidateStage;
    count: number;
  }[];
}

const stageNames = {
  [CandidateStage.APPLIED]: "Aplicados",
  [CandidateStage.SCREENING]: "Revisión",
  [CandidateStage.INTERVIEW]: "Entrevista",
  [CandidateStage.TECHNICAL]: "Técnica",
  [CandidateStage.FINAL]: "Final",
  [CandidateStage.OFFER]: "Oferta",
  [CandidateStage.HIRED]: "Contratados",
  [CandidateStage.REJECTED]: "Rechazados"
};

const StageChart = ({ data }: StageChartProps) => {
  const chartData = data.map(item => ({
    name: stageNames[item.stage],
    value: item.count
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Candidatos por Etapa</CardTitle>
          <CardDescription>Distribución de candidatos en el proceso</CardDescription>
        </div>
        <BarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartBarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tickMargin={20}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </RechartBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StageChart;
