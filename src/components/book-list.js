import React, { Fragment } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import media from "../utils/media";

const BookGrid = styled.div`
  .gr_grid_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: var(--scale-2);
    column-gap: var(--scale-2);

    @media ${media.sm} {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .gr_grid_book_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    display: block;
    line-height: 0;
    font-size: 0;
  }
`;

const BookList = () => (
  <Fragment>
    <BookGrid id="gr_grid_widget_1584053743"></BookGrid>

    <Helmet>
      <script
        src="https://www.goodreads.com/review/grid_widget/8842701?cover_size=medium&hide_link=true&hide_title=true&num_books=20&order=d&shelf=read&sort=date_read&widget_id=1584053743"
        type="text/javascript"
        defer
      ></script>
    </Helmet>
  </Fragment>
);

export default BookList;
