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

function ShippingPolicy() {
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
            Refund and Shipping policy
          </Typography>

          {/* Effective Date:** [Insert Date] */}
          <Typography sx={{ fontFamily: "pureblissPoppinsLight" }}>
            <Typography
              sx={{
                fontFamily: "pureblissPoppinsLight",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Refund policy
            </Typography>
            <p>
              {" "}
              At The Pure bliss, we strive to ensure customer satisfaction with
              our products and services. If you are not completely satisfied
              with your purchase, we offer a straightforward refund policy as
              follows:{" "}
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Eligibility for Refund
            </Typography>
            <p>
              {" "}
              Products must be returned within 30 days of the purchase date.{" "}
            </p>
            <p>
              {" "}
              Items must be in their original condition, unopened, and with all
              tags and packaging intact.{" "}
            </p>
            <p>
              {" "}
              Customized or personalized items may not be eligible for a refund.{" "}
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Refund Process
            </Typography>
            
              <ul>
                <li>
                 <strong> Request a Refund : </strong> Contact our customer service team at 
                 <a href="mailto:info@thepurebliss.in"> info@thepurebliss.in</a> to initiate the return
                  process.
                </li>
                <li>
                <strong> Return Shipping :</strong> Customers are responsible for return shipping
                  costs unless the item is defective or an error occurred on our
                  part.
                </li>
                <li>
                  <strong>Processing Time : </strong> Once we receive your returned item, please
                  allow 5-7 working days for us to process the refund.
                </li>
                <li>
                  <strong>Credit Issuance : </strong> The refund will be credited back to the
                  original payment method used at the time of purchase.
                </li>
              </ul>
           
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Exceptions
            </Typography>
            <p>  Sale items may have different return conditions.</p>
            
            <p>
              If you have any questions or concerns about our refund policy,
              please do not hesitate to contact our customer service team.
            </p>
            <p> Thank
            you for shopping with us!</p>
            <Typography
              sx={{
                fontFamily: "pureblissPoppinsLight",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Shipping policy
            </Typography>
            <p>
              At The Pure Bliss, we are committed to ensuring that your
              order is delivered promptly and efficiently. Below are the details
              of our shipping policy:
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Processing Time
            </Typography>
            <p>Orders are typically processed within 1-3 business days.</p>
            <p>
              {" "}
              You will receive a confirmation email once your order has shipped.
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Shipping Methods
            </Typography>
            <p>
              We offer a variety of shipping options, including standard,
              expedited, and express shipping.
            </p>
            <p>
              Shipping rates are calculated at checkout based on your location
              and the selected shipping method.
            </p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Delivery Times
            </Typography>
            <ul>
              <li> <strong>Standard Shipping :</strong> 8-10 business days</li>
              <li><strong>Expedited Shipping :</strong> 4-7 business days</li>
              <li><strong>Express Shipping :</strong> 2-3 business days</li>
            </ul>
            <Typography sx={{ fontStyle: 'italic' }}>
              Please note that delivery times may vary depending on your
              location and external factors such as weather or carrier delays.
            </Typography>

            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" ,paddingTop:2}}
            >
              International Shipping
            </Typography>
            <p> We offer international shipping to selected countries.</p>
            <p>Customs fees, duties, and taxes may apply and are the
            responsibility of the customer.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Tracking Your Order
            </Typography>
           <p> Once your order has shipped, you will receive a tracking number
           via email to monitor the status of your shipment.</p>
            <Typography
              sx={{ fontFamily: "pureblissPoppinsLight", fontWeight: "600" }}
            >
              Issues with Your Order
            </Typography>
            <p>
              If you encounter any issues with your order or if your package
              does not arrive within the expected timeframe, please contact our
              customer service team at{" "}
            </p>
            <p>
              Email :
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
            By using our Platform, you agree to these refund and shipping
            policies.
          </Typography>
        </ProfileContainer>
      </Container>
    </div>
  );
}

export default ShippingPolicy;
