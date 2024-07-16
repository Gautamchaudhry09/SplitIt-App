import React, { useContext } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AccountContext } from "../AppContext/AppContext";
import { deleteOccasion } from "../../service/api";

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
      "0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
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
  const { occasions, setOccasions, setTransactions, setFriends } =
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
    if (
      window.confirm(
        "Make sure you've saved the current split otherwise it'll be lost"
      )
    ) {
      setAnchorEl(null);
      setTransactions(occasion.transactions);
      setFriends(occasion.friends);
    }
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
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          bgcolor: "#FF69B4", 
          color: "#000000",
          "&:hover": {
            bgcolor: "#FF69B4", 
          },
        }}
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
        {occasions && occasions.length === 0 ? (
          <MenuItem disableRipple>
            <Typography sx={{color:"black"}}>No Saved Splits :)</Typography>
            <Divider sx={{ my: 0.5 }} />
          </MenuItem>
        ) : (
          occasions.map((occasion) => (
            <MenuItem
              key={occasion._id}
              onClick={() => handleOccClick(occasion)}
              disableRipple
              sx={{
                "&:hover": {
                  bgcolor: "#66CCCC", 
                },
              }}
            >
              <EditIcon sx={{ color: "#FF69B4", marginRight: "8px" }} />{" "}
              {/* Neon Pink icon */}
              <Typography sx={{color:"black"}}>{occasion.name}</Typography>
              <Box sx={{ marginLeft: "auto", cursor: "pointer" }}>
                <DeleteOutlineIcon
                  onClick={(event) => handleDeleteClick(event, occasion)}
                  sx={{
                    bgcolor: "red", 
                    "&:hover": {
                      boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
                      transition: "box-shadow 0.3s ease-in-out",
                    },
                  }}
                />
              </Box>
              <Divider sx={{ my: 0.5,bgcolor:"violet"  }} />
            </MenuItem>
          ))
        )}
      </StyledMenu>
    </div>
  );
};
