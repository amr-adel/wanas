import GeoCoder from "../components/GeoCoder";
import NavMenu from "../components/NavMenu";

export default function Layout({ children }) {
  return (
    <div>
      <header
        dir="ltr"
        className="flex p-2 h-14 bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md"
      >
        <GeoCoder setCenter={setCenter} />
        <NavMenu />
      </header>

      {children}
    </div>
  );
}
