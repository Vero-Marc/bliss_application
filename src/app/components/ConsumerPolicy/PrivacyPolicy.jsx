import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./policies.css";
const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

function PrivacyPolicy() {
  const email = "info@thepurebliss.in";
  const phoneNumber = "+91 63474321199";
  // const googleMapsUrl =
  //   "https://www.google.com/maps/search/?api=1&query=Pure+bliss,+2/689+2nd+main+road,+Ranga+Reddy+Garden,+Neelankarai,+Chennai+-+600041,+Tamilnadu";
  
  return (
    <div className="profile-div">
      <Container maxWidth="md" className="profile_container">
        <ProfileContainer className="profile_container">
        <Typography
            variant="h5"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              padding: "20px",
              fontSize: "1rem",
              fontWeight: "600",
              letterSpacing: "2px",
              fontFamily: "pureblissPoppinsLight",
              textAlign: "center",
            }}
          >
            Privacy Policy
          </Typography>
         
          <Typography  sx={{ fontFamily: "pureblissPoppinsLight" }}>
             {/* Effective Date: [Insert Date]  */}
             <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              1. Introduction
            </Typography>
            <p>Welcome to The Pure Bliss! This Privacy Policy outlines how we
            collect, use, and protect your personal information when you use our
            website (https://thepurebliss.in). We are committed to safeguarding your privacy and
            ensuring that your personal information is handled in a secure and
            responsible manner.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              2. Information We Collect
            </Typography>
             <p>We collect various
            types of information to provide and improve our services. The types
            of information we collect include</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Personal Information:
            </Typography>
              <p> When
            you register on the Platform, place an order, or contact us, we may
            collect personal details such as your name, email address, phone
            number, shipping address, and payment information.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Transaction
              Information:
            </Typography>
             <p> Details of transactions you make on the Platform,
            including purchase history and payment details. </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Usage Data:
            </Typography>
            <p>
            Information about your interactions with the Platform, such as your
            IP address, browser type, access times, and the pages you visit. </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Cookies and Tracking Technologies:
            </Typography>
           <p> We use cookies and similar
            technologies to enhance your browsing experience and analyze usage
            patterns. Cookies are small data files stored on your device that
            help us remember your preferences and improve our services.</p> 
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              3. How
              We Use Your Information
            </Typography>
            <p> We use the collected information for
            various purposes, including: </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              To Provide and Improve Services:
            </Typography>
           <p> To process transactions, fulfill orders, and improve our Platform
            and services based on your feedback. </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              To Communicate with You:
            </Typography>
<p>          To send order updates, respond to inquiries, provide customer
            support, and send promotional materials or newsletters if you have
            opted to receive them. </p>  
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              To Enhance User Experience:
            </Typography>
            <p> To
            personalize your experience on the Platform and provide content that
            is relevant to you.</p> 
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              To Comply with Legal Obligations:
            </Typography>
            <p>To
            comply with legal requirements and enforce our Terms of Use.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              4.
              Information Sharing and Disclosure
            </Typography>
             <p> We do not sell, trade, or rent
            your personal information to third parties. We may share your
            information in the following circumstances: </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Service Providers:
            </Typography>
           <p>
            We may share information with third-party service providers who
            assist us in operating our Platform, processing payments, or
            delivering orders, provided they agree to protect your information.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Legal Requirements:
            </Typography>

            <p>We may disclose information if required by
            law or in response to valid requests by public authorities, such as
            to comply with legal process.</p> 
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Business
              Transfers:
            </Typography>
             <p> In the event of a merger, acquisition, or sale of
            assets, your information may be transferred as part of the business
            transaction. </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
             5. Data Security
            </Typography>
            <p>We take reasonable measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, and destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security. </p> 

            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
             6. Your Rights and
             Choices
            </Typography>
           <p> You have the following rights regarding your personal
            information:</p> 
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
            Access and Correction:
            </Typography>
           <p>You may request access to
            or correction of your personal information by contacting us</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
            Opt-Out:
            </Typography>
           <p> You can opt out of receiving promotional communications
            from us by following the unsubscribe instructions in those
            communications.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
            Cookies:
            </Typography>
             <p>You can control cookies through your
            browser settings. Note that disabling cookies may affect your
            experience on the Platform.</p> 

            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
             7. Children's Privacy
            </Typography>
            <p> Our Platform
            is not intended for use by individuals under the age of 18. We do
            not knowingly collect personal information from children. If we
            become aware that we have collected personal information from a
            child without parental consent, we will take steps to delete such
            information.</p>

            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
            8. Changes to This Privacy Policy
            </Typography>
             <p> We may update
            this Privacy Policy from time to time. Any changes will be posted on
            this page with an updated effective date. We encourage you to review
            this Privacy Policy periodically to stay informed about our
            practices. </p>

            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
            9. Contact Us
            </Typography>
            <p> If you have any questions or concerns
            about this Privacy Policy or our data practices, please contact us
            at:</p>
            <p>
              Email:
              <a
                href={`mailto:${email}`}
                // style={{ textDecoration: "none", color: "inherit" }}
              >
                {email}
              </a>
            </p>
            <p>
              {" "}
              Phone:{" "}
              <a
                href={`tel:${phoneNumber}`}
                // style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                {phoneNumber}{" "}
              </a>
            </p>
           
           By
            using the Platform, you acknowledge that you have read, understood,
            and agree to this Privacy Policy.
          </Typography>
        </ProfileContainer>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
