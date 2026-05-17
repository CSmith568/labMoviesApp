import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tvShowsAnchor, setTvShowsAnchor] = useState<HTMLButtonElement | null>(null);
  const [actorsAnchor, setActorsAnchor] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const tvShowsOpen = Boolean(tvShowsAnchor);
  const actorsOpen = Boolean(actorsAnchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

 const menuOptions = [
  { label: "Home", path: "/" },
  { label: "Favorites", path: "/movies/favourites" },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Fantasy Movies", path: "/fantasy" },
  {
    label: "TV Shows",
    subItems: [
      { label: "Popular", path: "/tv-shows/popular" },
      { label: "Top Rated", path: "/tv-shows/top-rated" },
      { label: "Trending", path: "/tv-shows/trending" },
    ],
  },
  {
    label: "Actors",
    subItems: [
      { label: "Popular Actors", path: "/actors/popular" },
      { label: "Top Rated", path: "/actors/top-rated" },
    ],
  },
];


  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
    setTvShowsAnchor(null);
    setActorsAnchor(null);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTvShowsMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setTvShowsAnchor(event.currentTarget);
  };

  const handleActorsMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setActorsAnchor(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setTvShowsAnchor(null);
    setActorsAnchor(null);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
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
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <div key={opt.label}>
                    {"subItems" in opt ? (
                      <>
                        <MenuItem disabled>{opt.label}</MenuItem>
                        {opt.subItems.map((subItem) => (
                          <MenuItem
                            key={subItem.label}
                            onClick={() => handleMenuSelect(subItem.path)}
                            sx={{ pl: 4 }}
                          >
                            {subItem.label}
                          </MenuItem>
                        ))}
                      </>
                    ) : (
                      <MenuItem onClick={() => handleMenuSelect(opt.path)}>
                        {opt.label}
                      </MenuItem>
                    )}
                  </div>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <div key={opt.label}>
                  {"subItems" in opt ? (
                    <>
                      <Button
                        color="inherit"
                        onClick={
                          opt.label === "TV Shows"
                            ? handleTvShowsMenu
                            : handleActorsMenu
                        }
                        endIcon={<ExpandMoreIcon />}
                      >
                        {opt.label}
                      </Button>
                      <Menu
                        anchorEl={
                          opt.label === "TV Shows" ? tvShowsAnchor : actorsAnchor
                        }
                        open={
                          opt.label === "TV Shows" ? tvShowsOpen : actorsOpen
                        }
                        onClose={handleCloseDropdown}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {opt.subItems.map((subItem) => (
                          <MenuItem
                            key={subItem.label}
                            onClick={() => handleMenuSelect(subItem.path)}
                          >
                            {subItem.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <Button
                      color="inherit"
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </Button>
                  )}
                </div>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SiteHeader;
