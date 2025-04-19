
import { useApp } from "@/context/AppContext";
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend
} from "recharts";
import { format } from "date-fns";

const Statistics = () => {
  const { 
    transactions, 
    projects, 
    taskCompletionRate, 
    myProjects,
    totalInvestment,
    totalEarnings
  } = useApp();
  
  // Monthly data for investments and earnings
  const monthlyData = (() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now);
      date.setMonth(now.getMonth() - 5 + i);
      return date;
    });
    
    return months.map(date => {
      const monthName = format(date, "MMM");
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthInvestments = transactions
        .filter(t => t.type === "investment" && new Date(t.date) >= monthStart && new Date(t.date) <= monthEnd)
        .reduce((sum, t) => sum + t.amount, 0);
        
      const monthEarnings = transactions
        .filter(t => t.type === "earning" && new Date(t.date) >= monthStart && new Date(t.date) <= monthEnd)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        name: monthName,
        investment: monthInvestments,
        earning: monthEarnings,
        profit: monthEarnings - monthInvestments
      };
    });
  })();
  
  // Data for project leaderboard
  const leaderboardData = [...projects]
    .sort((a, b) => {
      const fundingA = a.funding ? parseFloat(a.funding.replace(/[^0-9.-]+/g, "")) : 0;
      const fundingB = b.funding ? parseFloat(b.funding.replace(/[^0-9.-]+/g, "")) : 0;
      return fundingB - fundingA;
    })
    .slice(0, 10)
    .map(project => ({
      name: project.name,
      funding: project.funding ? parseFloat(project.funding.replace(/[^0-9.-]+/g, "")) : 0
    }));
  
  // Data for joined projects vs all projects
  const projectsData = [
    { name: "Joined", value: myProjects.length },
    { name: "Not Joined", value: projects.length - myProjects.length }
  ];
  
  // Data for investments vs earnings
  const financialData = [
    { name: "Investments", value: totalInvestment },
    { name: "Earnings", value: totalEarnings }
  ];
  
  // Colors for pie charts
  const COLORS = ["#9b87f5", "#E5DEFF", "#4ade80", "#F2FCE2"];
  
  return (
    <div className="space-y-8 pb-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-medium mb-4">Monthly Financial Overview</h2>
        <div className="bg-card rounded-lg p-4 border border-border h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="investment" 
                stroke="#9b87f5" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="earning" 
                stroke="#4ade80" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#f43f5e" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-4">Leaderboard Ranking (By Funding)</h2>
        <div className="bg-card rounded-lg p-4 border border-border h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={leaderboardData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 11 }} 
                width={80} 
              />
              <Tooltip />
              <Bar dataKey="funding" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-medium mb-4">Task Completion</h2>
          <div className="bg-card rounded-lg p-4 border border-border h-64 flex items-center justify-center">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="w-32 h-32 relative mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-muted stroke-2 fill-none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-dropdeck-purple stroke-2 fill-none"
                    strokeDasharray={`${taskCompletionRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{Math.round(taskCompletionRate)}%</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Task Completion Rate</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Project Progress</h2>
          <div className="bg-card rounded-lg p-4 border border-border h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Investment vs Earnings</h2>
          <div className="bg-card rounded-lg p-4 border border-border h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financialData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                >
                  {financialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
