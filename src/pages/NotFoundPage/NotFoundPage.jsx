import s from "./NotFoundPage.module.css";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={s.notFound}>
        <span className={s.spanNotFound}>404</span> - Page Not Found
      </h1>
      <Link className={s.getBack} to="/">
        Get back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
