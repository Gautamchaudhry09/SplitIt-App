import { Divider } from "@mui/material";
import "./App.css";
import { AddFriends } from "./components/Add-friends/AddFriends";
import { FriendList } from "./components/Add-friends/FriendList";
import { Friends } from "./components/Add-friends/Friends";
import { AccountProvider } from "./components/AppContext/AppContext";
import { AddExpenses } from "./components/Add-expenses/AddExpenses";
import { ExpensesList } from "./components/Add-expenses/ExpensesList";
import { Expenses } from "./components/Add-expenses/Expenses";
import { FinalTxns } from "./components/Final-transactions/FinalTxns";
import { TabsContainer } from "./components/Containers/TabsContainer";
import { MainContainer } from "./components/Containers/MainContainer";

function App() {
  return (
    <AccountProvider>
      <MainContainer />
    </AccountProvider>
  );
}

export default App;
