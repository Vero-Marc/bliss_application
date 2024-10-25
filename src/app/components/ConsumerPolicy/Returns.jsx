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

function Returns() {
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
            Order Cancellation and Return Policy
          </Typography>

          {/* Effective Date:** [Insert Date] */}

          <Typography sx={{ fontFamily: "pureblissPoppinsLight" }}>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              1.Cancellation Policy
            </Typography>
            <p>
              {" "}
              You may cancel your order at any time before it is dispatched.
              Orders cannot be canceled once they are out for delivery. However,
              you may choose to reject the delivery at the doorstep. The time
              window for order cancellation varies by product category. Once the
              specified cancellation time has passed, cancellation may no longer
              be possible.{" "}
            </p>
            {/* <p>For cancellations beyond the specified time, a
            cancellation fee may apply. Details about the time window and any
            associated fees are provided on the product page or order
            confirmation page and are considered final.</p>  */}
            <p>
              {" "}
              If we cancel an order due to unforeseen circumstances, a full
              refund will be initiated for prepaid orders.{" "}
            </p>
            <p>
              We reserve the right to accept or reject order cancellations and
              modify the cancellation policy as needed.
            </p>
            {/* 1.2 Hyperlocal Orders
             <p>
                Orders placed under the MINUTES delivery
            option are non-cancellable and non-refundable via self-service due
            to the quick delivery times. Cancellations may be requested via
            customer service under the following conditions: - The order was not
            delivered within the estimated time displayed at the time of order
            placement. - The order has not been picked up by the delivery
            partner. - The seller has canceled the order due to reasons not
            attributable to you. - Other reasons as updated from time to time on
            the Platform. </p> */}
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              2. Returns Policy
            </Typography>
            <p>
              {" "}
              Our return policy is designed to ensure you are satisfied with
              your purchase. The return process varies by product category and
              is subject to the following conditions:{" "}
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              2.1 General Return Conditions
            </Typography>
            <p>
              Returns must be initiated within the specified return window for
              the product category. The product must be returned in its original
              condition, including all packaging and documentation.{" "}
            </p>
            {/* 2.2 Category-Specific Return Policies
           
            <Table component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Return Window</TableCell>
                  <TableCell>Actions Possible</TableCell>
                  <TableCell>Conditions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.returnWindow}</TableCell>
                    <TableCell>{row.actions}</TableCell>
                    <TableCell>{row.conditions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              3. Returns Pick-Up and Processing
            </Typography>
            <p>During pick-up, the product will be checked for: </p>
            <p>
              {" "}
              Correct Product: IMEI, serial number, and other identifiers must
              match.{" "}
            </p>
            {/* <p>
              Complete Product: All accessories and packaging must be included.{" "}
            </p> */}
            <p>
              {" "}
              Unused Product: Product must be unused and in original condition.{" "}
            </p>
            <p> Undamaged Product: Product must be free from damage. </p>
            <p> Undamaged Packaging: Original packaging must be intact.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              4. General Rules for Returns
            </Typography>
            <p>
              If the seller is unable to process a replacement, a refund will be
              issued.{" "}
            </p>
            <p>
              {" "}
              Missing or damaged products may result in a replacement of the
              products .
            </p>
            <p>
              Open box deliveries: If the product is damaged or incorrect at the
              time of delivery, a refund will be issued.{" "}
            </p>
            <p>
              {" "}
              No returns are accepted after accepting the delivery, except for
              manufacturing defects.
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              5. Contact Us
            </Typography>
            <p>
              {" "}
              For any questions regarding our cancellation or return policies,
              please contact us at:{" "}
            </p>
            {/* <p>  The Pure Bliss Pvt. Ltd. </p> */}
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
            By using our Platform, you agree to these cancellation and return
            policies.
          </Typography>
        </ProfileContainer>
      </Container>
    </div>
  );
}

export default Returns;
