import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Stack,
  Paper
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface UpcomingMoviesFilterUIProps {
  onFilterChange: (filterName: string, value: string) => void;
  onResetFilters: () => void;
  filters: {
    genre: string;
    releaseFrom: string;
    releaseTo: string;
    minRating: string;
  };
}

const UpcomingMoviesFilterUI = ({ 
  onFilterChange, 
  onResetFilters,
  filters 
}: UpcomingMoviesFilterUIProps) => {

  return (
    <Paper 
      elevation={1}
      sx={{ 
        marginBottom: "24px", 
        padding: "20px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "8px" 
      }}
    >
      <Stack 
        spacing={2} 
        direction={{ xs: "column", sm: "row", lg: "row" }} 
        sx={{ 
          flexWrap: "wrap",
          alignItems: { xs: "stretch", sm: "flex-end" }
        }}
      >

      
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={filters.genre}
            onChange={(e) => onFilterChange("genre", e.target.value)}
            label="Genre"
          >
            <MenuItem value="0">All Genres</MenuItem>
            <MenuItem value="28">Action</MenuItem>
            <MenuItem value="12">Adventure</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="80">Crime</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="27">Horror</MenuItem>
            <MenuItem value="10749">Romance</MenuItem>
            <MenuItem value="878">Sci-Fi</MenuItem>
            <MenuItem value="53">Thriller</MenuItem>
          </Select>
        </FormControl>

     
        <TextField
          type="date"
          label="Release From"
          value={filters.releaseFrom}
          onChange={(e) => onFilterChange("releaseFrom", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />

     
        <TextField
          type="date"
          label="Release To"
          value={filters.releaseTo}
          onChange={(e) => onFilterChange("releaseTo", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />

    
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="rating-label">Min Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={filters.minRating}
            onChange={(e) => onFilterChange("minRating", e.target.value)}
            label="Min Rating"
          >
            <MenuItem value="0">All Ratings</MenuItem>
            <MenuItem value="5">5+</MenuItem>
            <MenuItem value="6">6+</MenuItem>
            <MenuItem value="7">7+</MenuItem>
            <MenuItem value="8">8+</MenuItem>
            <MenuItem value="9">9+</MenuItem>
          </Select>
        </FormControl>

      
        <Button 
          variant="outlined" 
          onClick={onResetFilters}
          startIcon={<ClearIcon />}
          sx={{ 
            minWidth: 120,
            textTransform: "none",
            fontSize: "1rem"
          }}
        >
          Reset Filters
        </Button>
      </Stack>
    </Paper>
  );
};

export default UpcomingMoviesFilterUI;
