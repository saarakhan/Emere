import { useLocation, Link } from "react-router-dom";
const BreadCrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(p => p);
  return (
    <div>
      <nav className="text-sm text-gray-600 mb-4">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>

          {paths.map((path, index) => {
            const to = "/" + paths.slice(0, index + 1).join("/");
            const isLast = index === paths.length - 1;
            return (
              <li key={to} className="flex items-center space-x-1">
                <span className="mx-1">/</span>
                {isLast ? (
                  <span className="capitalize text-gray-800">{decodeURIComponent(path)}</span>
                ) : (
                  <Link to={to} className="text-blue-600 hover:underline capitalize">
                    {decodeURIComponent(path)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
