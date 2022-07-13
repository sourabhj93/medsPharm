import * as React from "react";
import { Accordion, Grid } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackgroundLetterAvatars from "../Avatar/Avatar";
import "./Accordion.css";

export const SimpleAccordion = ({ productsName, brandName }) => {
  return (
    <div className="borderRadius">
      <Accordion sx={{ marginTop: { xs: 3, md: 0 } }} defaultExpanded>
        <AccordionSummary
          sx={{
            backgroundColor: "azure !important",
            marginTop: { xs: 3, md: 0 },
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" sx={{ color: "teal" }}>
            {productsName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: 160, overflowY: "auto", ml: 2 }}>
          <Grid container spacing={4}>
            {brandName.map((brand) => (
              <Grid item md={4} xs={6}>
                <BackgroundLetterAvatars brandObj={brand} />
                <Typography
                  sx={{
                    color: "teal",
                    fontSize: 16,
                    fontWeight: 500,
                    marginTop: 1,
                  }}
                  className="accordion-content"
                  key={brand.id}
                  variant="body1"
                >
                  {brand.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
