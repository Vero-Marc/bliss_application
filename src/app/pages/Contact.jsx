import { Box, Grid, Typography, TextField, Button } from "@mui/material";
// import { Facebook, Instagram, Twitter, Phone, Email, LocationOn } from '@mui/icons-material';
import React, { useState, useContext, useCallback } from "react";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { Container } from "react-bootstrap";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../pages/style/contact.css";
import AuthContext from "../services/AuthContext";
import Popup from "../components/Popup";

import contact_img from "../../assets/images/contact-img.jpg";
const ContactPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const { contact } = useContext(AuthContext);

  const handleChange = (e) => {
    setContactData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const email = "info@thepurebliss.in";
  const phoneNumber = "+91 63474321199";
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Pure+bliss,+2/689+2nd+main+road,+Ranga+Reddy+Garden,+Neelankarai,+Chennai+-+600041,+Tamilnadu";
  
  const googleMapsUrlMarketedBy = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Rao Apparels private Limited,33AACCR1307A1ZA, Door No.4, Plot no.200 & 201, South 1st cross road, Sri Kapaleeshwarar nagar, Neelankarai, Chennai - 600041")}`;
  


  const handleSubmit = useCallback(
    async (event) => {
      try {
        const res = await contact(contactData, "contact_api");
        if (res.ok) {
          setOpen(true);
          setContactData({
            name: "",
            email: "",
            mobile: "",
            message: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [contactData, contact]
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Box sx={{ backgroundColor: "#ECE6D8" }}>
      <Container>
        <Box
          sx={{
            // width: '100%',
            minHeight: "100vh",
            // loading="lazy" src={`${process.env.PUBLIC_URL}/main-images/contact-img.jpg`}
            backgroundImage: `url(${contact_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Popup
            open={open}
            handleClose={handleClose}
            severity="success"
            message={"Message sent Successfully"}
          />

          <Grid
            container
            spacing={5}
            sx={{
              maxWidth: 800,
              bgcolor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 2,
              margin: 1,
              // padding:1
            }}
           >
            {/* Left Side - Contact Info */}
            <Grid item xs={12} md={5} sx={{ color: "#fff", p: 6 }}>
               <div className="contact-details">
                <h1 className="contact-title">PURE</h1>
                <h1 className="contact-title">BLISS</h1>
                <h1 className="contact-subtitle">INCENSE FRAGRANCE</h1>

                <div className="con-icons">
                  <InstagramIcon />
                  <FacebookIcon />
                  <TwitterIcon />
                </div>

                <Grid
                  container
                  spacing={1}
                  className="reachus-section"
                  // sx={{ fontWeight: 100, marginLeft: "8px" }}
                 >
                  <Grid item xs={12}>
                    <Typography variant="body2" className="contact-info">
                      Reach us :
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" className="contact-info">
                      <PhoneInTalkIcon fontSize="small" />
                      <a
                        href={`tel:${phoneNumber}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {phoneNumber}
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" className="contact-info">
                      <EmailIcon fontSize="small" />
                      <a
                        href={`mailto:${email}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {email}
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" className="contact-info">
                      <LocationOnIcon fontSize="small" />
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Pure bliss, 2/689 2nd main road, Ranga Reddy Garden,
                        Neelankarai, Chennai - 600041, Tamilnadu
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" className="contact-info">
                      Marketed By :
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" className="contact-info">
                      <LocationOnIcon fontSize="small" />
                      <a
                        href={googleMapsUrlMarketedBy}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Rao Apparels Pvt. Ltd,
                        Door No.4, Plot No.200 & 201, South 1st cross road,
                        Sri Kapaleeshwarar Nagar, Neelankarai , Chennai - 600041
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
               </div>
            </Grid>

            {/* Right Side - Contact Form */}
            <Grid item xs={12} md={7} sx={{ p: 4 }}>
              <Box className="contact-form">
                <form>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    size="small"
                    value={contactData.name}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    onChange={(e) => handleChange(e)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    label="Email ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={contactData.email}
                    onChange={(e) => handleChange(e)}
                    name="email"
                    type="email"
                    size="small"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleChange(e)}
                    name="mobile"
                    value={contactData.mobile}
                    type="tel"
                    size="small"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="message"
                    value={contactData.message}
                    size="medium"
                    multiline
                    onChange={(e) => handleChange(e)}
                    rows={4}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "#8B4513",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#543310",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
