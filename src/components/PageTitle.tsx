import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }): any => {
  return <Helmet> {title} | Instaclone </Helmet>;
};

// PageTitle.protoTypes = {
//   title: PropTypes.string.isRequired,
// };

export default PageTitle;
