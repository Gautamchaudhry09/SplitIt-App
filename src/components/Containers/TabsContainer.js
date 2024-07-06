import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FinalTxns } from "../Final-transactions/FinalTxns";
import { Friends } from "../Add-friends/Friends";
import { Expenses } from "../Add-expenses/Expenses";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const TabsContainer = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: "65px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
        centered
        sx={{ bgcolor: "orange", borderRadius: "20px" }}
      >
        <Tab
          icon={<GroupAddIcon />}
          label="Friends"
          {...a11yProps(0)}
          sx={{ fontSize: "12px" }}
          disableRipple
        />
        <Tab
          icon={<AddCardIcon />}
          label="Expenses"
          {...a11yProps(1)}
          sx={{ fontSize: "12px" }}
          disableRipple
        />
        <Tab
          fontSize="small"
          icon={<AccountBalanceIcon />}
          label="Transaction Split"
          sx={{ fontSize: "12px" }}
          {...a11yProps(2)}
          disableRipple
        />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Friends />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Expenses />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <FinalTxns />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};
