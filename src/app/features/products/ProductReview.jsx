import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

const Review = ({ username, rating, comment, date, pros, cons }) => {
  return (
    <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
      <Typography variant="subtitle1">{username}</Typography>
      <Rating name="review-rating" value={rating} precision={0.5} readOnly />
      <Typography variant="body2" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {comment}
      </Typography>
      {pros && cons && (
        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold">Pros:</Typography>
          <ul>
            {pros.map((pro, index) => (
              <li key={index}>{pro}</li>
            ))}
          </ul>
          <Typography variant="body2" fontWeight="bold">Cons:</Typography>
          <ul>
            {cons.map((con, index) => (
              <li key={index}>{con}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

const ReviewsList = ({ reviews }) => {
  return (
    <Box>
      {reviews.map((review, index) => (
        <Review key={index} {...review} />
      ))}
    </Box>
  );
};

const reviewsData = [
//   {
//     username: 'John Doe',
//     rating: 0,
//     comment: 'I recently purchased this product and overall, I am very satisfied. The build quality is solid, and it performs exactly as described. The only downside is that it arrived a bit later than expected, but it was worth the wait.',
//     date: '2024-08-15',
//     pros: ['Solid build quality', 'Easy to set up', 'Performs as described'],
//     cons: ['Late delivery']
//   },
 
];

const ProductReviewsAndRatings = () => {
  return (
    <Box>
      <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
      <Rating name="review-rating" value={0} precision={0.5} readOnly />
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {"No reviews yet"}
      </Typography>
    </Box>

      <ReviewsList reviews={reviewsData} />
    </Box>
  );
};

export default ProductReviewsAndRatings;