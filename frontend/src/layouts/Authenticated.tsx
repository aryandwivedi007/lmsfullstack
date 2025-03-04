
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import Badge from "@mui/material/Badge";
// import * as React from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../services/api";
// import { useAppSelector } from "../store/store";

// export default function Authanticated() {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const navigation = useNavigate();
//   const [logoutUser] = useLogoutMutation();

//   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (route?: "profile" | "logout") => {
//     return () => {
//       if (route) {
//         if (route === "logout") {
//           logoutUser();
//         } else {
//           navigation("/" + route);
//         }
//       }
//       setAnchorEl(null);
//     };
//   };

//   React.useEffect(() => {
//     if (!isAuthenticated) {
//       navigation("/login");
//     }
//   }, [isAuthenticated]);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ bgcolor: "white", color: "black", px: 2 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           {/* Left Side - Logo */}
//           <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: "none" }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
//               UdemyClone
//             </Typography>
//           </Box>

//           {/* Center - Search Bar */}
//           <Box sx={{ display: "flex", alignItems: "center", flex: 1, mx: 4 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 bgcolor: "#f2f2f2",
//                 px: 2,
//                 py: 0.8,
//                 borderRadius: 4,
//                 flex: 1,
//               }}
//             >
//               <SearchIcon sx={{ color: "gray" }} />
//               <InputBase placeholder="Search for courses..." sx={{ ml: 1, flex: 1 }} />
//             </Box>
//           </Box>

//           {/* Right Side - Icons */}
//           {isAuthenticated && (
//             <Box display="flex" alignItems="center" gap={2}>
//               {/* Cart Icon */}
//               <IconButton color="inherit">
//                 <Badge badgeContent={3} color="error">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </IconButton>

//               {/* Profile Menu */}
//               <IconButton size="large" onClick={handleMenu} color="inherit">
//                 <AccountCircle />
//               </IconButton>

//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose()}
//               >
//                 <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
//               </Menu>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Outlet />
//     </Box>
//   );
// }
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Create Course Icon
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";

export default function Authenticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: "profile" | "logout") => {
    return () => {
      if (route) {
        if (route === "logout") {
          logoutUser();
        } else {
          navigate("/" + route);
        }
      }
      setAnchorEl(null);
    };
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white", color: "black", px: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side - Logo */}
          <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
              UdemyClone
            </Typography>
          </Box>

          {/* Center - Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 1, mx: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f2f2f2",
                px: 2,
                py: 0.8,
                borderRadius: 4,
                flex: 1,
              }}
            >
              <SearchIcon sx={{ color: "gray" }} />
              <InputBase placeholder="Search for courses..." sx={{ ml: 1, flex: 1 }} />
            </Box>
          </Box>

          {/* Right Side - Icons */}
          {isAuthenticated && (
            <Box display="flex" alignItems="center" gap={2}>
              {/* Create Course Button */}
              <IconButton color="inherit" onClick={() => navigate("/create-course")}>
                <AddCircleOutlineIcon />
              </IconButton>

              {/* Profile Menu */}
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose()}
              >
                <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
                <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
