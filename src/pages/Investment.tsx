
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/ui/stat-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

type TransactionType = "investment" | "earning";

const Investment = () => {
  const { transactions, addTransaction, removeTransaction, totalInvestment, totalEarnings } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("investment");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  
  const handleAddTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    addTransaction({
      type: transactionType,
      amount: parseFloat(amount),
      description: description || `${transactionType === "investment" ? "Investment" : "Earning"}`,
    });
    
    setAmount("");
    setDescription("");
    setShowAddDialog(false);
  };
  
  // Prepare chart data
  const chartData = (() => {
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
        earning: monthEarnings
      };
    });
  })();
  
  // Calculate ROI
  const roi = totalInvestment > 0 
    ? ((totalEarnings - totalInvestment) / totalInvestment) * 100
    : 0;
  
  return (
    <div className="space-y-6 pb-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          title="Total Investment" 
          value={`$${totalInvestment.toFixed(2)}`}
          icon={<TrendingDown className="w-4 h-4" />}
          className="gradient-card from-dropdeck-purple/20 to-dropdeck-purple/5"
        />
        <StatCard 
          title="Total Earnings" 
          value={`$${totalEarnings.toFixed(2)}`}
          icon={<TrendingUp className="w-4 h-4" />}
          className="gradient-card from-dropdeck-green/30 to-dropdeck-green/5"
        />
        <StatCard 
          title="ROI" 
          value={`${roi.toFixed(2)}%`}
          className={`gradient-card ${roi >= 0 
            ? "from-dropdeck-green/30 to-dropdeck-green/5" 
            : "from-destructive/30 to-destructive/5"}`}
        />
        <StatCard 
          title="Monthly Avg. Earning" 
          value={`$${(totalEarnings / 6).toFixed(2)}`}
          className="gradient-card from-dropdeck-blue/30 to-dropdeck-blue/5"
        />
      </div>
      
      <div className="h-64 bg-card rounded-xl p-4 border border-border">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="investment" name="Investment" fill="#9b87f5" />
            <Bar dataKey="earning" name="Earning" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between gap-4">
        <Button 
          variant="outline" 
          className="flex-1 bg-dropdeck-purple text-white hover:bg-dropdeck-purple/90"
          onClick={() => {
            setTransactionType("investment");
            setShowAddDialog(true);
          }}
        >
          Add Investment
        </Button>
        <Button 
          variant="outline"
          className="flex-1 bg-dropdeck-green border-dropdeck-green/20 text-black hover:bg-dropdeck-green/90"
          onClick={() => {
            setTransactionType("earning");
            setShowAddDialog(true);
          }}
        >
          Add Earning
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4 space-y-2">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <div className="flex items-center">
                  {transaction.type === "investment" ? (
                    <TrendingDown className="w-5 h-5 text-dropdeck-purple mr-3" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={transaction.type === "investment" ? "text-dropdeck-purple" : "text-green-500"}>
                    {transaction.type === "investment" ? "-" : "+"}${transaction.amount.toFixed(2)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeTransaction(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="investments" className="mt-4 space-y-2">
          {transactions.filter(t => t.type === "investment").length > 0 ? (
            transactions
              .filter(t => t.type === "investment")
              .map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                >
                  <div className="flex items-center">
                    <TrendingDown className="w-5 h-5 text-dropdeck-purple mr-3" />
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-dropdeck-purple">
                      -${transaction.amount.toFixed(2)}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No investments yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="earnings" className="mt-4 space-y-2">
          {transactions.filter(t => t.type === "earning").length > 0 ? (
            transactions
              .filter(t => t.type === "earning")
              .map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                >
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">
                      +${transaction.amount.toFixed(2)}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No earnings yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add {transactionType === "investment" ? "Investment" : "Earning"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount ($)
              </label>
              <Input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={transactionType === "investment" ? "Investment description" : "Earning description"}
              />
            </div>
            <Button 
              className="w-full"
              onClick={handleAddTransaction}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Add {transactionType === "investment" ? "Investment" : "Earning"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Investment;
