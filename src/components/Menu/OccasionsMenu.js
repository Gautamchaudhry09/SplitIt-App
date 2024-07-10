import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AccountContext } from "../AppContext/AppContext";
import { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteOccasion } from "../../service/api";
import { Box, Typography } from "@mui/material";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const OccasionsMenu = () => {
  const { occasions, setOccasions, user, setTransactions, setFriends } =
    useContext(AccountContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (occasion) => {
    setAnchorEl(null);
    // setTransactions(occasion.transactions);
    // setFriends(occasion.friends);
  };

  const handleOccClick = (occasion) => {
    setAnchorEl(null);
    setTransactions(occasion.transactions);
    setFriends(occasion.friends);
  };

  const handleDeleteOccasion = async (occasion) => {
    setOccasions(occasions.filter((occ) => occ._id !== occasion._id));
    await deleteOccasion({ _id: occasion._id });
  };

  const handleDeleteClick = (event, occasion) => {
    event.stopPropagation(); // Stop event propagation to prevent MenuItem click
    handleDeleteOccasion(occasion); // Handle DeleteIcon click
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        // color="success"
        sx={{ margin: "10px" }}
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        // disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Saved Splits
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {occasions && occasions.length == 0 ? (
          <MenuItem disableRipple>
            <Typography>No Saved Splits :)</Typography>
            <Divider sx={{ my: 0.5 }} />
          </MenuItem>
        ) : (
          <></>
        )}
        {occasions &&
          occasions.map((occasion) => (
            <MenuItem onClick={() => handleOccClick(occasion)} disableRipple>
              <EditIcon />
              {occasion.name}
              <Box sx={{ marginLeft: "auto", cursor: "" }}>
                <DeleteOutlineIcon
                  onClick={(event) => handleDeleteClick(event, occasion)}
                  sx={{
                    "&:hover": {
                      boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)", // red glow effect
                      transition: "box-shadow 0.3s ease-in-out",
                    },
                  }}
                />
              </Box>
              <Divider sx={{ my: 0.5 }} />
            </MenuItem>
          ))}
      </StyledMenu>
    </div>
  );
};
