import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Categorie } from "../../models/categorie";

const MainForm = () => {
  const { handleSubmit, control } = useForm();
  const [categories, setCategories] = useState<Categorie[]>([]);
  const navigator = useNavigate();

  const onSubmit = (data: any) => {
    navigator("/questions", {
      state: data,
    });
  };

  const getCategories = () => {
    axios.get(`https://opentdb.com/api_category.php`).then((res) => {
      setCategories(res.data.trivia_categories);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12">
          <Controller
            name="user"
            control={control}
            defaultValue=""
            rules={{ required: "The user is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                id="outlined-basic"
                label="User"
                variant="outlined"
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                style={{ minWidth: "18rem" }}
              />
            )}
          />
        </div>
        <div className="col-12">
          <Controller
            name="categorie"
            control={control}
            defaultValue=""
            rules={{ required: "The categorie is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className="mb-3 mt-3"
                name="categorie"
                style={{ minWidth: "18rem" }}
                label="Categoria"
                onChange={onChange}
                value={value}
                helperText={error ? error.message : null}
                error={!!error}
                select
              >
                {categories.map((categorie: Categorie, index: number) => (
                  <MenuItem key={index} value={categorie.id}>
                    {categorie.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <div className="col-12">
          <Controller
            name="difficulty"
            control={control}
            defaultValue=""
            rules={{ required: "The difficulty is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className="mb-3"
                name="difficulty"
                style={{ minWidth: "18rem" }}
                label="Dificultad"
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                select
              >
                <MenuItem value="Any Difficulty">Any Difficulty</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="heard">Hard</MenuItem>
              </TextField>
            )}
          />
        </div>
        <div className="col-12">
          <Button variant="contained" type="submit" className="mb-3">
            Ingresar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
