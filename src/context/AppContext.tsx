
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define types for our data
export interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  tge?: string;
  funding?: string;
  reward?: string;
  type?: string;
  tags: string[];
  joined: boolean;
  favorite: boolean;
  externalLink?: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  completed: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: "investment" | "earning";
  amount: number;
  description: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  tags: string[];
}

// Define the context shape
interface AppContextType {
  projects: Project[];
  myProjects: Project[];
  tasks: Task[];
  transactions: Transaction[];
  news: NewsItem[];
  
  joinProject: (projectId: string) => void;
  leaveProject: (projectId: string) => void;
  toggleFavorite: (projectId: string) => void;
  
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  removeTransaction: (id: string) => void;
  
  totalInvestment: number;
  totalEarnings: number;
  taskCompletionRate: number;
}

// Create context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample project data for the explore tab
const sampleProjects: Project[] = [
  {
    id: "blockmesh",
    name: "Blockmesh",
    description: "Decentralized mesh network protocol",
    logo: "/images/projects/blockmesh.jpg",
    tags: ["testnet", "protocol"],
    joined: false,
    favorite: false,
    externalLink: "https://blockmesh.example",
  },
  {
    id: "taker",
    name: "Taker",
    description: "Peer-to-peer trading platform",
    logo: "/images/projects/taker.jpg",
    tags: ["defi", "trading"],
    joined: false,
    favorite: false,
    externalLink: "https://taker.example",
  },
  {
    id: "bless",
    name: "Bless",
    description: "Charity and donation blockchain platform",
    logo: "/images/projects/bless.jpg",
    tags: ["social", "finance"],
    joined: false,
    favorite: false,
    externalLink: "https://bless.example",
  },
  {
    id: "cess",
    name: "Cess",
    description: "Cloud elastic storage system",
    logo: "/images/projects/cess.jpg",
    tags: ["storage", "cloud"],
    joined: false,
    favorite: false,
    externalLink: "https://cess.example",
  },
  {
    id: "beamable",
    name: "Beamable",
    description: "Gaming infrastructure on blockchain",
    logo: "/images/projects/beamable.jpg",
    tags: ["gaming", "infrastructure"],
    joined: false,
    favorite: false,
    externalLink: "https://beamable.example",
  },
  {
    id: "pod",
    name: "P.o.d",
    description: "Proof of development protocol",
    logo: "/images/projects/pod.jpg",
    tags: ["development", "protocol"],
    joined: false,
    favorite: false,
    externalLink: "https://pod.example",
  },
  {
    id: "ofc",
    name: "OFC",
    description: "Open finance collective",
    logo: "/images/projects/ofc.jpg",
    tags: ["finance", "collective"],
    joined: false,
    favorite: false,
    externalLink: "https://ofc.example",
  },
  {
    id: "newton",
    name: "Newton",
    description: "Physics-based blockchain consensus",
    logo: "/images/projects/newton.jpg",
    tags: ["consensus", "protocol"],
    joined: false,
    favorite: false,
    externalLink: "https://newton.example",
  },
  {
    id: "billions",
    name: "Billions",
    description: "Mass adoption payment solution",
    logo: "/images/projects/billions.jpg",
    tags: ["payments", "scaling"],
    joined: false,
    favorite: false,
    externalLink: "https://billions.example",
  },
  {
    id: "monadscore",
    name: "Monad Score",
    description: "Credit scoring for Web3",
    logo: "/images/projects/monadscore.jpg",
    tags: ["identity", "finance"],
    joined: false,
    favorite: false,
    externalLink: "https://monadscore.example",
  },
  {
    id: "malda",
    name: "Malda[soon]",
    description: "Coming soon platform",
    logo: "/images/projects/malda.jpg",
    tags: ["upcoming"],
    joined: false,
    favorite: false,
    externalLink: "https://malda.example",
  },
  {
    id: "recall",
    name: "Recall",
    description: "Decentralized memory storage",
    logo: "/images/projects/recall.jpg",
    tags: ["storage", "memory"],
    joined: false,
    favorite: false,
    externalLink: "https://recall.example",
  },
  {
    id: "arichan",
    name: "Ari Chan Wallet",
    description: "Referral code: 67ea953c38d2f",
    logo: "/images/projects/arichan.jpg",
    tags: ["wallet", "referral"],
    joined: false,
    favorite: false,
    externalLink: "https://arichan.example",
  },
  {
    id: "exabits",
    name: "Exabits",
    description: "Zelay and Galxe integration",
    logo: "/images/projects/exabits.jpg",
    tags: ["integration", "platform"],
    joined: false,
    favorite: false,
    externalLink: "https://exabits.example",
  },
  {
    id: "grass",
    name: "Grass",
    description: "Green blockchain initiative",
    logo: "/images/projects/grass.jpg",
    tags: ["eco", "sustainable"],
    joined: false,
    favorite: false,
    externalLink: "https://grass.example",
  },
  {
    id: "coresky",
    name: "Coresky",
    description: "Core infrastructure for dapps",
    logo: "/images/projects/coresky.jpg",
    tags: ["infrastructure", "development"],
    joined: false,
    favorite: false,
    externalLink: "https://coresky.example",
  },
  {
    id: "interlink",
    name: "Interlink",
    description: "Cross-chain interoperability",
    logo: "/images/projects/interlink.jpg",
    tags: ["interoperability", "cross-chain"],
    joined: false,
    favorite: false,
    externalLink: "https://interlink.example",
  },
  {
    id: "ethblockscout",
    name: "Eth Block Scout",
    description: "Ethereum block explorer",
    logo: "/images/projects/ethblockscout.jpg",
    tags: ["explorer", "ethereum"],
    joined: false,
    favorite: false,
    externalLink: "https://ethblockscout.example",
  },
  {
    id: "haust",
    name: "Haust",
    description: "Decentralized hosting solution",
    logo: "/images/projects/haust.jpg", 
    tags: ["hosting", "storage"],
    joined: false,
    favorite: false,
    externalLink: "https://haust.example",
  },
  {
    id: "3dos",
    name: "3DOS",
    description: "May not work on mobile",
    logo: "/images/projects/3dos.jpg",
    tags: ["operating", "system"],
    joined: false,
    favorite: false,
    externalLink: "https://3dos.example",
  },
  {
    id: "dvin",
    name: "DVIN",
    description: "Decentralized virtual infrastructure",
    logo: "/images/projects/dvin.jpg",
    tags: ["infrastructure", "virtual"],
    joined: false,
    favorite: false,
    externalLink: "https://dvin.example",
  },
];

// Sample news items
const sampleNews: NewsItem[] = [
  {
    id: "news1",
    title: "Top Airdrops to Watch in Q2 2025",
    description: "A comprehensive guide to the most promising airdrops coming in the next quarter.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    image: "/images/news/airdrops-q2.jpg",
    date: "2025-04-15",
    tags: ["airdrop", "guide"],
  },
  {
    id: "news2",
    title: "How to Maximize Your Airdrop Earnings",
    description: "Expert strategies for participating in airdrops effectively.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    image: "/images/news/maximize-earnings.jpg",
    date: "2025-04-10",
    tags: ["strategy", "earnings", "airdrop"],
  },
  {
    id: "news3",
    title: "Market Analysis: Tokens After Airdrops",
    description: "How airdropped tokens perform in their first 90 days.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    image: "/images/news/market-analysis.jpg",
    date: "2025-04-05",
    tags: ["market", "analysis", "tokenomics"],
  },
];

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load initial data from localStorage or use defaults
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("dropdeck_projects");
    return savedProjects ? JSON.parse(savedProjects) : sampleProjects;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("dropdeck_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("dropdeck_transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [news] = useState<NewsItem[]>(sampleNews);
  
  // Derived state
  const myProjects = projects.filter((project) => project.joined);
  
  const totalInvestment = transactions
    .filter((t) => t.type === "investment")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalEarnings = transactions
    .filter((t) => t.type === "earning")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem("dropdeck_projects", JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    localStorage.setItem("dropdeck_tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem("dropdeck_transactions", JSON.stringify(transactions));
  }, [transactions]);
  
  // Reset tasks at midnight
  useEffect(() => {
    const checkForReset = () => {
      const lastReset = localStorage.getItem("dropdeck_last_reset");
      const today = new Date().toDateString();
      
      if (lastReset !== today) {
        localStorage.setItem("dropdeck_last_reset", today);
        setTasks([]);
      }
    };
    
    checkForReset();
    
    const interval = setInterval(checkForReset, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Project functions
  const joinProject = (projectId: string) => {
    setProjects(projects.map((project) => 
      project.id === projectId ? { ...project, joined: true } : project
    ));
  };
  
  const leaveProject = (projectId: string) => {
    setProjects(projects.map((project) => 
      project.id === projectId ? { ...project, joined: false } : project
    ));
    
    // Remove all tasks associated with this project
    setTasks(tasks.filter((task) => task.projectId !== projectId));
  };
  
  const toggleFavorite = (projectId: string) => {
    setProjects(projects.map((project) => 
      project.id === projectId ? { ...project, favorite: !project.favorite } : project
    ));
  };
  
  // Task functions
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
  };
  
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };
  
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  // Transaction functions
  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `transaction-${Date.now()}`,
      date: new Date().toISOString(),
    };
    
    setTransactions([...transactions, newTransaction]);
  };
  
  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  
  // Context value
  const value = {
    projects,
    myProjects,
    tasks,
    transactions,
    news,
    
    joinProject,
    leaveProject,
    toggleFavorite,
    
    addTask,
    updateTask,
    removeTask,
    
    addTransaction,
    removeTransaction,
    
    totalInvestment,
    totalEarnings,
    taskCompletionRate,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
