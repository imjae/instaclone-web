import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }): any => {
  return (
    <Helmet>
      <title>{title} | Instaclone </title>
    </Helmet>
  );
};

// PageTitle.protoTypes = {
//   title: PropTypes.string.isRequired,
// };

export default PageTitle;
